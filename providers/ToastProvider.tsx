import { ReactNode } from 'react';
import { ToastAndroid, Platform } from 'react-native';

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const showToast = (message: string, duration: 'short' | 'long' = 'short') => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, duration === 'short' ? ToastAndroid.SHORT : ToastAndroid.LONG);
    } else {
      // Implement iOS toast
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const ToastContext = createContext<{ showToast: (message: string, duration?: 'short' | 'long') => void } | null>(null);

export const useToast = () => useContext(ToastContext)!;