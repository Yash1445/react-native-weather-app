import { WEATHER_GRADIENTS } from '../constants/theme';

export const getWeatherTheme = (condition: string): [string, string] => {
  const normalized = condition.toLowerCase();
  if (normalized.includes('rain') || normalized.includes('drizzle') || normalized.includes('thunder')) return WEATHER_GRADIENTS.rainy;
  if (normalized.includes('cloud') || normalized.includes('overcast') || normalized.includes('mist') || normalized.includes('fog')) return WEATHER_GRADIENTS.cloudy;
  if (normalized.includes('snow') || normalized.includes('sleet') || normalized.includes('ice')) return WEATHER_GRADIENTS.snowy;
  if (normalized.includes('sun') || normalized.includes('clear')) return WEATHER_GRADIENTS.sunny;
  return WEATHER_GRADIENTS.default;
};
