import { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  secureTextEntry?: boolean;
}

export function Input({ label, error, leftIcon, rightIcon, secureTextEntry, ...props }: InputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 4, height: 48 }}>
        {leftIcon}
        <TextInput
          {...props}
          secureTextEntry={isSecure}
          style={{ flex: 1, paddingHorizontal: 8 }}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={24} />
          </TouchableOpacity>
        )}
        {rightIcon}
      </View>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
}