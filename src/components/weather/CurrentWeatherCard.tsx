import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { CurrentWeather } from '../../types/weather';

interface Props {
  weather: CurrentWeather;
}

export const CurrentWeatherCard = ({ weather }: Props) => {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -4, duration: 1200, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 1200, useNativeDriver: true })
      ])
    ).start();
  }, [bounce]);

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.city}, {weather.country}</Text>
      <View style={styles.row}>
        <Animated.Image source={{ uri: weather.iconUrl }} style={[styles.icon, { transform: [{ translateY: bounce }] }]} />
        <View>
          <Text style={styles.temp}>{Math.round(weather.temperatureC)}°C</Text>
          <Text style={styles.cond}>{weather.conditionText}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.stat}>Feels {Math.round(weather.feelsLikeC)}°</Text>
        <Text style={styles.stat}>Humidity {weather.humidity}%</Text>
        <Text style={styles.stat}>Wind {Math.round(weather.windKph)} kph</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6
  },
  city: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  icon: { width: 80, height: 80 },
  temp: { color: '#fff', fontSize: 34, fontWeight: '800' },
  cond: { color: '#DDE8FF' },
  statsRow: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' },
  stat: { color: '#fff', fontSize: 12 }
});
