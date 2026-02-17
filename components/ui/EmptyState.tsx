import { ReactNode } from 'react';
import { View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={{ alignItems: 'center', padding: 16 }}>
      {icon || <Ionicons name="alert-circle-outline" size={48} color="gray" />}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 8 }}>{title}</Text>
      {description ? <Text style={{ textAlign: 'center', marginBottom: 16 }}>{description}</Text> : null}
      {actionLabel && onAction ? (
        <Button title={actionLabel} onPress={onAction} />
      ) : null}
    </View>
  );
}