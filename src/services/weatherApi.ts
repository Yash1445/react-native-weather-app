import axios from 'axios';
import Constants from 'expo-constants';
import { CitySuggestion, ForecastDay, WeatherPayload } from '../types/weather';

const api = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  timeout: 10000
});

const weatherApiKey = (Constants.expoConfig?.extra?.weatherApiKey || '').trim();

interface WeatherApiError {
  message: string;
}

const normalizeError = (error: unknown): WeatherApiError => {
  if (axios.isAxiosError(error)) {
    return { message: error.response?.data?.error?.message || error.message || 'Request failed' };
  }
  return { message: 'Something went wrong. Please try again.' };
};

const mapForecastDay = (raw: any): ForecastDay => ({
  date: raw.date,
  dayName: new Date(raw.date).toLocaleDateString('en-US', { weekday: 'short' }),
  maxTempC: raw.day.maxtemp_c,
  minTempC: raw.day.mintemp_c,
  iconUrl: `https:${raw.day.condition.icon}`,
  conditionText: raw.day.condition.text,
  sunrise: raw.astro.sunrise,
  sunset: raw.astro.sunset,
  uv: raw.day.uv,
  chanceOfRain: raw.day.daily_chance_of_rain,
  maxWindKph: raw.day.maxwind_kph,
  totalPrecipMm: raw.day.totalprecip_mm,
  hours: raw.hour.map((h: any) => ({
    time: h.time,
    tempC: h.temp_c,
    iconUrl: `https:${h.condition.icon}`,
    chanceOfRain: h.chance_of_rain,
    windKph: h.wind_kph
  }))
});

export const weatherApi = {
  async searchCity(query: string): Promise<CitySuggestion[]> {
    if (!query.trim()) return [];
    try {
      const { data } = await api.get('/search.json', { params: { key: weatherApiKey, q: query } });
      return data.map((city: any) => ({
        id: `${city.lat}-${city.lon}`,
        name: city.name,
        region: city.region,
        country: city.country,
        lat: city.lat,
        lon: city.lon
      }));
    } catch (e) {
      throw normalizeError(e);
    }
  },

  async fetchWeather(city: string, days = 3): Promise<WeatherPayload> {
    try {
      const { data } = await api.get('/forecast.json', {
        params: { key: weatherApiKey, q: city, days, aqi: 'no', alerts: 'no' }
      });
      return {
        current: {
          city: data.location.name,
          country: data.location.country,
          temperatureC: data.current.temp_c,
          conditionText: data.current.condition.text,
          iconUrl: `https:${data.current.condition.icon}`,
          feelsLikeC: data.current.feelslike_c,
          humidity: data.current.humidity,
          windKph: data.current.wind_kph,
          pressureMb: data.current.pressure_mb,
          uv: data.current.uv
        },
        forecast: data.forecast.forecastday.map(mapForecastDay)
      };
    } catch (e) {
      throw normalizeError(e);
    }
  }
};
