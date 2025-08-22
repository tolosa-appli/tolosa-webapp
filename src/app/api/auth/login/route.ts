import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { verifyPassword } from '@/lib/password';
import { signJwt } from '@/lib/jwt';

const AUTH_COOKIE = 'auth_token';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password } = body ?? {};
    if (!identifier || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const usersCol = db.collection('users');
    let snap = await usersCol.where('identifier', '==', String(identifier)).limit(1).get();
    if (snap.empty) {
      // try by email
      snap = await usersCol.where('email', '==', String(identifier).toLowerCase()).limit(1).get();
    }

    if (snap.empty) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const doc = snap.docs[0];
    const user = doc.data() as any;
    if (!user.passwordHash || !verifyPassword(String(password), String(user.passwordHash))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const token = signJwt(
      { uid: doc.id, identifier: user.identifier, email: user.email },
      jwtSecret,
      // default 1 day
      Number(process.env.JWT_EXPIRES_IN_SECONDS || 60 * 60 * 24)
    );

    const res = NextResponse.json({
      token,
      user: { id: doc.id, ...user, passwordHash: undefined },
    });
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: Number(process.env.JWT_EXPIRES_IN_SECONDS || 60 * 60 * 24),
    });
    return res;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

