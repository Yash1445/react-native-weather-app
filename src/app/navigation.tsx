import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ForecastDetailScreen } from '../screens/ForecastDetailScreen';
import { ForecastDay } from '../types/weather';

export type RootStackParamList = {
  Home: undefined;
  ForecastDetail: { day: ForecastDay; cityName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#0B1220' },
      headerTintColor: '#fff',
      contentStyle: { backgroundColor: '#0B1220' },
      animation: 'slide_from_right'
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Weather' }} />
    <Stack.Screen name="ForecastDetail" component={ForecastDetailScreen} options={{ title: 'Day Details' }} />
  </Stack.Navigator>
);
