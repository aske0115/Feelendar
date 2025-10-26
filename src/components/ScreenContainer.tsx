import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

const BASE_HORIZONTAL_PADDING = 20;
const BASE_TOP_PADDING = 12;
const BASE_BOTTOM_PADDING = 28;
const CONTENT_GAP = 16;

const ScreenContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();

  const topPadding = Math.max(insets.top, BASE_TOP_PADDING);
  const bottomPadding = BASE_BOTTOM_PADDING + insets.bottom;
  const leftPadding = BASE_HORIZONTAL_PADDING + insets.left;
  const rightPadding = BASE_HORIZONTAL_PADDING + insets.right;

  return (
    <LinearGradient
      colors={[theme.colors.primaryLight, '#FFFFFF']}
      style={styles.gradient}
    >
      <ScrollView
        style={styles.scroll}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: topPadding,
            paddingBottom: bottomPadding,
            paddingLeft: leftPadding,
            paddingRight: rightPadding
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
