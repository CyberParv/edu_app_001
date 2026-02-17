import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/components/providers/AuthProvider';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.length < 2) e.name = 'Name must be at least 2 characters';
    if (!email.includes('@')) e.email = 'Valid email required';
    if (password.length < 8) e.password = 'Minimum 8 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await signup(email, password, name);
      router.replace('/(tabs)');
    } catch (err: any) {
      setErrors({ form: err.message || 'Signup failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView contentContainerClassName="flex-1 justify-center px-6 bg-white dark:bg-gray-900">
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
            <Ionicons name="person-add" size={40} color="#6366f1" />
          </View>
          <Text variant="headlineMedium" className="font-bold text-gray-900 dark:text-white">Create Account</Text>
          <Text variant="bodyMedium" className="text-gray-500 mt-2">Sign up to get started</Text>
        </View>

        {errors.form && (
          <View className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl mb-4">
            <Text className="text-red-600 dark:text-red-400 text-center">{errors.form}</Text>
          </View>
        )}

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          error={!!errors.name}
          left={<TextInput.Icon icon="account" />}
          className="mb-1"
        />
        <HelperText type="error" visible={!!errors.name}>{errors.name}</HelperText>

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

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          mode="outlined"
          error={!!errors.confirmPassword}
          left={<TextInput.Icon icon="lock" />}
          className="mb-1"
        />
        <HelperText type="error" visible={!!errors.confirmPassword}>{errors.confirmPassword}</HelperText>

        <Button mode="contained" onPress={handleSignup} loading={loading} disabled={loading} className="rounded-xl py-1">
          Sign Up
        </Button>

        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Already have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/login')}>
            <Text className="text-primary font-bold">Log In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
