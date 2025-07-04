import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = 'https://api.io1.devhoo.me'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('autenticado');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error?.response?.data || error.message || error.response.statusText || 'An error occurred');
  }
);

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('autenticado', 'true');
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('autenticado');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => {
    return localStorage.getItem('access_token') !== null;
  },
};

export const userService = {
  getUsers: async (skip = 0, limit = 100) => {
    const response = await api.get(`/users?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  getUsersCount: async () => {
    const response = await api.get('/users/count');
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
};

export const optimizationService = {
  generateOptimalAssignment: async (data) => {
    const response = await api.post('/optimizar/', data);
    return response.data;
  },
  createOptimization: async (optimizationData) => {
    const response = await api.post('/optimizations', optimizationData);
    return response.data;
  },
  getOptimizations: async (skip = 0, limit = 100) => {
    const response = await api.get(`/optimizations?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  getOptimizationById: async (optimizationId) => {
    const response = await api.get(`/optimizations/${optimizationId}`);
    return response.data;
  },
  updateOptimization: async (optimizationId, optimizationData) => {
    const response = await api.put(`/optimizations/${optimizationId}`, optimizationData);
    return response.data;
  },
  executeOptimization: async (optimizationId) => {
    const response = await api.post(`/optimizations/${optimizationId}/execute`);
    return response.data;
  },
  deleteOptimization: async (optimizationId) => {
    const response = await api.delete(`/optimizations/${optimizationId}`);
    return response.data;
  },
};

export default api;
