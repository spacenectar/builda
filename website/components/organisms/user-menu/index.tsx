import React, { useState } from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Components
import { Avatar, ContextMenu } from 'components';

// Types
import { User } from 'lib/types/user';
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The User object (if logged in)
   */
  user?: User;
  /**
   * The URL to redirect to when the user clicks the login button
   */
  redirectURL?: string;
}

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

/**
 * The `UserMenu` component is used to display the logged in users avatar and a dropdown menu of their account options.
 */
export const UserMenu: React.FC<Props> = ({
  user,
  redirectURL = '/',
  ...props
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedOutLinks = [
    {
      label: 'Login',
      href: `/login?redirect=${redirectURL}`
    },
    {
      label: 'Register',
      href: '/register'
    }
  ];

  const loggedInLinks = [
    {
      href: '/manage-profile',
      label: 'Manage profile',
      icon: <ProfileIcon />
    },
    {
      href: '/logout',
      label: 'Logout',
      icon: <LogoutIcon />
    }
  ];

  return (
    <div
      className={`${styles['user-menu']} ${props.className}`}
      {...props}
      onClick={() => setMenuOpen(!menuOpen)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <Avatar
        name={user?.displayName || ''}
        imagePath={user?.photoUrl || ''}
        size="50px"
      />
      <ContextMenu
        showMenu={menuOpen}
        links={user ? loggedInLinks : loggedOutLinks}
        className={styles['menu']}
      />
    </div>
  );
};

UserMenu.displayName = 'UserMenu';

export default UserMenu;
