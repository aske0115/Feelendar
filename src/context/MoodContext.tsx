import React, { createContext, useContext, useMemo, useState } from 'react';
import { ReflectionEntry } from '../types/mood';

export type ReflectionContextValue = {
  entries: ReflectionEntry[];
  addEntry: (entry: Omit<ReflectionEntry, 'id'>) => void;
  updateEntry: (id: string, updates: Partial<Omit<ReflectionEntry, 'id'>>) => void;
  deleteEntry: (id: string) => void;
};

const ReflectionContext = createContext<ReflectionContextValue | undefined>(undefined);

const initialEntries: ReflectionEntry[] = [
  {
    id: 'seed-1',
    date: new Date().toISOString(),
    good: '퇴근길에 들른 카페에서 맛있는 디저트를 먹었어요.',
    bad: '회의 준비를 미루다가 급하게 하느라 마음이 급했어요.',
    sad: '친구와의 약속을 지키지 못한 것이 마음에 걸렸어요.'
  },
  {
    id: 'seed-2',
    date: new Date(Date.now() - 86400000).toISOString(),
    good: '산책하면서 봄바람을 느끼며 힐링했어요.',
    bad: '업무 중 집중이 잘 되지 않아 작은 실수가 있었어요.',
    sad: '가족과 통화하면서 서로 바빠서 자주 못 만난다는 이야기를 들었어요.'
  }
];

export const ReflectionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [entries, setEntries] = useState<ReflectionEntry[]>(initialEntries);

  const addEntry = (entry: Omit<ReflectionEntry, 'id'>) => {
    const newEntry: ReflectionEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  const updateEntry = (id: string, updates: Partial<Omit<ReflectionEntry, 'id'>>) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const value = useMemo(
    () => ({
      entries,
      addEntry,
      updateEntry,
      deleteEntry
    }),
    [entries]
  );

  return <ReflectionContext.Provider value={value}>{children}</ReflectionContext.Provider>;
};

export const useReflections = () => {
  const context = useContext(ReflectionContext);
  if (!context) {
    throw new Error('useReflections는 ReflectionProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
