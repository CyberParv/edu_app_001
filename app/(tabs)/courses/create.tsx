import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, HelperText, SegmentedButtons } from 'react-native-paper';
import { router } from 'expo-router';
import { useToast } from '@/components/providers/ToastProvider';
import { api } from '@/lib/api';

export default function CourseFormScreen() {
  const { showToast } = useToast();

  const [form, setForm] = useState({ title: '', description: '', category: 'general', instructor: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.instructor.trim()) e.instructor = 'Instructor is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/courses', form);
      showToast('Created successfully');
      router.back();
    } catch (err) {
      setErrors({ form: err.message || 'Something went wrong' });
    } finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900 px-4 pt-4">
        {errors.form && (
          <View className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl mb-4">
            <Text className="text-red-600 text-center">{errors.form}</Text>
          </View>
        )}

        <TextInput label="Title" value={form.title} onChangeText={(v) => update('title', v)} mode="outlined" error={!!errors.title} className="mb-1" />
        <HelperText type="error" visible={!!errors.title}>{errors.title}</HelperText>

        <TextInput label="Description" value={form.description} onChangeText={(v) => update('description', v)} mode="outlined" multiline numberOfLines={3} error={!!errors.description} className="mb-1" />
        <HelperText type="error" visible={!!errors.description}>{errors.description}</HelperText>

        <TextInput label="Instructor" value={form.instructor} onChangeText={(v) => update('instructor', v)} mode="outlined" error={!!errors.instructor} className="mb-1" />
        <HelperText type="error" visible={!!errors.instructor}>{errors.instructor}</HelperText>

        <Text variant="labelLarge" className="mb-2 mt-2">Category</Text>
        <SegmentedButtons value={form.category} onValueChange={(v) => update('category', v)}
          buttons={[{ value: 'general', label: 'General' }, { value: 'premium', label: 'Premium' }, { value: 'featured', label: 'Featured' }]}
          className="mb-6"
        />

        <Button mode="contained" onPress={handleSubmit} loading={loading} disabled={loading} className="rounded-xl py-1 mb-8">
          Create
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
