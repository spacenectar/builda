import React, { createContext, useContext, useState } from 'react';
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useRouter } from 'next/router';

import getFirebase from 'lib/services/firebase';
import { User } from 'lib/types/user';
import FcProps from 'lib/types/fc-props';
import { RegisterFormData } from 'components/partials/register-form';

const firebase = getFirebase();

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
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getDBDetails = (uid: string) => {
    if (firebase) {
      const db = getDatabase(firebase);
      try {
        const userRef = ref(db, `users/${uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            localStorage.setItem('user', JSON.stringify(data));
            router.push('/');
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const registerDetailsToDB = (uid: string, data: RegisterFormData) => {
    if (firebase) {
      const db = getDatabase(firebase);
      try {
        const userRef = ref(db, `users/${uid}`);
        set(userRef, {
          ...data
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const login = async (email: string, password: string) => {
    if (firebase) {
      try {
        const auth = getAuth();
        if (auth) {
          const userDetails = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          if (userDetails.user) {
            getDBDetails(userDetails.user.uid);
            setIsLoggedIn(true);
          }
          return {
            type: 'success',
            response: userDetails.user as Partial<User>
          };
        }
      } catch (err) {
        const error = err as AuthError;
        let response = 'Something went wrong, please try again.';
        if (error.code === 'auth/wrong-password') {
          response = 'Incorrect password, please try again.';
        }
        if (error.code === 'auth/too-many-requests') {
          response = 'Too many requests, please try again later.';
        }
        if (error.code === 'auth/user-disabled') {
          response = 'User is disabled, please contact an administrator.';
        }
        if (error.code === 'auth/user-not-found') {
          response = 'User not found, please try again.';
        }

        return {
          type: 'error',
          response
        };
      }
    }
    return {
      type: 'error',
      response: 'Connection to database failed. Please try again later.'
    };
  };

  const logout = async () => {
    if (firebase) {
      try {
        const auth = getAuth();
        if (auth) {
          await auth.signOut();
          localStorage.removeItem('user');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  interface DatabaseUserData extends RegisterFormData {
    role: 'user';
    createdAt: string | undefined;
    updatedAt: string | undefined;
  }

  const register = async (data: DatabaseUserData) => {
    const email = data.email as string;
    const password = data.password as string;

    if (firebase) {
      try {
        const auth = getAuth();
        if (auth) {
          const userDetails = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- This is definitely not null
          const currentUser = auth.currentUser!;
          await updateProfile(currentUser, {
            displayName: data.displayName as string
          });
          if (userDetails.user) {
            const safeData = data;
            delete safeData.password;
            safeData.role = 'user';
            safeData.createdAt = currentUser.metadata.creationTime;
            safeData.updatedAt = currentUser.metadata.creationTime;

            registerDetailsToDB(userDetails.user.uid, safeData);
            return {
              type: 'success',
              response: userDetails.user as Partial<User>
            };
          }
          return {
            type: 'error',
            response: 'Something went wrong, please try again.'
          };
        }
      } catch (err) {
        const error = err as AuthError;
        let response = 'Something went wrong, please try again.';
        if (error.code === 'auth/email-already-in-use') {
          response = 'Email already in use, please try again.';
        }
        if (error.code === 'auth/invalid-email') {
          response = 'Invalid email, please try again.';
        }
        if (error.code === 'auth/weak-password') {
          response = 'Password is too weak, please try again.';
        }
        if (error.code === 'auth/too-many-requests') {
          response = 'Too many requests, please try again later.';
        }

        return {
          type: 'error',
          response
        };
      }
    }
    return {
      type: 'error',
      response: 'Connection to database failed. Please try again later.'
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
