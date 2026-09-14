// services/api.js - one axios instance shared by the whole app
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// runs before every request: attaches the saved JWT if we have one
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ZENTRO_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
