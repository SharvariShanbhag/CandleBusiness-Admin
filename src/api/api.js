// src/api/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getAuthToken, removeAuthToken } from '../utils/helpers';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle expired tokens or other auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      toast.error('Session expired. Please log in again.');
      removeAuthToken(); // Clear invalid token
      // Optionally, redirect to login page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// --- User API Calls ---
export const registerUser = (userData) => api.post('/user/register', userData);
export const loginUser = (credentials) => api.post('/user/login', credentials);
export const getUserInfo = () => api.get('/user/getUserInfo');
export const getAllUsers = () => api.get('/user/all'); // Admin only
export const updateProfile = (userData) => api.put('/user/update-profile', userData);
export const deleteUser = (userId) => api.delete(`/user/delete/${userId}`); // Admin only

// --- Category API Calls ---
export const createCategory = (formData) => api.post('/category/create', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }, // Important for file uploads
});
// Ensure this getAllCategories uses the 'api' instance defined above
export const getAllCategories = () => api.get('/category/getAllCategories');
export const getCategoryById = (categoryId) => api.get(`/category/getCategoryByID/${categoryId}`);
export const updateCategory = (categoryId, formData) => api.put(`/category/updateCategory/${categoryId}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }, // Important for file uploads
});
export const deleteCategory = (categoryId) => api.delete(`/category/deleteCategory/${categoryId}`);

// --- Product API Calls ---
export const createProduct = (formData) => api.post('/product/create', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }, // Important for file uploads
});
// Ensure this getAllProducts uses the 'api' instance defined above
export const getAllProducts = () => api.get('/product/getAllProducts');
export const getProductById = (productId) => api.get(`/product/getProductById/${productId}`);
export const updateProduct = (productId, formData) => api.put('/product/updateProduct/${productId}', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }, // Important for file uploads
});
export const deleteProduct = (productId) => api.delete(`/product/deleteProduct/${productId}`);
export const getProductsByCategory = (categoryId) => api.get(`/product/getproductByCategory/${categoryId}`);
export const searchProductsByQuery = (keyword) => api.get(`/product/getProductsByQuery?keyword=${keyword}`);

export default api;