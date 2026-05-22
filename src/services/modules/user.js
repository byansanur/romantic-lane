import apiClient from '../api';

export const syncUser = async () => {
  // Since the token is automatically injected by the request interceptor,
  // we just need to hit the endpoint. The backend will extract user info from the token.
  const response = await apiClient.post('/users/sync');
  return response.data;
};
