import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { moodOptions, useMoods } from '../../context/MoodContext';
import MoodCard from '../../components/MoodCard';
import { theme } from '../../theme/theme';

const SimilarMoodScreen: React.FC = () => {
  const { entries, reactToEntry } = useMoods();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!selectedMood) return entries.filter((entry) => entry.privacy !== '비공개');
    return entries.filter((entry) => entry.mood === selectedMood && entry.privacy !== '비공개');
  }, [entries, selectedMood]);

  return (
    <ScreenContainer>
      <SectionCard title="비슷한 기분 둘러보기" subtitle="공개된 감정만 보여드려요">
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedMood && styles.filterChipSelected]}
            onPress={() => setSelectedMood(null)}
          >
            <Text style={[styles.filterText, !selectedMood && styles.filterTextSelected]}>전체</Text>
          </TouchableOpacity>
          {moodOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.filterChip, selectedMood === option && styles.filterChipSelected]}
              onPress={() => setSelectedMood(option)}
            >
              <Text
                style={[styles.filterText, selectedMood === option && styles.filterTextSelected]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {filtered.length === 0 ? (
          <Text style={styles.empty}>아직 해당 감정의 공개 기록이 없어요.</Text>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <MoodCard entry={item} onReact={(type) => reactToEntry(item.id, type)} />
            )}
          />
        )}
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#E8F4EF'
  },
  filterChipSelected: {
    backgroundColor: theme.colors.primaryDark
  },
  filterText: {
    color: theme.colors.muted,
    fontWeight: '600',
    fontSize: 13
  },
  filterTextSelected: {
    color: '#FFFFFF'
  },
  empty: {
    color: theme.colors.muted
  }
});

export default SimilarMoodScreen;
