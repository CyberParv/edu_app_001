import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}