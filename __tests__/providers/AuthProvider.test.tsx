import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { mockApi } from '../utils/test-utils';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthProvider', () => {
  const apiMock = mockApi();

  beforeEach(() => {
    apiMock.reset();
  });

  it('provides isAuthenticated=false when no token', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('provides isAuthenticated=true when valid token exists', async () => {
    apiMock.onGet('/auth/validate').reply(200);
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('login stores token and updates state', async () => {
    apiMock.onPost('/auth/login').reply(200, { token: 'valid-token' });
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login('user', 'pass');
    });
    await waitForNextUpdate();
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('logout clears token and updates state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('signup creates account and stores token', async () => {
    apiMock.onPost('/auth/signup').reply(200, { token: 'new-token' });
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.signup('newuser', 'newpass');
    });
    await waitForNextUpdate();
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('handles token refresh on 401', async () => {
    apiMock.onGet('/auth/validate').reply(401);
    apiMock.onPost('/auth/refresh').reply(200, { token: 'refreshed-token' });
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    await waitForNextUpdate();
    expect(result.current.isAuthenticated).toBe(true);
  });
});