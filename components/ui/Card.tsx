import { ReactNode } from 'react';
import { View, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
}

export function Card({ children, onPress, className }: CardProps) {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={cn(
        'rounded-lg shadow-md bg-surface',
        className
      )}
    >
      {children}
    </Container>
  );
}