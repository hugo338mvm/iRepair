import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const isAuthCheck = originalRequest?.url?.includes('/auth/me');

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing && !isAuthCheck) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/auth/refresh');
        isRefreshing = false;
        return api(originalRequest); 
      } catch {
        isRefreshing = false;
        window.location.href = '/login';
      }
    }

    if (error.response?.status === 401 && !isAuthCheck) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);