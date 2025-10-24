import { useMemo } from 'react';
import { ReflectionEntry } from '../types/mood';

export const useReflectionStats = (entries: ReflectionEntry[]) => {
  return useMemo(() => {
    const weeklyBuckets: Record<string, ReflectionEntry[]> = {};

    entries.forEach((entry) => {
      const date = new Date(entry.date);
      const startOfWeek = new Date(date);
      const day = startOfWeek.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);
      const key = startOfWeek.toISOString().split('T')[0];
      weeklyBuckets[key] = weeklyBuckets[key] || [];
      weeklyBuckets[key].push(entry);
    });

    const weeklyStats = Object.entries(weeklyBuckets)
      .map(([week, items]) => {
        const counts = items.reduce(
          (acc, item) => {
            if (item.good.trim()) acc.good += 1;
            if (item.bad.trim()) acc.bad += 1;
            if (item.sad.trim()) acc.sad += 1;
            return acc;
          },
          { good: 0, bad: 0, sad: 0 }
        );

        return {
          week,
          total: items.length,
          counts
        };
      })
      .sort((a, b) => (a.week > b.week ? -1 : 1));

    const totals = entries.reduce(
      (acc, item) => {
        if (item.good.trim()) acc.good += 1;
        if (item.bad.trim()) acc.bad += 1;
        if (item.sad.trim()) acc.sad += 1;
        return acc;
      },
      { good: 0, bad: 0, sad: 0 }
    );

    const recentHighlights = entries
      .filter((item) => item.good.trim())
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        good: item.good,
        date: item.date
      }));

    return {
      totalEntries: entries.length,
      weeklyStats,
      totals,
      recentHighlights
    };
  }, [entries]);
};
