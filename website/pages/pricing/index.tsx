import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';
import { User } from 'lib/types/user';

import styles from './styles.module.scss';

/**
 * The `Pricing` page is used to display the Pricing page of the application.
 * @returns {JSX.Element}
 */
export const Pricing: NextPage = () => {
  const { getUser, isLoggedIn } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check if a user is logged in
    if (isLoggedIn) {
      setUser(getUser());
    } else {
      setUser(undefined);
    }
  }, [isLoggedIn]);

  return (
    <MainTemplate user={user} redirectURL={router.pathname}>
      <div className={styles['pricing']}>Pricing page.</div>
    </MainTemplate>
  );
};

Pricing.displayName = 'Pricing';

export default Pricing;
