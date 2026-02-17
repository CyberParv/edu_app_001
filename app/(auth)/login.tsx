import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/components/providers/AuthProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.includes('@')) e.email = 'Valid email required';
    if (password.length < 8) e.password = 'Minimum 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setErrors({ form: err.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView contentContainerClassName="flex-1 justify-center px-6 bg-white dark:bg-gray-900">
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
            <Ionicons name="person" size={40} color="#6366f1" />
          </View>
          <Text variant="headlineMedium" className="font-bold text-gray-900 dark:text-white">Welcome Back</Text>
          <Text variant="bodyMedium" className="text-gray-500 mt-2">Sign in to continue</Text>
        </View>

        {errors.form && (
          <View className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl mb-4">
            <Text className="text-red-600 dark:text-red-400 text-center">{errors.form}</Text>
          </View>
        )}

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
          error={!!errors.email}
          left={<TextInput.Icon icon="email" />}
          className="mb-1"
        />
        <HelperText type="error" visible={!!errors.email}>{errors.email}</HelperText>

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          mode="outlined"
          error={!!errors.password}
          left={<TextInput.Icon icon="lock" />}
          right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
          className="mb-1"
        />
        <HelperText type="error" visible={!!errors.password}>{errors.password}</HelperText>

        <Pressable onPress={() => router.push('/(auth)/forgot-password')} className="self-end mb-6">
          <Text className="text-primary font-medium">Forgot Password?</Text>
        </Pressable>

        <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading} className="rounded-xl py-1">
          Sign In
        </Button>

        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Don't have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/signup')}>
            <Text className="text-primary font-bold">Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
