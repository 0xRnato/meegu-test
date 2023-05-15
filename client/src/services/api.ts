import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  if (config.method === 'delete') {
    config.headers['access-token'] = 'meegu';
  }
  return config;
});

export default api;
