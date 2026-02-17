import { View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export function SkeletonLoader() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={{ backgroundColor: '#e0e0e0', height: 20, marginVertical: 8, opacity }} />
  );
}