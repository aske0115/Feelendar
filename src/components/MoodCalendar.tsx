import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  isSelected: boolean;
};

type Props = {
  entries: ReflectionEntry[];
  month?: Date;
  onChangeMonth?: (date: Date) => void;
  selectable?: boolean;
  selectedDate?: string | null;
  onSelectDate?: (dateKey: string) => void;
};

const MoodCalendar: React.FC<Props> = ({
  entries,
  month,
  onChangeMonth,
  selectable = false,
  selectedDate,
  onSelectDate
}) => {
  const baseMonth = useMemo(
    () => (month ? new Date(month.getFullYear(), month.getMonth(), 1) : new Date()),
    [month]
  );

  const { weeks, monthLabel } = useMemo(
    () => buildCalendar(entries, baseMonth, selectedDate),
    [entries, baseMonth, selectedDate]
  );

  return (
    <View style={styles.container}>
      <View style={styles.monthHeader}>
        {onChangeMonth ? (
          <>
            <TouchableOpacity onPress={() => onChangeMonth(addMonths(baseMonth, -12))}>
              <Text style={styles.monthControl}>{'≪'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeMonth(addMonths(baseMonth, -1))}>
              <Text style={styles.monthControl}>{'‹'}</Text>
            </TouchableOpacity>
          </>
        ) : null}
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        {onChangeMonth ? (
          <>
            <TouchableOpacity onPress={() => onChangeMonth(addMonths(baseMonth, 1))}>
              <Text style={styles.monthControl}>{'›'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeMonth(addMonths(baseMonth, 12))}>
              <Text style={styles.monthControl}>{'≫'}</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
      {onChangeMonth ? (
        <TouchableOpacity style={styles.todayButton} onPress={() => onChangeMonth(new Date())}>
          <Text style={styles.todayButtonText}>오늘</Text>
        </TouchableOpacity>
      ) : null}
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
            const content = (
              <>
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
              </>
            );

            const containerStyles = [
              styles.dayCell,
              day.isToday && styles.todayCell,
              day.isSelected && styles.selectedCell
            ];

            if (selectable && onSelectDate) {
              return (
                <TouchableOpacity
                  key={day.key}
                  style={containerStyles}
                  activeOpacity={0.7}
                  onPress={() => onSelectDate(day.key)}
                >
                  {content}
                </TouchableOpacity>
              );
            }

            return (
              <View key={day.key} style={containerStyles}>
                {content}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const buildCalendar = (
  entries: ReflectionEntry[],
  baseMonth: Date,
  selectedDate?: string | null
): { weeks: (CalendarDay | null)[][]; monthLabel: string } => {
  const today = new Date();
  const year = baseMonth.getFullYear();
  const month = baseMonth.getMonth();
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
      isToday: key === toDateKey(today),
      isSelected: Boolean(selectedDate && key === selectedDate)
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

const addMonths = (date: Date, delta: number) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + delta);
  return new Date(next.getFullYear(), next.getMonth(), 1);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8
  },
  monthLabel: {
    textAlign: 'center',
    fontWeight: '700',
    color: theme.colors.text
  },
  monthControl: {
    fontSize: 16,
    color: theme.colors.primaryDark,
    paddingHorizontal: 4
  },
  todayButton: {
    alignSelf: 'center',
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8
  },
  todayButtonText: {
    color: theme.colors.primaryDark,
    fontWeight: '600'
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
  selectedCell: {
    borderWidth: 2,
    borderColor: theme.colors.primary
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
