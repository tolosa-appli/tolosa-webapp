'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  identifier: string;
  email: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
} | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  login: (identifier: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (data: Record<string, any>) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user ?? null);
      } else {
        setUser(null);
      }
    } catch (e: any) {
      setError('Failed to load session');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (identifier: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { ok: false, error: data.error || 'Échec de connexion' };
      }
      await refresh();
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: 'Erreur réseau' };
    }
  }, [refresh]);

  const register = useCallback(async (data: Record<string, any>) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return { ok: false, error: body.error || 'Échec de création du compte' };
      }
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: 'Erreur réseau' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
    }
  }, []);

  const value: AuthContextValue = { user, loading, error, refresh, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}

