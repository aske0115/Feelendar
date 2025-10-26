import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SimilarMoodScreen from '../screens/Community/SimilarMoodScreen';
import CategoryDetailScreen from '../screens/Community/CategoryDetailScreen';
import { ReflectionCategory } from '../types/mood';

export type MomentsStackParamList = {
  MomentsMain: undefined;
  CategoryDetail: { category: ReflectionCategory };
};

const Stack = createNativeStackNavigator<MomentsStackParamList>();

const MomentsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MomentsMain" component={SimilarMoodScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
    </Stack.Navigator>
  );
};

export default MomentsStackNavigator;
