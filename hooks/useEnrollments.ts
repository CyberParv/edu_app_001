import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useEnrollments() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async () => {
    try {
      const response = await api.get('/user/enrollments');
      setData(response.data.enrollments);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err.message || 'Failed to load enrollments');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return { data, isLoading, error, refetch: fetchEnrollments };
}
