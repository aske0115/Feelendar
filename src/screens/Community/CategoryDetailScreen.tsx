import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { useReflections } from '../../context/MoodContext';
import { ReflectionCategory, reflectionLabels } from '../../types/mood';
import { theme } from '../../theme/theme';
import { MomentsStackParamList } from '../../navigation/MomentsStack';

type CategoryDetailProps = NativeStackScreenProps<MomentsStackParamList, 'CategoryDetail'>;

const PAGE_SIZE = 20;

const CategoryDetailScreen: React.FC<CategoryDetailProps> = ({ navigation, route }) => {
  const { category } = route.params;
  const { entries } = useReflections();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const label = reflectionLabels[category];

  const categoryEntries = useMemo(() => {
    return entries
      .filter((entry) => entry[category].trim())
      .map((entry) => ({
        id: entry.id,
        date: new Date(entry.date),
        content: entry[category].trim()
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [entries, category]);

  const renderItem = ({ item }: { item: { id: string; date: Date; content: string } }) => (
    <View style={styles.entry}>
      <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
      <Text style={styles.entryContent}>{item.content}</Text>
    </View>
  );

  const data = categoryEntries.slice(0, visibleCount);
  const hasMore = categoryEntries.length > visibleCount;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, categoryEntries.length));
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {label.emoji} {label.title}
        </Text>
      </View>

      <SectionCard
        title={`${label.title} 기록 모아보기`}
        subtitle="더 자세하게 돌아보고 싶은 순간들입니다"
      >
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={<Text style={styles.empty}>기록이 아직 없습니다.</Text>}
        />
        {hasMore ? (
          <TouchableOpacity onPress={loadMore} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>더 보기</Text>
          </TouchableOpacity>
        ) : null}
      </SectionCard>
    </ScreenContainer>
  );
};

const formatDate = (date: Date) => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonText: {
    fontSize: 20,
    color: theme.colors.primaryDark,
    fontWeight: '700'
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primaryDark
  },
  entry: {
    gap: 6
  },
  entryDate: {
    color: theme.colors.muted,
    fontSize: 12
  },
  entryContent: {
    color: theme.colors.text,
    lineHeight: 20,
    fontSize: 15
  },
  separator: {
    height: 16
  },
  empty: {
    color: theme.colors.muted
  },
  loadMoreButton: {
    marginTop: 16,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: theme.colors.primary
  },
  loadMoreText: {
    color: '#FFFFFF',
    fontWeight: '600'
  }
});

export default CategoryDetailScreen;
