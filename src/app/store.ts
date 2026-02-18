import { configureStore } from '@reduxjs/toolkit';
import { weatherReducer } from '../features/weather/weatherSlice';
import { cacheMiddleware } from '../utils/cacheMiddleware';

export const store = configureStore({
  reducer: {
    weather: weatherReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(cacheMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
