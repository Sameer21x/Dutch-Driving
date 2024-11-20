import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Load the userId from localStorage when the app starts
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = (newUserId) => {
    // Save the userId to state and localStorage upon login
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
  };

  const signup = (newUserId) => {
    // Save the userId to state and localStorage upon signup
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
  };

  const logout = () => {
    // Clear the userId from state and localStorage upon logout
    setUserId(null);
    localStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ userId, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
