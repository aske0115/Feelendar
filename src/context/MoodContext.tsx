import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { ReflectionEntry } from '../types/mood';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

export type ReflectionContextValue = {
  entries: ReflectionEntry[];
  addEntry: (entry: Omit<ReflectionEntry, 'id'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<Omit<ReflectionEntry, 'id'>>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
};

const ReflectionContext = createContext<ReflectionContextValue | undefined>(undefined);

export const ReflectionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      return;
    }

    const entriesRef = collection(db, 'users', user.id, 'entries');
    const q = query(entriesRef, orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const nextEntries: ReflectionEntry[] = snapshot.docs.map((item) => {
        const data = item.data() as Partial<ReflectionEntry> & {
          date?: string | { toDate: () => Date };
        };
        const rawDate = data.date;
        let dateString = '';
        if (typeof rawDate === 'string') {
          dateString = rawDate;
        } else if (rawDate && typeof rawDate === 'object' && 'toDate' in rawDate) {
          dateString = (rawDate as { toDate: () => Date }).toDate().toISOString();
        }

        return {
          id: item.id,
          good: data.good ?? '',
          bad: data.bad ?? '',
          sad: data.sad ?? '',
          date: dateString
        };
      });
      setEntries(nextEntries);
    });

    return unsubscribe;
  }, [user?.id]);

  const addEntry = async (entry: Omit<ReflectionEntry, 'id'>) => {
    if (!user) throw new Error('로그인이 필요합니다.');
    const entriesRef = collection(db, 'users', user.id, 'entries');
    await addDoc(entriesRef, {
      ...entry,
      date: entry.date ?? new Date().toISOString(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const updateEntry = async (id: string, updates: Partial<Omit<ReflectionEntry, 'id'>>) => {
    if (!user) throw new Error('로그인이 필요합니다.');
    const entryRef = doc(db, 'users', user.id, 'entries', id);
    await updateDoc(entryRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  };

  const deleteEntry = async (id: string) => {
    if (!user) throw new Error('로그인이 필요합니다.');
    const entryRef = doc(db, 'users', user.id, 'entries', id);
    await deleteDoc(entryRef);
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
