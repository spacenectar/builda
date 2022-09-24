import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from 'lib/context/auth-context';
import Router from 'next/router';

export const Logout: NextPage = () => {
  const auth = useAuth();

  useEffect(() => {
    auth
      ?.logout()
      .then(() => {
        Router.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth?.logout]);

  return null;
};

export default Logout;
