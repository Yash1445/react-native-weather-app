import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CitySuggestion } from '../../types/weather';

interface Props {
  value: string;
  onChangeText: (v: string) => void;
  suggestions: CitySuggestion[];
  onSelectSuggestion: (city: string) => void;
}

export const SearchBar = ({ value, onChangeText, suggestions, onSelectSuggestion }: Props) => {
  const visibleSuggestions = suggestions.slice(0, 8);

  return (
    <View style={styles.wrap}>
      <TextInput
        placeholder="Search city"
        placeholderTextColor="#c7d2fe"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />

      {visibleSuggestions.length > 0 && (
        <View style={styles.dropdown}>
          {visibleSuggestions.map((item) => (
            <Pressable key={item.id} style={styles.option} onPress={() => onSelectSuggestion(item.name)}>
              <Text style={styles.optionText}>
                {item.name}, {item.country}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { zIndex: 10 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    color: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  dropdown: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(10,18,32,0.95)',
    overflow: 'hidden'
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.15)'
  },
  optionText: { color: '#fff' }
});
