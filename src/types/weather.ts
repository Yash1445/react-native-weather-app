export interface CitySuggestion {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temperatureC: number;
  conditionText: string;
  iconUrl: string;
  feelsLikeC: number;
  humidity: number;
  windKph: number;
  pressureMb: number;
  uv: number;
}

export interface ForecastHour {
  time: string;
  tempC: number;
  iconUrl: string;
  chanceOfRain: number;
  windKph: number;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  maxTempC: number;
  minTempC: number;
  iconUrl: string;
  conditionText: string;
  sunrise: string;
  sunset: string;
  uv: number;
  chanceOfRain: number;
  maxWindKph: number;
  totalPrecipMm: number;
  hours: ForecastHour[];
}

export interface WeatherPayload {
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export interface WeatherState {
  query: string;
  selectedCity: string;
  current?: CurrentWeather;
  forecast: ForecastDay[];
  suggestions: CitySuggestion[];
  loadingCurrent: boolean;
  loadingForecast: boolean;
  loadingSuggestions: boolean;
  error?: string;
  expandedDays: number;
  hydrated: boolean;
}
