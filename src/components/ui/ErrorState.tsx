import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: Props) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
    <Pressable style={styles.button} onPress={onRetry}>
      <Text style={styles.buttonText}>Retry</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', gap: 10 },
  message: { color: '#FFE5E5', textAlign: 'center' },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  buttonText: { color: '#fff', fontWeight: '700' }
});
