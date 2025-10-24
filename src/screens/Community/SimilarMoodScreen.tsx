import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { useReflections } from '../../context/MoodContext';
import { reflectionLabels, ReflectionCategory } from '../../types/mood';
import { theme } from '../../theme/theme';

const categories: ReflectionCategory[] = ['good', 'bad', 'sad'];

const SimilarMoodScreen: React.FC = () => {
  const { entries } = useReflections();

  return (
    <ScreenContainer>
      <SectionCard title="감정별 모아보기" subtitle="최근 기록에서 공통된 키워드를 발견해보세요">
        {categories.map((category) => {
          const label = reflectionLabels[category];
          const items = entries.filter((entry) => entry[category].trim());
          return (
            <View key={category} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {label.emoji} {label.title}
              </Text>
              {items.length === 0 ? (
                <Text style={styles.empty}>아직 {label.title}에 대한 기록이 없어요.</Text>
              ) : (
                items.slice(0, 5).map((entry) => {
                  const date = new Date(entry.date);
                  return (
                    <View key={`${entry.id}-${category}`} style={styles.item}>
                      <Text style={styles.date}>{`${date.getMonth() + 1}월 ${date.getDate()}일`}</Text>
                      <Text style={styles.content}>{entry[category]}</Text>
                    </View>
                  );
                })
              )}
            </View>
          );
        })}
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 10
  },
  item: {
    marginBottom: 12
  },
  date: {
    color: theme.colors.muted,
    fontSize: 12,
    marginBottom: 4
  },
  content: {
    color: theme.colors.text,
    lineHeight: 20,
    fontSize: 14
  },
  empty: {
    color: theme.colors.muted,
    lineHeight: 20
  }
});

export default SimilarMoodScreen;
