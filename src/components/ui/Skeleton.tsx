import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface SkeletonProps {
  style?: StyleProp<ViewStyle>;
}

export const Skeleton = ({ style }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.85, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.45, duration: 600, useNativeDriver: true })
      ])
    ).start();
  }, [opacity]);

  return <Animated.View style={[styles.base, style, { opacity }]} />;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12
  }
});
