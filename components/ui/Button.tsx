import { ReactNode } from 'react';
import { Pressable, Text, ActivityIndicator, Animated, Platform } from 'react-native';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onPress?: () => void;
}

export function Button({ children, variant = 'primary', size = 'md', loading = false, onPress }: ButtonProps) {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        cn(
          'rounded-md',
          variant === 'primary' && 'bg-primary',
          variant === 'secondary' && 'bg-secondary',
          variant === 'outline' && 'border',
          variant === 'ghost' && 'bg-transparent',
          variant === 'destructive' && 'bg-error',
          size === 'sm' && 'py-1 px-2',
          size === 'md' && 'py-2 px-4',
          size === 'lg' && 'py-3 px-6',
          pressed && 'opacity-75'
        ),
      ]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text>{children}</Text>}
      </Animated.View>
    </Pressable>
  );
}