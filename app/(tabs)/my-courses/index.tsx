import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, Pressable } from 'react-native';
import { Text, Card, ProgressBar, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SkeletonLoader, EmptyState } from '@/components/ui';
import { useEnrollments } from '@/hooks/useEnrollments';

export default function EnrollmentsScreen() {
  const { data: enrollments, isLoading, refetch, isRefetching } = useEnrollments();

  const renderItem = useCallback(({ item }) => (
    <Pressable onPress={() => router.push(`/(tabs)/my-courses/${item.courseId}`)} className="mb-3">
      <Card mode="elevated">
        <Card.Content className="pt-3">
          <Text variant="titleMedium" className="font-bold">{item.courseTitle}</Text>
          <ProgressBar progress={item.progress / 100} className="mt-2" />
          <Text variant="bodySmall" className="text-gray-500 mt-1">{item.progress}% completed</Text>
        </Card.Content>
      </Card>
    </Pressable>
  ), []);

  if (isLoading) return <SkeletonLoader type="card" count={4} />;

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FlatList
        data={enrollments}
        renderItem={renderItem}
        keyExtractor={(item) => item.courseId?.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ListEmptyComponent={<EmptyState title="No enrollments yet" subtitle="Enroll in a course to start learning" icon="book-outline" />}
      />
      <FAB icon="plus" className="absolute bottom-6 right-6" onPress={() => router.push('/(tabs)/courses')} />
    </View>
  );
}
