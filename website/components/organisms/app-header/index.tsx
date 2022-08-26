import React from 'react';
import Link from 'next/link';

// Stylesheet
import styles from './styles.module.scss';

// Types
import { User } from 'lib/types/user';
import LinkObject from 'lib/types/link-object';

// Components
import { TopNavigation } from 'components';

export interface Props extends React.ComponentProps<'header'> {
  /**
   * The app Name
   */
  appName: string;
  /**
   * Logo (Must be a JSX Element)
   */
  logo?: JSX.Element;
  /**
   * The User object (if logged in)
   */
  user?: User;
  /**
   * The list of links to display
   */
  links: LinkObject[];
  /**
   * The redirectURL to redirect to if the user logs in
   */
  redirectURL?: string;
}

/**
 * The `AppHeader` component is the header section of the application. It is used to display the logo, application name, user details and primary navigation.
 */
export const AppHeader: React.FC<Props> = ({
  user,
  appName,
  links,
  // redirectURL = '/',
  logo
}: Props) => (
  <header className={`${styles['app-header']} ${user && styles['logged-in']}`}>
    <div className={styles['left-col']}>
      <h1 className={styles['title']}>
        <Link href="/">
          <div className={styles['logo']}>{logo}</div>
        </Link>
        <span className={styles['site-name']}>{appName}</span>
      </h1>
    </div>
    <div className={styles['right-col']}>
      <div />
      {/* <UserMenu user={user} redirectURL={redirectURL} /> */}
      <TopNavigation links={links} />
    </div>
  </header>
);

AppHeader.displayName = 'AppHeader';

export default AppHeader;
