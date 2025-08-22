import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { db } from '@/lib/firebase-admin';

const AUTH_COOKIE = 'auth_token';

export async function GET(req: NextRequest) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });

    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || req.cookies.get(AUTH_COOKIE)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyJwt<{ uid: string }>(token, jwtSecret);
    if (!payload?.uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const doc = await db.collection('users').doc(payload.uid).get();
    if (!doc.exists) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const data = doc.data() || {};
    delete (data as any).passwordHash;

    return NextResponse.json({ user: { id: doc.id, ...data } });
  } catch (err: any) {
    console.error('Me error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

