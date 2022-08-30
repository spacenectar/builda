import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuth } from 'lib/context/auth-context';

import CenterTemplate from 'templates/center';
import { User } from 'lib/types/user';
import Link from 'next/link';

// Import components
import { RegisterForm, Logo, Card } from 'components';

// Import styles
import styles from './styles.module.scss';

// Import types
import { RegisterFormData } from 'components/partials/register-form';

/**
 * The `Register` page is used to register a new user to the application.
 * @returns {JSX.Element}
 */
export const Register: NextPage = () => {
  const { getUser, isLoggedIn, register } = useAuth();
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [registered, setRegistered] = useState<boolean>(false);

  const handleSubmit = (data: RegisterFormData) => {
    const doRegister = register(data);
    setError(undefined);
    if (doRegister) {
      doRegister.then((res) => {
        if (res.type === 'error') {
          setError(res.response as string);
        }
        if (res.type === 'success') {
          console.log(res.response);
          const { displayName } = res.response as Partial<User>;
          setUserName(displayName);
          setRegistered(true);
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

  const AlreadyRegisteredCard = () => (
    <Card>
      <Card.Header>
        <h2 className={styles['card-header']}>
          {' '}
          🤦‍♂️ You are already registered!
        </h2>
      </Card.Header>
      <Card.Body className={styles['card-body']}>
        <p>
          <Link href="/">
            <a>Click here to return to the home page</a>
          </Link>
          .
        </p>
      </Card.Body>
    </Card>
  );

  const SuccessCard = () => (
    <Card>
      <Card.Header>
        <h2 className={styles['card-header']}>
          {' '}
          🎉 Welcome, {userName}, you are registered!
        </h2>
      </Card.Header>
      <Card.Body className={styles['card-body']}>
        <p>
          <Link href="/login">
            <a>Click here to login</a>
          </Link>
          .
        </p>
      </Card.Body>
    </Card>
  );

  if (user?.email) {
    return (
      <CenterTemplate>
        <AlreadyRegisteredCard />
      </CenterTemplate>
    );
  }

  return (
    <CenterTemplate>
      {registered ? (
        <SuccessCard />
      ) : (
        <RegisterForm
          appName={process.env.NEXT_PUBLIC_APP_NAME || ''}
          logo={<Logo />}
          onRegister={handleSubmit}
          registerError={error}
        />
      )}
    </CenterTemplate>
  );
};

export default Register;
