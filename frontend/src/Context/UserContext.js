
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
   
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    console.log(userData);
    
   
    const { id } = userData;
    const {email}=userData;
    console.log(email);
    

 
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userId', id);
    localStorage.setItem('email', email);
  };

  const logout = () => {
    setUser(null);

  
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  };



  return (
    <UserContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};
