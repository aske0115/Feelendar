import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { useAuth } from '../../context/AuthContext';
import { useMoods } from '../../context/MoodContext';
import MoodCard from '../../components/MoodCard';
import { theme } from '../../theme/theme';
import { useMoodStats } from '../../hooks/useMoodStats';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { entries, reactToEntry } = useMoods();
  const stats = useMoodStats(entries);
  const latest = entries[0];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.greeting}>안녕하세요, {user?.name ?? '게스트'}님</Text>
        <Text style={styles.subtitle}>오늘의 기분을 나눠보세요</Text>
      </View>

      {latest ? (
        <SectionCard title="가장 최근 기분" subtitle="방금 전 업데이트">
          <MoodCard entry={latest} onReact={(type) => reactToEntry(latest.id, type)} />
        </SectionCard>
      ) : (
        <SectionCard title="첫 기분을 기록해보세요">
          <Text style={styles.empty}>아직 기분 기록이 없어요. 기분 기록 탭에서 시작해보세요!</Text>
        </SectionCard>
      )}

      <SectionCard title="이번 주 요약" subtitle="어떤 감정이 가장 많았나요?">
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>총 기록</Text>
            <Text style={styles.summaryValue}>{stats.totalEntries}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>대표 감정</Text>
            <Text style={styles.summaryValue}>{stats.topMood ?? '-'}</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="커뮤니티 소식" subtitle="비슷한 기분을 가진 사람들을 만나보세요">
        {entries.slice(0, 2).map((entry) => (
          <View key={entry.id} style={styles.communityItem}>
            <Text style={styles.communityText}>"{entry.reason}"</Text>
            <Text style={styles.communityMood}>{entry.mood}</Text>
          </View>
        ))}
        {entries.length === 0 ? (
          <Text style={styles.empty}>아직 커뮤니티 활동이 없어요.</Text>
        ) : null}
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
    color: theme.colors.muted
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
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text
  },
  communityItem: {
    paddingVertical: 8
  },
  communityText: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20
  },
  communityMood: {
    marginTop: 4,
    color: theme.colors.muted,
    fontSize: 13
  }
});

export default HomeScreen;
