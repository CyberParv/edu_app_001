import { ReactNode, useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { getSecureItem, setSecureItem } from '@/lib/secureStorage';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(systemColorScheme || 'light');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getSecureItem('theme');
      if (storedTheme) {
        setColorScheme(storedTheme);
      } else {
        setColorScheme(systemColorScheme || 'light');
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newTheme);
    await setSecureItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeContext = createContext<{ colorScheme: 'light' | 'dark'; toggleTheme: () => void } | null>(null);

export const useTheme = () => useContext(ThemeContext)!;