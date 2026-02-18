import React from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { ForecastDay } from '../../types/weather';

interface Props {
  day: ForecastDay;
  onPress: () => void;
}

export const ForecastDayCard = ({ day, onPress }: Props) => (
  <Pressable style={styles.card} onPress={onPress}>
    <Text style={styles.day}>{day.dayName}</Text>
    <Image source={{ uri: day.iconUrl }} style={styles.icon} />
    <Text style={styles.temp}>{Math.round(day.maxTempC)}° / {Math.round(day.minTempC)}°</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    width: 120,
    borderRadius: 14,
    padding: 12,
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center'
  },
  day: { color: '#fff', fontWeight: '700' },
  icon: { width: 48, height: 48 },
  temp: { color: '#DDE8FF', fontSize: 12 }
});
