import axios from 'axios';
import { checkTokenExpiration } from '.';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export const refreshStatusUser = () => {
  localStorage.clear();
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}`;
}

export const refreshForbidden = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}`;
}

api.interceptors.response.use(
  (response) => {
    const token = localStorage.getItem('token');

    if (checkTokenExpiration(token)) {
      refreshStatusUser();
      return Promise.reject(new Error('Token expired'));
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      refreshStatusUser();
    } else if (error.response && error.response.status === 403) {
      refreshForbidden();
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
