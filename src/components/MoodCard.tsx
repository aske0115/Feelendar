import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { reflectionLabels, ReflectionCategory, ReflectionEntry } from '../types/mood';
import { theme } from '../theme/theme';

type Props = {
  entry: ReflectionEntry;
};

const orderedCategories: ReflectionCategory[] = ['good', 'bad', 'sad'];

const MoodCard: React.FC<Props> = ({ entry }) => {
  const date = new Date(entry.date);
  const formatted = `${date.getMonth() + 1}월 ${date.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}요일)`;

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formatted}</Text>
      <View style={styles.divider} />
      {orderedCategories.map((category) => {
        const label = reflectionLabels[category];
        const value = entry[category];
        const isEmpty = !value.trim();
        return (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {label.emoji} {label.title}
            </Text>
            <Text style={[styles.sectionContent, isEmpty && styles.emptyText]}>
              {isEmpty ? '아직 기록이 없어요.' : value}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 16
  },
  date: {
    fontSize: 13,
    color: theme.colors.muted,
    fontWeight: '600'
  },
  divider: {
    height: 1,
    backgroundColor: '#E4F5EB'
  },
  section: {
    gap: 6
  },
  sectionTitle: {
    fontWeight: '700',
    color: theme.colors.text,
    fontSize: 15
  },
  sectionContent: {
    color: theme.colors.text,
    lineHeight: 20,
    fontSize: 14
  },
  emptyText: {
    color: theme.colors.muted
  }
});

export default MoodCard;
