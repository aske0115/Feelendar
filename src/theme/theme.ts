import { DefaultTheme } from '@react-navigation/native';

const palette = {
  primary: '#2BAE66',
  primaryDark: '#0D473A',
  primaryLight: '#E4F5EB',
  secondary: '#FFD166',
  background: '#F7FBF9',
  surface: '#FFFFFF',
  text: '#1D3A32',
  muted: '#6E8F85'
};

export const theme = {
  colors: palette,
  navigation: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: palette.primary,
      background: palette.background,
      card: palette.surface,
      text: palette.text,
      border: palette.primaryLight,
      notification: palette.secondary
    }
  }
};

export type Theme = typeof theme;
