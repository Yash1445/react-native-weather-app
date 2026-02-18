# Weather Assignment App (Expo + TypeScript)

Production-style React Native weather app using WeatherAPI with scalable architecture.

## Features
- City search with 300ms debounced autosuggest
- Current weather card (temp, condition, feels-like, humidity, wind)
- 3-day forecast by default
- Expandable forecast (3 ↔ 7 days)
- Forecast detail screen (hourly, sunrise/sunset, UV, rain chance, wind, precipitation)
- Friendly error states + retry
- Loading skeleton shimmer states
- Offline cache hydration from AsyncStorage
- Dynamic gradient themes based on weather condition
- Reusable, modular TypeScript component architecture

## Tech Stack
- Expo + React Native
- TypeScript (strict)
- Redux Toolkit + Redux Thunk
- React Navigation (native stack)
- Axios
- AsyncStorage

## Project Structure
```text
src/
  app/
    navigation.tsx
    store.ts
  features/weather/
    weatherSlice.ts
    weatherThunks.ts
    selectors.ts
  components/
    ui/
    weather/
  screens/
    HomeScreen.tsx
    ForecastDetailScreen.tsx
  hooks/
  services/
    weatherApi.ts
  utils/
  constants/
  types/
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start app:
   ```bash
   npm run start
   ```
3. Run platform builds:
   ```bash
   npm run android
   npm run ios
   ```

> API key is configured in `app.json` under `expo.extra.weatherApiKey`.

## Architecture Notes
- API access is isolated to `services/weatherApi.ts`.
- Async business flows live in `weatherThunks.ts`.
- State transitions and UI flags are in `weatherSlice.ts`.
- UI reads state using selectors for clean derivation.
- Cache middleware persists successful weather payloads.

## Error Handling
- Invalid city, empty result, API and network errors are normalized in service layer.
- UI shows user-friendly error card with retry action.

## Testing
Run:
```bash
npm test
```
Includes baseline unit tests for slice and selectors.

## Screenshots
- `docs/screenshots/home.png` (placeholder)
- `docs/screenshots/forecast-detail.png` (placeholder)
