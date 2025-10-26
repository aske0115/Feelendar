import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import MoodCalendar from '../../components/MoodCalendar';
import { useReflections } from '../../context/MoodContext';
import { reflectionLabels, ReflectionCategory } from '../../types/mood';
import { theme } from '../../theme/theme';
import { MomentsStackParamList } from '../../navigation/MomentsStack';

const categories: ReflectionCategory[] = ['good', 'bad', 'sad'];

type SimilarMoodScreenProps = NativeStackScreenProps<MomentsStackParamList, 'MomentsMain'>;

const SimilarMoodScreen: React.FC<SimilarMoodScreenProps> = ({ navigation }) => {
  const { entries } = useReflections();
  const [activeTab, setActiveTab] = useState<'categories' | 'calendar'>('categories');
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const selectedEntries = useMemo(() => {
    if (!selectedDate) return [];
    return entries.filter((entry) => toDateKey(entry.date) === selectedDate);
  }, [entries, selectedDate]);

  const renderCategoryView = () => (
    <SectionCard
      title="카테고리별 감정 모아보기"
      subtitle="많이 기록한 감정을 살펴보세요"
    >
      {categories.map((category) => {
        const label = reflectionLabels[category];
        const items = entries.filter((entry) => entry[category].trim());
        const visibleItems = items.slice(0, 5);
        const hasMore = items.length > 5;

        return (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.sectionTitle}>
              {label.emoji} {label.title}
            </Text>
            {items.length === 0 ? (
              <Text style={styles.empty}>{`아직 ${label.title}에 대한 기록이 없어요.`}</Text>
            ) : (
              <>
                {visibleItems.map((entry) => {
                  const date = new Date(entry.date);
                  return (
                    <View key={`${entry.id}-${category}`} style={styles.item}>
                      <Text style={styles.date}>{formatDate(date)}</Text>
                      <Text style={styles.content}>{entry[category]}</Text>
                    </View>
                  );
                })}
                {hasMore ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('CategoryDetail', { category })}
                    style={styles.loadMoreButton}
                  >
                    <Text style={styles.loadMoreText}>더 보기</Text>
                  </TouchableOpacity>
                ) : null}
              </>
            )}
          </View>
        );
      })}
    </SectionCard>
  );

  const renderCalendarView = () => (
    <SectionCard title="감정 캘린더" subtitle="날짜를 선택해 감정을 되돌아보세요">
      <MoodCalendar
        entries={entries}
        month={currentMonth}
        onChangeMonth={(date) => {
          setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
          setSelectedDate(null);
        }}
        selectable
        selectedDate={selectedDate}
        onSelectDate={(dateKey) => setSelectedDate(dateKey)}
      />
      <View style={styles.selectedSummary}>
        <Text style={styles.selectedSummaryTitle}>
          {selectedDate ? formatSelectedDate(selectedDate) : '날짜를 선택해주세요'}
        </Text>
        {selectedDate ? (
          selectedEntries.length > 0 ? (
            categories.map((category) => {
              const label = reflectionLabels[category];
              const categoryEntries = selectedEntries
                .map((entry) => entry[category].trim())
                .filter(Boolean);
              return (
                <View key={category} style={styles.selectedCategory}>
                  <Text style={styles.selectedCategoryLabel}>
                    {label.emoji} {label.title}
                  </Text>
                  {categoryEntries.length > 0 ? (
                    categoryEntries.map((text, index) => (
                      <Text key={`${category}-${index}`} style={styles.selectedContent}>
                        {text}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.empty}>기록이 없어요.</Text>
                  )}
                </View>
              );
            })
          ) : (
            <Text style={styles.empty}>선택한 날짜에는 기록이 없어요.</Text>
          )
        ) : null}
      </View>
    </SectionCard>
  );

  return (
    <ScreenContainer>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('categories')}
          style={[styles.tabButton, activeTab === 'categories' && styles.activeTabButton]}
        >
          <Text style={[styles.tabLabel, activeTab === 'categories' && styles.activeTabLabel]}>
            카테고리별
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('calendar')}
          style={[styles.tabButton, activeTab === 'calendar' && styles.activeTabButton]}
        >
          <Text style={[styles.tabLabel, activeTab === 'calendar' && styles.activeTabLabel]}>
            캘린더 보기
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'categories' ? renderCategoryView() : renderCalendarView()}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    gap: 4
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12
  },
  activeTabButton: {
    backgroundColor: theme.colors.primary
  },
  tabLabel: {
    fontWeight: '600',
    color: theme.colors.muted
  },
  activeTabLabel: {
    color: '#FFFFFF'
  },
  categorySection: {
    marginBottom: 24
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
  loadMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: theme.colors.primaryLight
  },
  loadMoreText: {
    color: theme.colors.primaryDark,
    fontWeight: '600'
  },
  empty: {
    color: theme.colors.muted,
    lineHeight: 20
  },
  selectedSummary: {
    marginTop: 16,
    gap: 12
  },
  selectedSummaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text
  },
  selectedCategory: {
    gap: 6
  },
  selectedCategoryLabel: {
    fontWeight: '600',
    color: theme.colors.primaryDark
  },
  selectedContent: {
    color: theme.colors.text,
    lineHeight: 20
  }
});

const toDateKey = (value: string | Date) => {
  const date = typeof value === 'string' ? new Date(value) : value;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDate = (date: Date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

const formatSelectedDate = (key: string) => {
  const [year, month, day] = key.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

export default SimilarMoodScreen;
