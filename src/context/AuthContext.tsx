import React, { createContext, useContext, useMemo, useState } from 'react';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [mockUsers, setMockUsers] = useState<Record<string, UserProfile & { password: string }>>({});

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = normalizedEmail ? mockUsers[normalizedEmail] : null;

    if (existingUser) {
      setUser(existingUser);
      return;
    }

    const fallbackEmail = normalizedEmail || `guest-${Date.now()}@feelendar.app`;
    const fallbackName = normalizedEmail
      ? normalizedEmail.split('@')[0]
      : '감정 여행자';

    const newUser: UserProfile & { password: string } = {
      id: Date.now().toString(),
      name: fallbackName,
      email: fallbackEmail,
      password
    };

    setMockUsers((prev) => ({ ...prev, [fallbackEmail]: newUser }));
    setUser(newUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const fallbackEmail = normalizedEmail || `user-${Date.now()}@feelendar.app`;
    const displayName = name.trim() || (normalizedEmail ? normalizedEmail.split('@')[0] : '감정 여행자');

    const newUser: UserProfile & { password: string } = {
      id: Date.now().toString(),
      name: displayName,
      email: fallbackEmail,
      password
    };

    setMockUsers((prev) => ({ ...prev, [fallbackEmail]: newUser }));
    setUser(newUser);
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
