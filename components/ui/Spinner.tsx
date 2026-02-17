import { ActivityIndicator } from 'react-native';

interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export function Spinner({ size = 'large', color = '#000' }: SpinnerProps) {
  return <ActivityIndicator size={size} color={color} />;
}