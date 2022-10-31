import React, { createContext, useContext, useState } from 'react';

import { User } from 'lib/types/user';
import FcProps from 'lib/types/fc-props';
import { RegisterFormData } from 'components/partials/register-form';

type AuthContextType = {
  login: (
    email: string,
    password: string
  ) => Promise<{ type: string; response: string | Partial<User> }>;
  logout: () => Promise<void>;
  register: (
    data: RegisterFormData
  ) => Promise<{ type: string; response: string | Partial<User> }>;
  getUser: () => User;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  login: async () => {
    return { type: 'error', response: 'No auth service available' };
  },
  logout: async () => {
    return;
  },
  register: async () => {
    return { type: 'error', response: 'No auth service available' };
  },
  getUser: () => {
    return {
      uid: '',
      email: '',
      displayName: '',
      photoUrl: ''
    } as User;
  },
  isLoggedIn: false
});

const AuthProvider: React.FC<FcProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoggedIn(true);
    return {
      type: 'success',
      response: {
        uid: '',
        email: '',
        displayName: '',
        photoUrl: ''
      } as Partial<User>
    };
  };

  const logout = async () => {
    setIsLoggedIn(false);
  };

  interface DatabaseUserData extends RegisterFormData {
    role: 'user';
    createdAt: string | undefined;
    updatedAt: string | undefined;
  }

  const register = async (data: DatabaseUserData) => {
    return {
      type: 'success',
      response: {
        uid: '',
        email: '',
        displayName: '',
        photoUrl: ''
      } as Partial<User>
    };
  };

  const getUser = () => {
    if (typeof window === 'undefined') {
      throw new Error(
        'getUser can only be called in the browser. Try calling it from a useEffect hook.'
      );
    }
    return JSON.parse(localStorage.getItem('user') || '{}');
  };

  const contextValue = {
    login,
    logout,
    register,
    getUser,
    isLoggedIn
  } as AuthContextType;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

export default useAuth;
