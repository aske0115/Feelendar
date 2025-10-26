import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ReflectionEntry } from '../types/mood';
import { theme } from '../theme/theme';

const CATEGORY_COLORS: Record<'good' | 'bad' | 'sad', string> = {
  good: '#34D399',
  bad: '#FBBF24',
  sad: '#F87171'
};

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

type CalendarDay = {
  key: string;
  label: number;
  categories: {
    good: boolean;
    bad: boolean;
    sad: boolean;
  };
  isToday: boolean;
};

type Props = {
  entries: ReflectionEntry[];
};

const MoodCalendar: React.FC<Props> = ({ entries }) => {
  const { weeks, monthLabel } = useMemo(() => buildCalendar(entries), [entries]);

  return (
    <View style={styles.container}>
      <Text style={styles.monthLabel}>{monthLabel}</Text>
      <View style={styles.weekHeader}>
        {WEEK_DAYS.map((day) => (
          <Text key={day} style={styles.weekHeaderText}>
            {day}
          </Text>
        ))}
      </View>
      {weeks.map((week, weekIndex) => (
        <View key={`week-${weekIndex}`} style={styles.weekRow}>
          {week.map((day, dayIndex) => {
            if (!day) {
              return <View key={`empty-${weekIndex}-${dayIndex}`} style={styles.dayCell} />;
            }
            return (
              <View
                key={day.key}
                style={[styles.dayCell, day.isToday && styles.todayCell]}
              >
                <Text style={styles.dayLabel}>{day.label}</Text>
                <View style={styles.dotRow}>
                  {(['good', 'bad', 'sad'] as const).map((category) =>
                    day.categories[category] ? (
                      <View
                        key={`${day.key}-${category}`}
                        style={[styles.dot, { backgroundColor: CATEGORY_COLORS[category] }]}
                      />
                    ) : (
                      <View key={`${day.key}-${category}`} style={styles.dotPlaceholder} />
                    )
                  )}
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const buildCalendar = (
  entries: ReflectionEntry[]
): { weeks: (CalendarDay | null)[][]; monthLabel: string } => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startOffset = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const entriesByDate = entries.reduce<Record<string, ReflectionEntry[]>>((acc, entry) => {
    const key = toDateKey(entry.date);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(entry);
    return acc;
  }, {});

  const calendarCells: (CalendarDay | null)[] = Array.from({ length: startOffset }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const key = toDateKey(date);
    const categoryState = entriesByDate[key]?.reduce(
      (state, entry) => ({
        good: state.good || Boolean(entry.good.trim()),
        bad: state.bad || Boolean(entry.bad.trim()),
        sad: state.sad || Boolean(entry.sad.trim())
      }),
      { good: false, bad: false, sad: false }
    ) ?? { good: false, bad: false, sad: false };

    calendarCells.push({
      key,
      label: day,
      categories: categoryState,
      isToday: key === toDateKey(today)
    });
  }

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  const weeks: (CalendarDay | null)[][] = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    weeks.push(calendarCells.slice(i, i + 7));
  }

  const monthLabel = `${year}년 ${month + 1}월`;

  return { weeks, monthLabel };
};

const toDateKey = (value: string | Date) => {
  const date = typeof value === 'string' ? new Date(value) : value;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  monthLabel: {
    textAlign: 'center',
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 8
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  weekHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.muted
  },
  weekRow: {
    flexDirection: 'row'
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2
  },
  todayCell: {
    borderRadius: 12,
    backgroundColor: '#F0F7F4'
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text
  },
  dotRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  dotPlaceholder: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent'
  }
});

export default MoodCalendar;
