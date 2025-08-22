// Minimal HS256 JWT utilities without external deps
// Note: Uses Node's crypto for HMAC. For middleware (edge), use Web Crypto there.

import { createHmac, timingSafeEqual } from 'crypto';

function base64urlEncode(input: Buffer | string): string {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return b
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64urlDecode(input: string): Buffer {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = 4 - (input.length % 4);
  if (pad !== 4) input += '='.repeat(pad);
  return Buffer.from(input, 'base64');
}

export type JwtPayload = Record<string, any> & {
  exp?: number; // seconds since epoch
  iat?: number;
};

export function signJwt(payload: JwtPayload, secret: string, expiresInSeconds = 60 * 60 * 24): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const body = { ...payload, iat, exp };

  const headerB64 = base64urlEncode(JSON.stringify(header));
  const payloadB64 = base64urlEncode(JSON.stringify(body));
  const data = `${headerB64}.${payloadB64}`;
  const sig = createHmac('sha256', secret).update(data).digest();
  const sigB64 = base64urlEncode(sig);
  return `${data}.${sigB64}`;
}

export function verifyJwt<T extends JwtPayload = JwtPayload>(token: string, secret: string): T | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, sigB64] = parts;
  const data = `${headerB64}.${payloadB64}`;
  const expected = createHmac('sha256', secret).update(data).digest();
  const actual = base64urlDecode(sigB64);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  const payload = JSON.parse(base64urlDecode(payloadB64).toString('utf8')) as T;
  if (typeof payload.exp === 'number' && payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}
