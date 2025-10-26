import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

type TabHeaderProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  compact?: boolean;
};

const TabHeader: React.FC<TabHeaderProps> = ({ icon, title, description, compact = false }) => {
  const iconSize = compact ? 18 : 22;
  const wrapperSize = compact ? 36 : 40;

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <View
        style={[
          styles.iconWrapper,
          compact && {
            width: wrapperSize,
            height: wrapperSize,
            borderRadius: wrapperSize / 2
          }
        ]}
      >
        <Ionicons name={icon} size={iconSize} color={theme.colors.primaryDark} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.title, compact && styles.compactTitle]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, compact && styles.compactDescription]}>{description}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12
  },
  compactContainer: {
    gap: 10,
    marginBottom: 10
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWrapper: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.primaryDark
  },
  compactTitle: {
    fontSize: 18
  },
  description: {
    marginTop: 2,
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  compactDescription: {
    fontSize: 12,
    lineHeight: 16
  }
});

export default TabHeader;
