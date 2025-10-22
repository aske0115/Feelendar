import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

const ScreenContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LinearGradient
      colors={[theme.colors.primaryLight, '#FFFFFF']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 16,
    gap: 16
  }
});

export default ScreenContainer;
