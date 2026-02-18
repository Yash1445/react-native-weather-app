import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherPayload } from '../types/weather';

const CACHE_KEY = 'weather:lastPayload';

export const saveWeatherCache = async (payload: WeatherPayload) => {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));
};

export const loadWeatherCache = async (): Promise<WeatherPayload | null> => {
  const raw = await AsyncStorage.getItem(CACHE_KEY);
  return raw ? (JSON.parse(raw) as WeatherPayload) : null;
};
