import { Middleware } from '@reduxjs/toolkit';
import { saveWeatherCache } from './cache';

export const cacheMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  if (action.type === 'weather/fetchForecast/fulfilled') {
    const state = storeApi.getState() as { weather: any };
    if (state.weather.current && state.weather.forecast.length) {
      saveWeatherCache({ current: state.weather.current, forecast: state.weather.forecast }).catch(() => {});
    }
  }
  return result;
};
