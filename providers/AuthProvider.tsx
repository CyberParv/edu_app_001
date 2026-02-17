import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { getSecureItem, setSecureItem, removeSecureItem } from '@/lib/secureStorage';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await getSecureItem('accessToken');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          if (err?.response?.data?.error?.code === 'AUTH_TOKEN_EXPIRED') {
            // Handle token refresh logic
          }
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data.user);
    setIsAuthenticated(true);
    await setSecureItem('accessToken', res.data.tokens.access);
    await setSecureItem('refreshToken', res.data.tokens.refresh);
  };

  const signup = async (email: string, password: string, name: string) => {
    const res = await api.post('/auth/signup', { email, password, name });
    setUser(res.data.user);
    setIsAuthenticated(true);
    await setSecureItem('accessToken', res.data.tokens.access);
    await setSecureItem('refreshToken', res.data.tokens.refresh);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    setIsAuthenticated(false);
    await removeSecureItem('accessToken');
    await removeSecureItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;