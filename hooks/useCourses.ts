import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useCourses() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await api.get('/courses');
      setData(response.data.courses);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err.message || 'Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { data, isLoading, error, refetch: fetchCourses };
}
