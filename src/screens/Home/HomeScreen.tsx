import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import MoodCard from '../../components/MoodCard';
import TabHeader from '../../components/TabHeader';
import { useAuth } from '../../context/AuthContext';
import { useReflections } from '../../context/MoodContext';
import { useReflectionStats } from '../../hooks/useMoodStats';
import MoodCalendar from '../../components/MoodCalendar';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { reflectionLabels, ReflectionCategory } from '../../types/mood';
import { theme } from '../../theme/theme';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

type RecordOption = {
  key: ReflectionCategory | 'all';
  label: string;
  description: string;
  category: ReflectionCategory | 'all';
};

const recordButtons: RecordOption[] = [
  {
    key: 'good',
    label: '좋은 기록',
    description: reflectionLabels.good.description,
    category: 'good'
  },
  {
    key: 'bad',
    label: '아쉬운 기록',
    description: reflectionLabels.bad.description,
    category: 'bad'
  },
  {
    key: 'sad',
    label: '슬픈 기록',
    description: reflectionLabels.sad.description,
    category: 'sad'
  },
  {
    key: 'all',
    label: '모두 기록',
    description: '세 가지 감정을 한 번에 적기',
    category: 'all'
  }
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { entries } = useReflections();
  const stats = useReflectionStats(entries);
  const latest = entries[0];

  return (
    <ScreenContainer>
      <TabHeader
        icon="home"
        title="홈"
        description="오늘 하루를 정리하고 감정을 채워보세요"
        compact
      />
      <View style={styles.header}>
        <Text style={styles.greeting}>좋은 밤이에요, {user?.name ?? '감정 여행자'}님</Text>
        <Text style={styles.subtitle}>오늘 하루를 세 가지 감정으로 정리해보세요</Text>
      </View>
      <SectionCard title="기분 기록하기" subtitle="오늘 떠오르는 감정 버튼을 눌러 바로 기록해보세요">
        <View style={styles.recordGrid}>
          {recordButtons.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.recordButton,
                option.key === 'all' ? styles.recordButtonPrimary : styles.recordButtonSecondary
              ]}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('MoodEntry', {
                  category: option.category
                })
              }
            >
              <Text
                style={[
                  styles.recordButtonText,
                  option.key !== 'all' && styles.recordButtonTextSecondary
                ]}
              >
                {option.label}
              </Text>
              <Text
                style={[
                  styles.recordButtonHint,
                  option.key !== 'all' && styles.recordButtonHintSecondary
                ]}
              >
                {option.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>
      <SectionCard title="감정 캘린더" subtitle="오늘 기록한 감정이 캘린더에 표시돼요">
        <MoodCalendar entries={entries} />
      </SectionCard>

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
    gap: 4,
    marginBottom: 12
  },
  recordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  recordButton: {
    flexBasis: '48%',
    flexGrow: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 6,
    shadowColor: '#0D473A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4
  },
  recordButtonPrimary: {
    backgroundColor: theme.colors.primary
  },
  recordButtonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.colors.primaryLight
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  recordButtonTextSecondary: {
    color: theme.colors.primaryDark
  },
  recordButtonHint: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.85
  },
  recordButtonHintSecondary: {
    color: theme.colors.muted
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
