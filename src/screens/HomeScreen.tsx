import React, { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app/navigation';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { SearchBar } from '../components/weather/SearchBar';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { ForecastList } from '../components/weather/ForecastList';
import { ErrorState } from '../components/ui/ErrorState';
import { Skeleton } from '../components/ui/Skeleton';
import { GradientBackground } from '../components/ui/GradientBackground';
import { fetchAutosuggestCities, fetchForecast, fetchWeatherByCity, hydrateFromCache } from '../features/weather/weatherThunks';
import { setExpandedDays, setQuery, setSelectedCity } from '../features/weather/weatherSlice';
import { selectCurrent, selectLoading, selectSuggestions, selectWeatherState } from '../features/weather/selectors';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { getWeatherTheme } from '../utils/weatherTheme';

export const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const dispatch = useAppDispatch();
  const weatherState = useAppSelector(selectWeatherState);
  const current = useAppSelector(selectCurrent);
  const loading = useAppSelector(selectLoading);
  const suggestions = useAppSelector(selectSuggestions);
  const debouncedQuery = useDebouncedValue(weatherState.query, 300);

  useEffect(() => {
    dispatch(hydrateFromCache());
    dispatch(fetchWeatherByCity(weatherState.selectedCity));
    dispatch(fetchForecast({ city: weatherState.selectedCity, days: weatherState.expandedDays }));
  }, [dispatch]);

  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      dispatch(fetchAutosuggestCities(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  const loadCity = (city: string) => {
    dispatch(setSelectedCity(city));
    dispatch(fetchWeatherByCity(city));
    dispatch(fetchForecast({ city, days: weatherState.expandedDays }));
  };

  const toggleDays = () => {
    const next = weatherState.expandedDays === 3 ? 7 : 3;
    dispatch(setExpandedDays(next));
    dispatch(fetchForecast({ city: weatherState.selectedCity, days: next }));
  };

  const listHeader = useMemo(
    () => (
      <View style={styles.headerContent}>
        <SearchBar
          value={weatherState.query}
          onChangeText={(text) => dispatch(setQuery(text))}
          suggestions={suggestions}
          onSelectSuggestion={loadCity}
        />

        {weatherState.error ? (
          <ErrorState message={weatherState.error} onRetry={() => loadCity(weatherState.selectedCity)} />
        ) : loading || !current ? (
          <View style={styles.skeletonWrap}>
            <Skeleton style={{ height: 170 }} />
            <Skeleton style={{ height: 110 }} />
          </View>
        ) : (
          <>
            <CurrentWeatherCard weather={current} />
            <ForecastList
              data={weatherState.forecast}
              expandedDays={weatherState.expandedDays}
              maxDays={7}
              onToggleExpand={toggleDays}
              onOpenDay={(day) => navigation.navigate('ForecastDetail', { day, cityName: current.city })}
            />
          </>
        )}
      </View>
    ),
    [current, dispatch, loading, navigation, suggestions, weatherState.error, weatherState.expandedDays, weatherState.forecast, weatherState.query, weatherState.selectedCity]
  );

  return (
    <GradientBackground colors={getWeatherTheme(current?.conditionText || 'default')}>
      <FlatList
        data={[]}
        keyExtractor={(_, index) => String(index)}
        renderItem={null}
        ListHeaderComponent={listHeader}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  headerContent: {
    gap: 16
  },
  skeletonWrap: { gap: 12, marginTop: 12 }
});
