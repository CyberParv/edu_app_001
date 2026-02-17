import axios from 'axios';
import { mockApi } from '../utils/test-utils';

describe('API', () => {
  const apiMock = mockApi();

  beforeEach(() => {
    apiMock.reset();
  });

  it('adds auth header when token exists', async () => {
    localStorage.setItem('token', 'test-token');
    apiMock.onGet('/protected').reply(200);
    await axios.get('/protected');
    expect(apiMock.history.get[0].headers.Authorization).toBe('Bearer test-token');
  });

  it('does not add auth header when no token', async () => {
    localStorage.removeItem('token');
    apiMock.onGet('/public').reply(200);
    await axios.get('/public');
    expect(apiMock.history.get[0].headers.Authorization).toBeUndefined();
  });

  it('handles network timeout', async () => {
    apiMock.onGet('/timeout').timeout();
    try {
      await axios.get('/timeout');
    } catch (error) {
      expect(error.code).toBe('ECONNABORTED');
    }
  });

  it('retries on network failure', async () => {
    apiMock.onGet('/retry').networkErrorOnce();
    apiMock.onGet('/retry').reply(200, { success: true });
    const response = await axios.get('/retry');
    expect(response.data.success).toBe(true);
  });
});