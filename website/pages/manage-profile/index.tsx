import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';
import { User } from 'lib/types/user';

import styles from './styles.module.scss';

/**
 * The `ManageProfile` page is used to display the Manage profile page of the application.
 * @returns {JSX.Element}
 */
export const ManageProfile: NextPage = () => {
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
      {!user?.email ? (
        <div>
          <h2>Er... and you are?</h2>
          <p>You seem to have forgotten to login.</p>
          <p>Wanna try that again, but logged in this time?</p>
          <p>
            <a href={`/login?redirect=${router.asPath}`}>Login</a>
          </p>
        </div>
      ) : (
        <div className={styles['manage-profile']}>
          Managing profile for {user?.displayName}
        </div>
      )}
    </MainTemplate>
  );
};

ManageProfile.displayName = 'ManageProfile';

export default ManageProfile;
