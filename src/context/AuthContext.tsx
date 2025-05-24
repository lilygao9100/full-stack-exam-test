"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { useLocalStorageUsers } from '@/hook/useLocalStorageUsers';

// The AuthContextType defines what the context will provide to the rest of the app.
interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => User| null;
  logout: ()=> void;
  isAuthInitialized: boolean;
}

// Create a Context to store Auth-related information.
// Initially undefined, so we can know if it's ever used outside a valid provider.
const AuthContext = createContext<AuthContextType | undefined> (undefined);

// AuthProvider: it wraps the app and provides the authentication context.
export const AuthProvider = ({children} : {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const { users, isInitialized } = useLocalStorageUsers();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  // Initialise auth state
  useEffect(()=> {
    if (isInitialized) {
      const storedUser = localStorage.getItem("currentUser");
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setIsAuthInitialized(true);
    }
  }, [isInitialized]);

  // Function to handle user to login, to check provided email & password.
  // If found, sets the current user and stores them in localStorage.
  const login = (email: string, password: string): User| null => {
    const foundUser = users.find( (u) => 
      u.email === email && 
      u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return foundUser;
    }
    return null;
  };

  // Function to handle user logout, and remove from the localStorage.
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  if (!isAuthInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{user, users, login, logout, isAuthInitialized}}>
      {children}
    </AuthContext.Provider>
  );
};

// A custom hook so other components can easily consume AuthContext.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error ("useAuth must be used within an AuthProvider");
  }
  return context;
};
