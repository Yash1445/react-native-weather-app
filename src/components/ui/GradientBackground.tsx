import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  colors: [string, string];
  children: React.ReactNode;
}

export const GradientBackground = ({ colors, children }: Props) => (
  <LinearGradient colors={colors} style={styles.container}>
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: { flex: 1 }
});
