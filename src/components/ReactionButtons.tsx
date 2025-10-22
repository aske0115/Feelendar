import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

type Props = {
  empathy: number;
  cheer: number;
  tips: number;
  onReact: (type: 'empathy' | 'cheer' | 'tips') => void;
};

const ReactionButtons: React.FC<Props> = ({ empathy, cheer, tips, onReact }) => {
  return (
    <View style={styles.container}>
      <ReactionButton icon="heart" label="공감" count={empathy} onPress={() => onReact('empathy')} />
      <ReactionButton icon="sunny" label="응원" count={cheer} onPress={() => onReact('cheer')} />
      <ReactionButton icon="bulb" label="팁" count={tips} onPress={() => onReact('tips')} />
    </View>
  );
};

type ReactionButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  count: number;
  onPress: () => void;
};

const ReactionButton: React.FC<ReactionButtonProps> = ({ icon, label, count, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Ionicons name={icon} size={18} color={theme.colors.primaryDark} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.count}>{count}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#F0F7F4'
  },
  label: {
    fontSize: 13,
    color: theme.colors.primaryDark,
    fontWeight: '600'
  },
  count: {
    fontSize: 13,
    color: theme.colors.muted
  }
});

export default ReactionButtons;
