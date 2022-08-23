import React, { useEffect, useState } from 'react';

import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';

/* Import Types */
import { User } from 'lib/types/user';
interface Props extends React.ComponentProps<'div'> {
  /**
   * The component text
   */
  text: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';



/**
 * The Dashboard Page - this is where a logged in user can manage everything in their account
 */
export const Dashboard: React.FC<Props> = ({
  text = 'No text provided',
  className,
  ...props
}: Props) => {
  const auth = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check if a user is logged in
    setUser(auth?.getUser());
  }, [auth]);

  return (
    <MainTemplate user={user}>
      <div className={`${styles['dashboard']} ${className}`} {...props}>
        <h1>Dashboard</h1>
      </div>
    </MainTemplate>
  );
};

export default Dashboard;
export type { Props };
