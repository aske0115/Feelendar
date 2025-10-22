import { useMemo } from 'react';
import { MoodEntry } from '../types/mood';

export const useMoodStats = (entries: MoodEntry[]) => {
  return useMemo(() => {
    const weeklyBuckets: Record<string, MoodEntry[]> = {};
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

    const weeklyStats = Object.entries(weeklyBuckets).map(([week, items]) => {
      const counts = items.reduce(
        (acc, item) => {
          acc[item.mood] = (acc[item.mood] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      return {
        week,
        total: items.length,
        counts
      };
    });

    const latestWeek = weeklyStats[0];
    const topMood = latestWeek
      ? Object.entries(latestWeek.counts).sort((a, b) => b[1] - a[1])[0]?.[0]
      : undefined;

    return {
      totalEntries: entries.length,
      weeklyStats,
      topMood
    };
  }, [entries]);
};
