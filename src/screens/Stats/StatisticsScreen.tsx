import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeeklyTrend from '../../components/WeeklyTrend';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import TabHeader from '../../components/TabHeader';
import { useReflections } from '../../context/MoodContext';
import { useReflectionStats } from '../../hooks/useMoodStats';
import { theme } from '../../theme/theme';

const StatisticsScreen: React.FC = () => {
  const { entries } = useReflections();
  const stats = useReflectionStats(entries);

  return (
    <ScreenContainer>
      <TabHeader
        icon="stats-chart"
        title="통계"
        description="패턴을 찾아 마음의 변화를 이해해보세요"
        compact
      />
      <SectionCard title="주간 감정 트렌드" subtitle="좋았던 일, 아쉬웠던 일, 슬펐던 일을 색으로 정리했어요">
        <WeeklyTrend weeklyStats={stats.weeklyStats} />
      </SectionCard>
      <SectionCard title="나의 감정 요약" subtitle="기록이 쌓일수록 패턴이 보일 거예요">
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>총 작성한 밤</Text>
          <Text style={styles.insightValue}>{stats.totalEntries}일</Text>
        </View>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>좋았던 순간 기록</Text>
          <Text style={styles.insightValue}>{stats.totals.good}회</Text>
        </View>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>아쉬웠던 순간 기록</Text>
          <Text style={styles.insightValue}>{stats.totals.bad}회</Text>
        </View>
        <View style={styles.insightItem}>
          <Text style={styles.insightLabel}>슬펐던 순간 기록</Text>
          <Text style={styles.insightValue}>{stats.totals.sad}회</Text>
        </View>
        <Text style={styles.tip}>Tip: 좋은 순간은 다음 날 힘이 되고, 힘들었던 순간은 패턴을 발견하는 데 도움이 돼요.</Text>
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
