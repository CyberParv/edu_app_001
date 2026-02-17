import React, { useState } from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { Text, Card, Button, Chip, Divider, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { SkeletonLoader, ConfirmDialog } from '@/components/ui';
import { useToast } from '@/components/providers/ToastProvider';
import { useCourse } from '@/hooks/useCourse';
import { api } from '@/lib/api';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: course, isLoading } = useCourse(id);
  const { showToast } = useToast();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/courses/${id}`);
      showToast('Deleted successfully');
      router.back();
    } catch { showToast('Delete failed', 'error'); }
    finally { setDeleting(false); setDeleteVisible(false); }
  };

  if (isLoading || !course) return <SkeletonLoader type="detail" />;

  return (
    <>
      <Stack.Screen options={{
        headerRight: () => (
          <View className="flex-row">
            <IconButton icon="pencil" onPress={() => router.push(`/(tabs)/courses/edit/${id}`)} />
            <IconButton icon="delete" onPress={() => setDeleteVisible(true)} />
          </View>
        ),
      }} />
      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
        {course.image && <Image source={{ uri: course.image }} className="w-full h-64" resizeMode="cover" />}

        <View className="p-4 -mt-6">
          <Card mode="elevated" className="mb-4">
            <Card.Content>
              <Text variant="headlineSmall" className="font-bold">{course.title}</Text>
              <Text variant="bodyMedium" className="text-gray-500 mt-2">{course.description}</Text>
              <View className="flex-row flex-wrap gap-2 mt-3">
                <Chip icon="tag">{course.category}</Chip>
                <Chip icon="clock">{course.createdAt}</Chip>
              </View>
            </Card.Content>
          </Card>

          <Card mode="elevated" className="mb-4">
            <Card.Title title="Details" />
            <Card.Content>
              <View className="flex-row justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <Text className="text-gray-500">Instructor</Text>
                <Text className="font-medium text-gray-900 dark:text-white">{course.instructor}</Text>
              </View>
            </Card.Content>
          </Card>

          <View className="flex-row gap-3 mb-8">
            <Button mode="contained" icon="pencil" onPress={() => router.push(`/(tabs)/courses/edit/${id}`)} className="flex-1">Edit</Button>
            <Button mode="outlined" icon="delete" textColor="red" onPress={() => setDeleteVisible(true)} className="flex-1">Delete</Button>
          </View>
        </View>
      </ScrollView>
      <ConfirmDialog visible={deleteVisible} title="Delete?" message="This cannot be undone." onConfirm={handleDelete} onDismiss={() => setDeleteVisible(false)} loading={deleting} />
    </>
  );
}
