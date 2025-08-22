import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { hashPassword } from '@/lib/password';
import { UserRecord, PublicUser } from '@/types/user';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      identifier,
      email,
      password,
      ...rest
    } = body ?? {};

    if (!identifier || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const usersCol = db.collection('users');

    // uniqueness checks (two queries since Firestore has no OR)
    const existingByIdentifier = await usersCol.where('identifier', '==', String(identifier)).limit(1).get();
    if (!existingByIdentifier.empty) {
      return NextResponse.json({ error: 'Identifier already in use' }, { status: 409 });
    }
    const existingByEmail = await usersCol.where('email', '==', String(email).toLowerCase()).limit(1).get();
    if (!existingByEmail.empty) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const now = new Date().toISOString();
    const passwordHash = hashPassword(String(password));

    const docRef = await usersCol.add({
      identifier: String(identifier),
      email: String(email).toLowerCase(),
      passwordHash,
      createdAt: now,
      updatedAt: now,
      ...rest,
    });

    const user: PublicUser = {
      id: docRef.id,
      identifier: String(identifier),
      email: String(email).toLowerCase(),
      createdAt: now,
      updatedAt: now,
      ...rest,
    };

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

