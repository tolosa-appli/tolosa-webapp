'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function AuthDesktopControls() {
  const { user, logout } = useAuth();
  const signupEnabled = (process.env.NEXT_PUBLIC_SIGNUP_ENABLED ?? 'true').toLowerCase() !== 'false';
  if (!user) {
    return (
      <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
        <Button asChild variant="destructive" className="rounded-full px-4 lg:px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Link href="/login" className="font-medium text-sm lg:text-base">Connexion</Link>
        </Button>
        {signupEnabled && (
          <Button asChild className="rounded-full px-4 lg:px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/signup" className="font-medium text-sm lg:text-base">Inscription</Link>
          </Button>
        )}
      </div>
    );
  }
  return (
    <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
      <span className="text-sm text-gray-700">Bonjour, {user.firstName || user.identifier}</span>
      <Button onClick={logout} variant="outline" className="rounded-full px-4 lg:px-6 py-2">Se déconnecter</Button>
    </div>
  );
}

export function AuthMobileControls() {
  const { user, logout } = useAuth();
  const signupEnabled = (process.env.NEXT_PUBLIC_SIGNUP_ENABLED ?? 'true').toLowerCase() !== 'false';
  if (!user) {
    return (
      <div className="flex md:hidden items-center space-x-2">
        <Button asChild variant="destructive" className="rounded-full px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Link href="/login" className="font-medium text-xs">Connexion</Link>
        </Button>
        {signupEnabled && (
          <Button asChild className="rounded-full px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/signup" className="font-medium text-xs">Inscription</Link>
          </Button>
        )}
      </div>
    );
  }
  return (
    <div className="flex md:hidden items-center space-x-2">
      <span className="text-xs text-gray-700">Salut, {user.firstName || user.identifier}</span>
      <Button onClick={logout} variant="outline" className="rounded-full px-3 py-1.5">Déconnexion</Button>
    </div>
  );
}
