import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';
import { User } from 'lib/types/user';

import styles from './styles.module.scss';

/**
 * The `TradeStore` page is used to display the Trade store page of the application.
 * @returns {JSX.Element}
 */
export const TradeStore: NextPage = () => {
  const router = useRouter();
  const { getUser, isLoggedIn } = useAuth();

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
      <div className={styles['trade-store']}>The trade store.</div>
    </MainTemplate>
  );
};

TradeStore.displayName = 'TradeStore';

export default TradeStore;
