import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

const moodColors: Record<string, string> = {
  행복해요: '#6EE7B7',
  좋아요: '#A7F3D0',
  보통이에요: '#FCD34D',
  우울해요: '#FDBA74',
  지쳤어요: '#FCA5A5'
};

type Props = {
  mood: string;
};

const MoodBadge: React.FC<Props> = ({ mood }) => {
  return (
    <View style={[styles.badge, { backgroundColor: moodColors[mood] || theme.colors.primary }]}>
      <Text style={styles.text}>{mood}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start'
  },
  text: {
    fontWeight: '600',
    color: theme.colors.text
  }
});

export default MoodBadge;
