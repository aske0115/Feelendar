import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import MoodEntryScreen from '../screens/Home/MoodEntryScreen';
import MoodHistoryScreen from '../screens/History/MoodHistoryScreen';
import SimilarMoodScreen from '../screens/Community/SimilarMoodScreen';
import StatisticsScreen from '../screens/Stats/StatisticsScreen';

export type MainTabParamList = {
  Home: undefined;
  LogMood: undefined;
  Moments: undefined;
  History: undefined;
  Stats: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#6E8F85',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E4F5EB',
          paddingBottom: 6,
          height: 64
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'LogMood') iconName = 'leaf';
          if (route.name === 'Moments') iconName = 'book';
          if (route.name === 'History') iconName = 'calendar';
          if (route.name === 'Stats') iconName = 'stats-chart';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="LogMood" component={MoodEntryScreen} options={{ title: '기분 기록' }} />
      <Tab.Screen name="Moments" component={SimilarMoodScreen} options={{ title: '감정 모아보기' }} />
      <Tab.Screen name="History" component={MoodHistoryScreen} options={{ title: '히스토리' }} />
      <Tab.Screen name="Stats" component={StatisticsScreen} options={{ title: '통계' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;
