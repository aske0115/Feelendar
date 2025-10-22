import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import { useMoods } from '../../context/MoodContext';
import MoodCard from '../../components/MoodCard';
import { theme } from '../../theme/theme';

const MoodHistoryScreen: React.FC = () => {
  const { entries, reactToEntry } = useMoods();

  return (
    <ScreenContainer>
      <SectionCard title="기분 히스토리" subtitle="필요할 때 언제든 되돌아보세요">
        {entries.length === 0 ? (
          <Text style={styles.empty}>아직 작성한 기분이 없어요.</Text>
        ) : (
          <FlatList
            data={entries}
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
  empty: {
    color: theme.colors.muted
  }
});

export default MoodHistoryScreen;
