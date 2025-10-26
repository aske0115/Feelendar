import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MoodCard from '../../components/MoodCard';
import ScreenContainer from '../../components/ScreenContainer';
import SectionCard from '../../components/SectionCard';
import TabHeader from '../../components/TabHeader';
import { useReflections } from '../../context/MoodContext';
import { theme } from '../../theme/theme';

const MoodHistoryScreen: React.FC = () => {
  const { entries } = useReflections();

  return (
    <ScreenContainer>
      <TabHeader
        icon="calendar"
        title="히스토리"
        description="기록해 둔 감정 다이어리를 다시 읽어보세요"
        compact
      />
      <SectionCard title="감정 다이어리 기록" subtitle="필요할 때마다 다시 꺼내볼 수 있어요">
        {entries.length === 0 ? (
          <Text style={styles.empty}>아직 작성한 기록이 없어요. 오늘 밤 첫 페이지를 채워보세요.</Text>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => <MoodCard entry={item} />}
          />
        )}
      </SectionCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  empty: {
    color: theme.colors.muted,
    lineHeight: 20
  }
});

export default MoodHistoryScreen;
