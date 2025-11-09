import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { reflectionLabels, ReflectionCategory, ReflectionEntry } from '../types/mood';
import { theme } from '../theme/theme';

type Props = {
  entry: ReflectionEntry;
};

const orderedCategories: ReflectionCategory[] = ['good', 'bad', 'sad'];

const MoodCard: React.FC<Props> = ({ entry }) => {

  const sections = orderedCategories
    .map((category) => {
      const label = reflectionLabels[category];
      const value = entry[category];
      const trimmed = value.trim();
      if (!trimmed) {
        return null;
      }
      return {
        category,
        label,
        value: trimmed
      };
    })
    .filter((section): section is { category: ReflectionCategory; label: typeof reflectionLabels[keyof typeof reflectionLabels]; value: string } => !!section);

  if (sections.length === 0) {
    return null;
  }

  return (
    <View style={styles.card}>
      {sections.map((section) => (
        <View key={section.category} style={styles.section}>
          <Text style={styles.sectionTitle}>
            {section.label.emoji} {section.label.title}
          </Text>
          <Text style={styles.sectionContent}>{section.value}</Text>
        </View>
      ))}
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
