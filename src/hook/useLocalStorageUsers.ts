"use client";
import { useEffect, useState } from "react";
import {User, DEFAULT_USERS} from '../types/user';

// key used to store and retrieve users from localStorage
const STORAGE_KEY = 'users';

// custom hook to manage users with persistence in localStorage
export const useLocalStorageUsers = () => {
  // state for storing user data
  const [users, setUsers] = useState<User[]>([]);
  // state to indicate if initialisation from localStorage has completed
  const [isInitialized, setIsInitialized] = useState(false);

  // initialise users from localStorage
  useEffect(()=> {
    const intializeUsers = () => {
      try {
        // retrieve users from localStorage
        const storedUsers = localStorage.getItem(STORAGE_KEY);

        if (storedUsers) {
          // parse users if stored data exists, otherwise use default users
          const parsedUsers = JSON.parse(storedUsers);
          setUsers(Array.isArray(parsedUsers) ? parsedUsers : DEFAULT_USERS);
        } else {
          // if no stored users, initialise localStorage with default users
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
          setUsers(DEFAULT_USERS);
        }
      } catch (error) {
        // handle JSON parsing errors or other exceptions
        console.error("Error initialising users:" , error);
        setUsers(DEFAULT_USERS);
      } finally {
        // indicate initialisation is complete
        setIsInitialized(true);
      }
    };
    intializeUsers();
  },[]);

  // sync changes to users state with localStorage
  useEffect( () => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  },[users, isInitialized]);

  // return hook interface including users, setters, and utility functions
  return {
    users,
    setUsers,
    isInitialized,
    // add new user, automatically assigning a unique ID
    addUsers: (newUser: Omit<User, 'id'>) => {
      const userWithId: User = {
        ...newUser,
        id: Math.max(...users.map(u=> u.id), 0) + 1
      };
      setUsers(prev => [
        ...prev,
        userWithId
      ]);
    },
    // remove user by id
    deleteUser: (userId: number) => {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }

  };

};