import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

const BASE_HORIZONTAL_PADDING = 20;
const BASE_TOP_PADDING = 16;
const BASE_BOTTOM_PADDING = 40;
const CONTENT_GAP = 16;

const ScreenContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[theme.colors.primaryLight, '#FFFFFF']}
      style={styles.gradient}
    >
      <ScrollView
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: BASE_TOP_PADDING + insets.top,
            paddingBottom: BASE_BOTTOM_PADDING + insets.bottom,
            paddingLeft: BASE_HORIZONTAL_PADDING + insets.left,
            paddingRight: BASE_HORIZONTAL_PADDING + insets.right
          }
        ]}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: BASE_HORIZONTAL_PADDING,
    paddingBottom: BASE_BOTTOM_PADDING,
    paddingTop: BASE_TOP_PADDING,
    gap: CONTENT_GAP
  }
});

export default ScreenContainer;
