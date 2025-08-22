import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'auth_token';

function b64urlToUint8Array(b64url: string): Uint8Array {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = 4 - (b64.length % 4);
  const padded = pad === 4 ? b64 : b64 + '='.repeat(pad);
  const raw = atob(padded);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

function uint8ArrayToB64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function verifyJwtHS256(token: string, secret: string): Promise<boolean> {
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [headerB64, payloadB64, sigB64] = parts;
  const data = `${headerB64}.${payloadB64}`;
  const keyData = new TextEncoder().encode(secret);
  const key = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const expected = uint8ArrayToB64url(sig);
  if (!(expected.length === sigB64.length && expected === sigB64)) return false;
  try {
    const payloadJson = new TextDecoder().decode(b64urlToUint8Array(payloadB64));
    const payload = JSON.parse(payloadJson);
    if (typeof payload.exp === 'number') {
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) return false;
    }
  } catch {
    return false;
  }
  return true;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow static/public assets and Next internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    /\.[\w]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // API protection
  if (pathname.startsWith('/api')) {
    if (pathname.startsWith('/api/auth')) return NextResponse.next();
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || req.cookies.get(AUTH_COOKIE)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    const ok = await verifyJwtHS256(token, secret);
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.next();
  }

  // Page protection: allow home and login; signup based on env flag
  if (pathname === '/') return NextResponse.next();
  if (pathname === '/login') return NextResponse.next();

  const signupEnabled = (process.env.SIGNUP_ENABLED ?? 'true').toLowerCase() !== 'false';
  if (pathname === '/signup') {
    if (signupEnabled) return NextResponse.next();
    // If signup disabled, treat it like a protected page: redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // For all other pages, require auth
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.redirect(new URL('/login', req.url));
  if (!token) return NextResponse.redirect(new URL('/login', req.url));
  const ok = await verifyJwtHS256(token, secret);
  if (!ok) return NextResponse.redirect(new URL('/login', req.url));
  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except Next internals and common static assets
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|json|txt|woff|woff2|ttf|otf)).*)',
  ],
};
