import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useProfile() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await api.get('/user/profile');
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { data, isLoading, error, refetch: fetchProfile };
}
