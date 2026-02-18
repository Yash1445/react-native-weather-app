import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app/navigation';

export const ForecastDetailScreen = ({ route }: NativeStackScreenProps<RootStackParamList, 'ForecastDetail'>) => {
  const { day, cityName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cityName} • {day.dayName}</Text>
      <View style={styles.summaryCard}>
        <Image source={{ uri: day.iconUrl }} style={styles.icon} />
        <Text style={styles.condition}>{day.conditionText}</Text>
        <Text style={styles.range}>{Math.round(day.maxTempC)}° / {Math.round(day.minTempC)}°</Text>
      </View>

      <View style={styles.metaGrid}>
        <Text style={styles.meta}>Sunrise: {day.sunrise}</Text>
        <Text style={styles.meta}>Sunset: {day.sunset}</Text>
        <Text style={styles.meta}>UV: {day.uv}</Text>
        <Text style={styles.meta}>Rain chance: {day.chanceOfRain}%</Text>
        <Text style={styles.meta}>Wind max: {Math.round(day.maxWindKph)} kph</Text>
        <Text style={styles.meta}>Precipitation: {day.totalPrecipMm} mm</Text>
      </View>

      <Text style={styles.sectionTitle}>Hourly</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={day.hours}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <View style={styles.hourCard}>
            <Text style={styles.hourText}>{item.time.slice(11)}</Text>
            <Image source={{ uri: item.iconUrl }} style={styles.hourIcon} />
            <Text style={styles.hourText}>{Math.round(item.tempC)}°</Text>
            <Text style={styles.hourSub}>🌧 {item.chanceOfRain}%</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0B1220' },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  summaryCard: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.16)',
    padding: 14,
    alignItems: 'center'
  },
  icon: { width: 70, height: 70 },
  condition: { color: '#fff', fontWeight: '700', marginTop: 6 },
  range: { color: '#DDE8FF', marginTop: 4 },
  metaGrid: { marginTop: 14, gap: 6 },
  meta: { color: '#fff' },
  sectionTitle: { marginTop: 18, color: '#fff', fontSize: 16, fontWeight: '700' },
  hourCard: {
    marginTop: 10,
    marginRight: 10,
    borderRadius: 12,
    padding: 10,
    width: 90,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)'
  },
  hourIcon: { width: 38, height: 38 },
  hourText: { color: '#fff', fontWeight: '600' },
  hourSub: { color: '#C7D2FE', fontSize: 12 }
});
