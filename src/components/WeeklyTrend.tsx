import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

const colors = {
  good: '#34D399',
  bad: '#FBBF24',
  sad: '#F87171'
};

type Props = {
  weeklyStats: {
    week: string;
    total: number;
    counts: {
      good: number;
      bad: number;
      sad: number;
    };
  }[];
};

const WeeklyTrend: React.FC<Props> = ({ weeklyStats }) => {
  if (weeklyStats.length === 0) {
    return <Text style={styles.empty}>아직 기록이 없습니다.</Text>;
  }

  return (
    <View style={styles.container}>
      {weeklyStats.map((week) => {
        const totalSegments = week.counts.good + week.counts.bad + week.counts.sad || 1;
        const formattedWeek = formatWeekLabel(week.week);
        return (
          <View key={week.week} style={styles.row}>
            <View style={styles.weekLabel}>
              <Text style={styles.weekText}>{formattedWeek}</Text>
              <Text style={styles.total}>{week.total}일 기록</Text>
            </View>
            <View style={styles.barContainer}>
              {(['good', 'bad', 'sad'] as const).map((category) => (
                <View
                  key={category}
                  style={[
                    styles.bar,
                    {
                      flex: week.counts[category] === 0 ? 0 : week.counts[category] / totalSegments,
                      backgroundColor: colors[category]
                    }
                  ]}
                />
              ))}
            </View>
            <View style={styles.legendRow}>
              <LegendPill color={colors.good} label={`좋았던 일 ${week.counts.good}`} />
              <LegendPill color={colors.bad} label={`아쉬웠던 일 ${week.counts.bad}`} />
              <LegendPill color={colors.sad} label={`슬펐던 일 ${week.counts.sad}`} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const formatWeekLabel = (week: string) => {
  const [year, month, day] = week.split('-').map(Number);
  if (!year || !month || !day) return week;
  return `${month}월 ${day}일 주`;
};

const LegendPill: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <View style={[styles.legendPill, { backgroundColor: color }]}> 
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 20
  },
  row: {
    gap: 12
  },
  weekLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weekText: {
    fontWeight: '600',
    color: theme.colors.text
  },
  total: {
    color: theme.colors.muted
  },
  barContainer: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#E4F5EB'
  },
  bar: {
    height: '100%'
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  legendPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600'
  },
  empty: {
    color: theme.colors.muted
  }
});

export default WeeklyTrend;
