import { View, Text, Image } from 'react-native';

interface AvatarProps {
  uri?: string;
  initials?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Avatar({ uri, initials, size = 'medium' }: AvatarProps) {
  const dimensions = size === 'small' ? 32 : size === 'large' ? 64 : 48;

  return uri ? (
    <Image
      source={{ uri }}
      style={{ width: dimensions, height: dimensions, borderRadius: dimensions / 2 }}
    />
  ) : (
    <View
      style={{
        width: dimensions,
        height: dimensions,
        borderRadius: dimensions / 2,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: dimensions / 2.5 }}>{initials}</Text>
    </View>
  );
}