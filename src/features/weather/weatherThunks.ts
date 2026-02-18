import { createAsyncThunk } from '@reduxjs/toolkit';
import { weatherApi } from '../../services/weatherApi';
import { loadWeatherCache } from '../../utils/cache';

export const fetchAutosuggestCities = createAsyncThunk(
  'weather/fetchAutosuggestCities',
  async (query: string, { rejectWithValue }) => {
    try {
      return await weatherApi.searchCity(query);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (city: string, { rejectWithValue }) => {
    try {
      const payload = await weatherApi.fetchWeather(city, 3);
      return payload.current;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async ({ city, days }: { city: string; days: number }, { rejectWithValue }) => {
    try {
      const payload = await weatherApi.fetchWeather(city, days);
      return payload.forecast;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const hydrateFromCache = createAsyncThunk('weather/hydrateFromCache', async () => {
  return loadWeatherCache();
});
