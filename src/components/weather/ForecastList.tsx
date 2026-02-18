import React from 'react';
import { FlatList, LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';
import { ForecastDay } from '../../types/weather';
import { ForecastDayCard } from './ForecastDayCard';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  data: ForecastDay[];
  expandedDays: number;
  maxDays: number;
  onToggleExpand: () => void;
  onOpenDay: (day: ForecastDay) => void;
}

export const ForecastList = ({ data, expandedDays, maxDays, onToggleExpand, onOpenDay }: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Forecast</Text>
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          onToggleExpand();
        }}
      >
        <Text style={styles.toggle}>{expandedDays === 3 ? 'Show more' : 'Show less'}</Text>
      </Pressable>
    </View>

    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data.slice(0, expandedDays)}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => <ForecastDayCard day={item} onPress={() => onOpenDay(item)} />}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 18 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  toggle: { color: '#BFD3FF', fontWeight: '700' }
});
