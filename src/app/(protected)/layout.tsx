import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJwt } from '@/lib/jwt';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value || '';
  const secret = process.env.JWT_SECRET || '';

  if (!secret || !token || !verifyJwt(token, secret)) {
    redirect('/login');
  }

  return <>{children}</>;
}

