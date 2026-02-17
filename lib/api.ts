import axios from 'axios';
import { getSecureItem } from './secureStorage';

export const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  const token = await getSecureItem('accessToken');
  if (token && !['/auth/login', '/auth/signup'].includes(config.url!)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401 && error.response.data?.error?.code === 'AUTH_TOKEN_EXPIRED') {
      // Handle token refresh logic
    }
    return Promise.reject(error);
  }
);

export default api;