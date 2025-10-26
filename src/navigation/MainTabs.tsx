import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeStackNavigator from './HomeStack';
import MoodHistoryScreen from '../screens/History/MoodHistoryScreen';
import MomentsStackNavigator from './MomentsStack';
import StatisticsScreen from '../screens/Stats/StatisticsScreen';

export type MainTabParamList = {
  Home: undefined;
  Moments: undefined;
  History: undefined;
  Stats: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const TAB_BAR_BASE_HEIGHT = 64;
const TAB_BAR_BASE_PADDING = 6;
const TAB_BAR_TOP_PADDING = 8;

const MainTabs = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#6E8F85',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E4F5EB',
          paddingBottom: TAB_BAR_BASE_PADDING + insets.bottom,
          paddingTop: TAB_BAR_TOP_PADDING,
          height: TAB_BAR_BASE_HEIGHT + insets.bottom
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Moments') iconName = 'book';
          if (route.name === 'History') iconName = 'calendar';
          if (route.name === 'Stats') iconName = 'stats-chart';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: '홈' }} />
      <Tab.Screen name="Moments" component={MomentsStackNavigator} options={{ title: '감정 모아보기' }} />
      <Tab.Screen name="History" component={MoodHistoryScreen} options={{ title: '히스토리' }} />
      <Tab.Screen name="Stats" component={StatisticsScreen} options={{ title: '통계' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;
