import { View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={{ alignItems: 'center', padding: 16 }}>
      <Ionicons name="alert-circle" size={48} color="red" />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 8 }}>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}