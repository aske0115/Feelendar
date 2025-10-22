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
    const existingUser = mockUsers[email.toLowerCase()];
    if (existingUser && existingUser.password === password) {
      setUser(existingUser);
      return;
    }
    throw new Error('이메일 또는 비밀번호를 확인해주세요.');
  };

  const signup = async (name: string, email: string, password: string) => {
    const normalizedEmail = email.toLowerCase();
    if (mockUsers[normalizedEmail]) {
      throw new Error('이미 가입된 이메일입니다.');
    }
    const newUser: UserProfile & { password: string } = {
      id: Date.now().toString(),
      name,
      email: normalizedEmail,
      password
    };
    setMockUsers((prev) => ({ ...prev, [normalizedEmail]: newUser }));
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
    [user, mockUsers]
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
