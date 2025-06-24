// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { setAuthToken, getAuthToken, removeAuthToken, setUserData, getUserData, removeUserData } from '../utils/helpers';
import { loginUser as apiLoginUser, getUserInfo } from '../api/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthTokenState] = useState(getAuthToken());
  const [user, setUserState] = useState(getUserData());
  const [loading, setLoading] = useState(true); // Added loading state for auth check

  useEffect(() => {
    const loadUser = async () => {
      if (authToken) {
        try {
          const response = await getUserInfo();
          setUserState(response.data.user);
          setUserData(response.data.user);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          logout(); // Log out if token is invalid or expired
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await apiLoginUser({ email, password });
      const { token, user: userData } = response.data;
      setAuthTokenState(token);
      setAuthToken(token);
      setUserState(userData);
      setUserData(userData);
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const logout = () => {
    setAuthTokenState(null);
    setUserState(null);
    removeAuthToken();
    removeUserData();
    toast('Logged out.', { icon: '👋' });
  };

  // If you need to update user profile in context after update API call
  const updateCurrentUser = (updatedUser) => {
    setUserState(updatedUser);
    setUserData(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, updateCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);