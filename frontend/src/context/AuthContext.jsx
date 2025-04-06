// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for authentication
const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // You can check authentication status here, e.g., from localStorage or an API
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
