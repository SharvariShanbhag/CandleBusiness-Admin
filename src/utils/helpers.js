// src/utils/helpers.js
import { API_BASE_URL } from './constants';

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const setUserData = (user) => {
  localStorage.setItem('userData', JSON.stringify(user));
};

export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const removeUserData = () => {
  localStorage.removeItem('userData');
};

// Helper for constructing image URLs from backend paths
export const getImageUrl = (relativePath) => {
    // If API_BASE_URL is 'http://localhost:8000/api', we want 'http://localhost:8000'
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `<span class="math-inline">\{baseUrl\}</span>{relativePath}`;
};