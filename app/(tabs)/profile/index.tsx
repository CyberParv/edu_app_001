import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SkeletonLoader, EmptyState } from '@/components/ui';
import { useProfile } from '@/hooks/useProfile';

export default function ProfileScreen() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <SkeletonLoader type="profile" />;

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        <Card mode="elevated" className="mb-4">
          <Card.Content>
            <View className="flex-row items-center mb-4">
              <Ionicons name="person-circle" size={64} color="#2563EB" />
              <View className="ml-4">
                <Text variant="headlineSmall" className="font-bold">{profile.name}</Text>
                <Text variant="bodyMedium" className="text-gray-500">{profile.email}</Text>
              </View>
            </View>
            <Button mode="contained" onPress={() => router.push('/(tabs)/profile/edit')} className="mt-4">Edit Profile</Button>
          </Card.Content>
        </Card>

        <Card mode="elevated" className="mb-4">
          <Card.Title title="Preferences" />
          <Card.Content>
            <View className="flex-row justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <Text className="text-gray-500">Notifications</Text>
              <Ionicons name="notifications" size={24} color="#2563EB" />
            </View>
            <View className="flex-row justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <Text className="text-gray-500">Dark Mode</Text>
              <Ionicons name="moon" size={24} color="#2563EB" />
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}
