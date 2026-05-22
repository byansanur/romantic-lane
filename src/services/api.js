import axios from 'axios';
import { auth } from './firebase';
import router from '../router';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request Interceptor: Inject JWT Token
apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      
      switch (status) {
        case 401:
          console.warn("401 Unauthorized - Redirecting to login");
          router.push({ name: 'LandingPage' });
          break;
          
        case 403:
        case 402:
          window.dispatchEvent(new CustomEvent('show-paywall-modal'));
          break;
          
        case 429:
          console.warn("429 Too Many Requests - Cooldown active");
          window.dispatchEvent(new CustomEvent('trigger-cooldown', { detail: { retryAfter: 60 } }));
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
