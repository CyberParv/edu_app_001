import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthProvider } from '@/providers/AuthProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export function renderWithProviders(ui, { overrideAuth } = {}) {
  return render(
    <AuthProvider overrideAuth={overrideAuth}>
      <ToastProvider>
        <SafeAreaProvider>
          {ui}
        </SafeAreaProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export function mockApi() {
  const mock = new MockAdapter(axios);
  return mock;
}

export function createMockUser(overrides = {}) {
  return {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    ...overrides
  };
}

export function createMockEntity(overrides = {}) {
  return {
    id: 1,
    name: 'Test Entity',
    ...overrides
  };
}