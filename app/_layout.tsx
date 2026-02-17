import '../global.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/providers/AuthProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as Linking from 'expo-linking';

SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const onReady = async () => {
      // Load fonts, auth, etc.
      await SplashScreen.hideAsync();
    };
    onReady();

    if (Platform.OS !== 'web') {
      const subscription = Linking.addEventListener('url', ({ url }) => {
        // Handle deep link
      });
      return () => subscription.remove();
    }
  }, []);

  const Wrapper = Platform.OS === 'web' ? View : GestureHandlerRootView;

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <ToastProvider>
            <ThemeProvider>
              <Wrapper style={{ flex: 1 }}>{children}</Wrapper>
            </ThemeProvider>
          </ToastProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}