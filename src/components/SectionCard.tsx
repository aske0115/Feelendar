import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

type Props = {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
};

const SectionCard: React.FC<Props> = ({ title, subtitle, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0D473A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6
  },
  header: {
    marginBottom: 12
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: theme.colors.muted
  }
});

export default SectionCard;
