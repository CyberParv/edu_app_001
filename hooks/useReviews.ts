import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useReviews(courseId: string) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get(`/courses/${courseId}/reviews`);
      setData(response.data.reviews);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err.message || 'Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { data, isLoading, error, refetch: fetchReviews };
}
