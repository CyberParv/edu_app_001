import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SkeletonLoader, EmptyState } from '@/components/ui';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function DashboardScreen() {
  const { stats, recentItems, isLoading, refetch, isRefetching } = useDashboardData();

  if (isLoading) return <SkeletonLoader type="dashboard" />;

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900"
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>

      <View className="flex-row px-4 pt-4 gap-3">
        {(stats || []).map((stat, i) => (
          <Card key={i} mode="elevated" className="flex-1">
            <Card.Content className="items-center py-4">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mb-2">
                <Ionicons name={stat.icon} size={20} color="#6366f1" />
              </View>
              <Text variant="headlineSmall" className="font-bold">{stat.value}</Text>
              <Text variant="bodySmall" className="text-gray-500">{stat.label}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View className="px-4 mt-6">
        <Text variant="titleMedium" className="font-bold mb-3">Quick Actions</Text>
        <View className="flex-row gap-3">
          <Button mode="contained" icon="plus" onPress={() => router.push('/(tabs)/courses/create')} className="flex-1">Create New</Button>
          <Button mode="outlined" icon="magnify" onPress={() => router.push('/(tabs)/search')} className="flex-1">Search</Button>
        </View>
      </View>

      <View className="px-4 mt-6 mb-8">
        <View className="flex-row justify-between items-center mb-3">
          <Text variant="titleMedium" className="font-bold">Recent</Text>
          <Pressable onPress={() => router.push('/(tabs)/courses')}>
            <Text className="text-primary font-medium">View All</Text>
          </Pressable>
        </View>
        {(recentItems || []).map((item) => (
          <Pressable key={item.id} onPress={() => router.push(`/(tabs)/courses/${item.id}`)} className="mb-2">
            <Card mode="elevated">
              <Card.Title title={item.name} subtitle={item.subtitle}
                left={(props) => <Avatar.Icon {...props} icon="folder" size={40} />}
                right={(props) => <Ionicons name="chevron-forward" size={20} color="#9CA3AF" style={{ marginRight: 16 }} />}
              />
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
