import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { useMoods } from '../../context/MoodContext';
import { useMoodStats } from '../../hooks/useMoodStats';
import WeeklyTrend from '../../components/WeeklyTrend';
import { theme } from '../../theme/theme';

const StatisticsScreen: React.FC = () => {
  const { entries } = useMoods();
  const stats = useMoodStats(entries);

  return (
    <ScreenContainer>
      <SectionCard title="주간 감정 트렌드" subtitle="최근 감정을 한 눈에 볼 수 있어요">
        <WeeklyTrend weeklyStats={stats.weeklyStats} />
      </SectionCard>
      <SectionCard title="인사이트" subtitle="나를 더 잘 이해해보세요">
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>총 기록 수</Text>
          <Text style={styles.insightValue}>{stats.totalEntries}회</Text>
        </View>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>이번 주 대표 감정</Text>
          <Text style={styles.insightValue}>{stats.topMood ?? '아직 없어요'}</Text>
        </View>
        <Text style={styles.tip}>Tip: 감정이 쌓일수록 어떤 상황에 기분이 좋아지는지, 힘들어지는지 발견할 수 있어요.</Text>
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  insightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  insightLabel: {
    color: theme.colors.muted
  },
  insightValue: {
    color: theme.colors.text,
    fontWeight: '600'
  },
  tip: {
    marginTop: 16,
    color: theme.colors.primaryDark,
    lineHeight: 20
  }
});

export default StatisticsScreen;
