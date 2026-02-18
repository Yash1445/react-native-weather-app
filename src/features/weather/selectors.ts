import { RootState } from '../../app/store';

export const selectWeatherState = (state: RootState) => state.weather;
export const selectCurrent = (state: RootState) => state.weather.current;
export const selectForecast = (state: RootState) => state.weather.forecast.slice(0, state.weather.expandedDays);
export const selectSuggestions = (state: RootState) => state.weather.suggestions;
export const selectLoading = (state: RootState) =>
  state.weather.loadingCurrent || state.weather.loadingForecast;
