import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import TabHeader from '../../components/TabHeader';
import { useReflections } from '../../context/MoodContext';
import { reflectionLabels, ReflectionCategory } from '../../types/mood';
import { theme } from '../../theme/theme';

const formatDateKey = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
};

const formatDisplayDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekday})`;
};

type SectionEntry = {
  title: string;
  data: Array<{
    category: ReflectionCategory;
    items: string[];
  }>;
};

const categoryOrder: ReflectionCategory[] = ['good', 'bad', 'sad'];

const MoodHistoryScreen: React.FC = () => {
  const { entries } = useReflections();

  const sections = useMemo(() => {
    if (entries.length === 0) return [];
    const map = entries.reduce<Record<string, Record<ReflectionCategory, string[]>>>((acc, entry) => {
      const key = formatDateKey(entry.date);
      if (!acc[key]) {
        acc[key] = {
          good: [],
          bad: [],
          sad: []
        };
      }
      categoryOrder.forEach((category) => {
        const value = entry[category]?.trim();
        if (value) {
          acc[key][category].push(value);
        }
      });
      return acc;
    }, {});

    return Object.entries(map)
      .sort(([a], [b]) => (a > b ? -1 : 1))
      .map(([key, items]) => ({
        title: formatDisplayDate(key),
        data: categoryOrder
          .filter((category) => items[category].length > 0)
          .map((category) => ({
            category,
            items: items[category]
          }))
      }));
  }, [entries]);

  return (
    <ScreenContainer>
      <TabHeader
        icon="calendar"
        title="히스토리"
        description="기록해 둔 감정 다이어리를 다시 읽어보세요"
        compact
      />
      <SectionCard title="감정 다이어리 기록" subtitle="필요할 때마다 다시 꺼내볼 수 있어요">
        {sections.length === 0 ? (
          <Text style={styles.empty}>아직 작성한 기록이 없어요. 오늘 밤 첫 페이지를 채워보세요.</Text>
        ) : (
          <View style={styles.list}>
            {sections.map((section) => (
              <View key={section.title} style={styles.sectionBlock}>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                {section.data.map((item) => (
                  <View key={`${section.title}-${item.category}`} style={styles.entry}>
                    <Text style={styles.entryTitle}>
                      {reflectionLabels[item.category].emoji} {reflectionLabels[item.category].title}
                    </Text>
                    <View style={styles.chipContainer}>
                      {item.items.map((value, idx) => (
                        <View key={`${section.title}-${item.category}-${idx}`} style={styles.chip}>
                          <Text style={styles.chipText}>{value}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  empty: {
    color: theme.colors.muted,
    lineHeight: 20
  },
  list: {
    gap: 24
  },
  sectionBlock: {
    gap: 12
  },
  sectionHeader: {
    fontWeight: '700',
    color: theme.colors.primaryDark
  },
  entry: {
    gap: 8
  },
  entryTitle: {
    fontWeight: '600',
    color: theme.colors.text
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0F7F4'
  },
  chipText: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 18
  }
});

export default MoodHistoryScreen;
