import React, { createContext, useContext, useMemo, useState } from 'react';
import { MoodEntry, MoodLevel, PrivacyLevel } from '../types/mood';

export type MoodContextValue = {
  entries: MoodEntry[];
  addEntry: (entry: Omit<MoodEntry, 'id' | 'reactions'>) => void;
  updateEntry: (id: string, updates: Partial<Omit<MoodEntry, 'id'>>) => void;
  deleteEntry: (id: string) => void;
  reactToEntry: (id: string, type: keyof MoodEntry['reactions']) => void;
};

const MoodContext = createContext<MoodContextValue | undefined>(undefined);

const initialEntries: MoodEntry[] = [
  {
    id: 'seed-1',
    mood: '지쳤어요',
    reason: '프로젝트 마감이 겹쳐서 스트레스가 높아요.',
    date: new Date().toISOString(),
    privacy: '전체 공개',
    reactions: { empathy: 5, cheer: 3, tips: 2 }
  },
  {
    id: 'seed-2',
    mood: '행복해요',
    reason: '오랜만에 산책하며 봄 공기를 느꼈어요.',
    date: new Date(Date.now() - 86400000).toISOString(),
    privacy: '전체 공개',
    reactions: { empathy: 2, cheer: 6, tips: 1 }
  }
];

export const MoodProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [entries, setEntries] = useState<MoodEntry[]>(initialEntries);

  const addEntry = (entry: Omit<MoodEntry, 'id' | 'reactions'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
      reactions: { empathy: 0, cheer: 0, tips: 0 }
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  const updateEntry = (id: string, updates: Partial<Omit<MoodEntry, 'id'>>) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const reactToEntry = (id: string, type: keyof MoodEntry['reactions']) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              reactions: {
                ...entry.reactions,
                [type]: entry.reactions[type] + 1
              }
            }
          : entry
      )
    );
  };

  const value = useMemo(
    () => ({
      entries,
      addEntry,
      updateEntry,
      deleteEntry,
      reactToEntry
    }),
    [entries]
  );

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
};

export const useMoods = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoods는 MoodProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

export const moodOptions: MoodLevel[] = ['행복해요', '좋아요', '보통이에요', '우울해요', '지쳤어요'];
export const privacyOptions: PrivacyLevel[] = ['전체 공개', '친구에게만', '비공개'];
