import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MoodEntry } from '../types/mood';
import { theme } from '../theme/theme';
import MoodBadge from './MoodBadge';
import ReactionButtons from './ReactionButtons';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  entry: MoodEntry;
  onReact: (type: 'empathy' | 'cheer' | 'tips') => void;
};

const MoodCard: React.FC<Props> = ({ entry, onReact }) => {
  const date = new Date(entry.date);
  const formatted = `${date.getMonth() + 1}월 ${date.getDate()}일 ${['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}요일`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MoodBadge mood={entry.mood} />
        <View style={styles.privacy}>
          <Ionicons name="lock-closed" size={14} color={theme.colors.muted} />
          <Text style={styles.privacyText}>{entry.privacy}</Text>
        </View>
      </View>
      <Text style={styles.reason}>{entry.reason}</Text>
      <Text style={styles.date}>{formatted}</Text>
      <ReactionButtons
        empathy={entry.reactions.empathy}
        cheer={entry.reactions.cheer}
        tips={entry.reactions.tips}
        onReact={onReact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  privacy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  privacyText: {
    color: theme.colors.muted,
    fontSize: 12
  },
  reason: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 22
  },
  date: {
    fontSize: 12,
    color: theme.colors.muted
  }
});

export default MoodCard;
