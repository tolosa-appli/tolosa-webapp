import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

// Password hashing using Node's crypto.scrypt (no external deps)
// Stored format: scrypt$N$r$p$salt$hash

const DEFAULT_N = 16384; // CPU/memory cost (2^14)
const DEFAULT_r = 8; // block size
const DEFAULT_p = 1; // parallelization
const KEYLEN = 64; // derived key length

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const N = DEFAULT_N;
  const r = DEFAULT_r;
  const p = DEFAULT_p;
  const dk = scryptSync(password, salt, KEYLEN, { N, r, p });
  return [
    'scrypt',
    String(N),
    String(r),
    String(p),
    salt.toString('base64'),
    Buffer.from(dk).toString('base64'),
  ].join('$');
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const N = parseInt(parts[1], 10);
  const r = parseInt(parts[2], 10);
  const p = parseInt(parts[3], 10);
  const salt = Buffer.from(parts[4], 'base64');
  const hash = Buffer.from(parts[5], 'base64');
  const dk = scryptSync(password, salt, hash.length, { N, r, p });
  return timingSafeEqual(hash, dk);
}

