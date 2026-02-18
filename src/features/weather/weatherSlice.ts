import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState } from '../../types/weather';
import { fetchAutosuggestCities, fetchForecast, fetchWeatherByCity, hydrateFromCache } from './weatherThunks';

const initialState: WeatherState = {
  query: '',
  selectedCity: 'London',
  forecast: [],
  suggestions: [],
  loadingCurrent: false,
  loadingForecast: false,
  loadingSuggestions: false,
  expandedDays: 3,
  hydrated: false
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
      state.query = action.payload;
      state.suggestions = [];
      state.error = undefined;
    },
    clearError: (state) => {
      state.error = undefined;
    },
    setExpandedDays: (state, action: PayloadAction<number>) => {
      state.expandedDays = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAutosuggestCities.pending, (state) => {
        state.loadingSuggestions = true;
      })
      .addCase(fetchAutosuggestCities.fulfilled, (state, action) => {
        state.loadingSuggestions = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchAutosuggestCities.rejected, (state) => {
        state.loadingSuggestions = false;
      })
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loadingCurrent = true;
        state.error = undefined;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loadingCurrent = false;
        state.current = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loadingCurrent = false;
        state.error = (action.payload as string) || 'Failed to load weather';
      })
      .addCase(fetchForecast.pending, (state) => {
        state.loadingForecast = true;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loadingForecast = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loadingForecast = false;
        state.error = (action.payload as string) || 'Failed to load forecast';
      })
      .addCase(hydrateFromCache.fulfilled, (state, action) => {
        state.hydrated = true;
        if (action.payload) {
          state.current = action.payload.current;
          state.forecast = action.payload.forecast;
          state.selectedCity = action.payload.current.city;
          state.query = action.payload.current.city;
        }
      });
  }
});

export const { setQuery, setSelectedCity, clearError, setExpandedDays } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
