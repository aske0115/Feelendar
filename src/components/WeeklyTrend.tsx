import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

const colors: Record<string, string> = {
  행복해요: '#34D399',
  좋아요: '#6EE7B7',
  보통이에요: '#FBBF24',
  우울해요: '#F97316',
  지쳤어요: '#F87171'
};

type Props = {
  weeklyStats: {
    week: string;
    total: number;
    counts: Record<string, number>;
  }[];
};

const WeeklyTrend: React.FC<Props> = ({ weeklyStats }) => {
  if (weeklyStats.length === 0) {
    return <Text style={styles.empty}>아직 기록이 없습니다.</Text>;
  }

  return (
    <View style={styles.container}>
      {weeklyStats.map((week) => (
        <View key={week.week} style={styles.row}>
          <View style={styles.weekLabel}>
            <Text style={styles.weekText}>{week.week}</Text>
            <Text style={styles.total}>{week.total}회</Text>
          </View>
          <View style={styles.barContainer}>
            {Object.entries(week.counts).map(([mood, count]) => (
              <View
                key={mood}
                style={[styles.bar, { flex: count, backgroundColor: colors[mood] || theme.colors.primary }]}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  row: {
    gap: 8
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
  empty: {
    color: theme.colors.muted
  }
});

export default WeeklyTrend;
