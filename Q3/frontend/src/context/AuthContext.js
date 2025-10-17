import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('employee');

    if (token && storedUser) {
      try {
        const response = await authAPI.verifyToken();
        setUser(response.data.employee);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth verification failed:', error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (empId, password) => {
    try {
      const response = await authAPI.login({ empId, password });
      const { token, employee } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('employee', JSON.stringify(employee));
      
      setUser(employee);
      setIsAuthenticated(true);
      
      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
