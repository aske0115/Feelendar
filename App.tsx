import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { MoodProvider } from './src/context/MoodContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MoodProvider>
          <NavigationContainer theme={theme.navigation}>
            <StatusBar style="light" />
            <AppNavigator />
          </NavigationContainer>
        </MoodProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
