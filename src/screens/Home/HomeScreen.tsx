import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import MoodCard from '../../components/MoodCard';
import { useAuth } from '../../context/AuthContext';
import { useReflections } from '../../context/MoodContext';
import { useReflectionStats } from '../../hooks/useMoodStats';
import { theme } from '../../theme/theme';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { entries } = useReflections();
  const stats = useReflectionStats(entries);
  const latest = entries[0];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.greeting}>좋은 밤이에요, {user?.name ?? '감정 여행자'}님</Text>
        <Text style={styles.subtitle}>오늘 하루를 세 가지 감정으로 정리해보세요</Text>
      </View>

      {latest ? (
        <SectionCard title="가장 최근 기록" subtitle="방금 전 정리한 하루">
          <MoodCard entry={latest} />
        </SectionCard>
      ) : (
        <SectionCard title="첫 감정 다이어리를 작성해보세요">
          <Text style={styles.empty}>기분이 좋았던 일, 아쉬웠던 일, 슬펐던 일을 각각 적어보는 것부터 시작해요.</Text>
        </SectionCard>
      )}

      <SectionCard title="이번 주 되돌아보기" subtitle="카테고리별로 얼마나 기록했는지 알아봐요">
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>좋았던 순간</Text>
            <Text style={styles.summaryValue}>{stats.totals.good}회</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>아쉬웠던 순간</Text>
            <Text style={styles.summaryValue}>{stats.totals.bad}회</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>슬펐던 순간</Text>
            <Text style={styles.summaryValue}>{stats.totals.sad}회</Text>
          </View>
        </View>
        <Text style={styles.tip}>* 한 번의 기록에도 세 가지 감정을 모두 적어도 괜찮고, 한 칸만 채워도 충분해요.</Text>
      </SectionCard>

      <SectionCard title="기억하고 싶은 좋은 일" subtitle="최근 3개의 반짝였던 순간">
        {stats.recentHighlights.length > 0 ? (
          stats.recentHighlights.map((item) => {
            const date = new Date(item.date);
            return (
              <View key={item.id} style={styles.highlightItem}>
                <Text style={styles.highlightDate}>{`${date.getMonth() + 1}월 ${date.getDate()}일`}</Text>
                <Text style={styles.highlightText}>{item.good}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.empty}>좋았던 순간을 적어두면 다시 힘이 날 거예요.</Text>
        )}
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 4
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.primaryDark
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15
  },
  empty: {
    color: theme.colors.muted,
    lineHeight: 20
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#F0F7F4',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center'
  },
  summaryLabel: {
    color: theme.colors.muted,
    fontSize: 13
  },
  summaryValue: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text
  },
  tip: {
    marginTop: 12,
    color: theme.colors.primaryDark,
    fontSize: 13,
    lineHeight: 20
  },
  highlightItem: {
    marginBottom: 16
  },
  highlightDate: {
    color: theme.colors.muted,
    fontSize: 12,
    marginBottom: 4
  },
  highlightText: {
    color: theme.colors.text,
    lineHeight: 20,
    fontSize: 15
  }
});

export default HomeScreen;
