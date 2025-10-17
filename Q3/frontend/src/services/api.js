import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/employee';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('employee');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  verifyToken: () => api.get('/verify'),
  getProfile: () => api.get('/profile'),
};

// Leave API
export const leaveAPI = {
  apply: (leaveData) => api.post('/leave/apply', leaveData),
  getAll: () => api.get('/leave/list'),
};

export default api;
