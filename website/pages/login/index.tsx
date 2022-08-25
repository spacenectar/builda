import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from 'lib/context/auth-context';
import { useRouter } from 'next/router';

import CenterTemplate from 'templates/center';
import { User } from 'lib/types/user';
import Link from 'next/link';
import { Authentication, Card, Logo } from 'components';

/**
 * The `Login` page is used to Login to the application.
 * @returns {JSX.Element}
 */
export const Login: NextPage = () => {
  const { getUser, isLoggedIn, login } = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [redirectUrl, setRedirectUrl] = useState<string>('/');
  const router = useRouter();

  const handleSubmit = (data: { email: string; password: string }) => {
    const doLogin = login(data.email, data.password);
    if (doLogin) {
      doLogin.then((res) => {
        if (res.type === 'error') {
          setError(res.response as string);
        } else {
          // TODO: Redirect isn't working properly, it looks like it starts to do the redirect and then returns to the home page
          router.push(redirectUrl);
        }
      });
    }
  };

  useEffect(() => {
    // Check if a user is logged in
    if (isLoggedIn) {
      setUser(getUser());
    } else {
      setUser(undefined);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (router.query.redirect) {
      setRedirectUrl(router.query.redirect as string);
    } else {
      setRedirectUrl('/');
    }
  }, [router.query.redirect]);

  return (
    <CenterTemplate>
      {user?.email ? (
        <Card>
          <Card.Header>
            <h2>🤦‍♂️ You are already logged in!</h2>
          </Card.Header>
          <Card.Body>
            <p>
              <Link href="/">
                <a>Click here to return to the home page</a>
              </Link>
              .
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Authentication
          logo={<Logo />}
          onLogin={handleSubmit}
          loginError={error}
        />
      )}
    </CenterTemplate>
  );
};

export default Login;
