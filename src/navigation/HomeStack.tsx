import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import MoodEntryScreen from '../screens/Home/MoodEntryScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  MoodEntry: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="MoodEntry" component={MoodEntryScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
