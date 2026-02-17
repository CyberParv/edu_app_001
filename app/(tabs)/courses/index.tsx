import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, Pressable } from 'react-native';
import { Text, Searchbar, Card, Chip, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SkeletonLoader, EmptyState } from '@/components/ui';
import { useCoursesCatalog } from '@/hooks/useCoursesCatalog';

export default function CourseCatalogScreen() {
  const [search, setSearch] = useState('');
  const { data: courses, isLoading, refetch, isRefetching } = useCoursesCatalog({ search });

  const filtered = (courses || []).filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = useCallback(({ item }) => (
    <Pressable onPress={() => router.push(`/(tabs)/courses/${item.id}`)} className="mb-3">
      <Card mode="elevated">
        <Card.Content className="pt-3">
          <Text variant="titleMedium" className="font-bold">{item.title}</Text>
          <Text variant="bodySmall" className="text-gray-500 mt-1">{item.description}</Text>
          <View className="flex-row items-center justify-between mt-2">
            <Chip compact icon="tag">{item.category}</Chip>
            <Text variant="labelLarge" className="text-primary font-bold">{item.instructor}</Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  ), []);

  if (isLoading) return <SkeletonLoader type="card" count={4} />;

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Searchbar placeholder="Search..." value={search} onChangeText={setSearch} className="mx-4 mt-4 mb-2" />
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ListEmptyComponent={<EmptyState title="No courses available" subtitle="Try a different search" icon="search-outline" />}
      />
      <FAB icon="plus" className="absolute bottom-6 right-6" onPress={() => router.push('/(tabs)/courses/create')} />
    </View>
  );
}
