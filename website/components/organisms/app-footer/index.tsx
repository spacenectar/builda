import React from 'react';

// Stylesheet
import styles from './styles.module.scss';

// Types
import LinkObject from 'lib/types/link-object';
export interface Props extends React.ComponentProps<'header'> {
  /**
   * The app Name
   */
  appName: string;
  /**
   * Left links
   */
  leftLinks?: LinkObject[];
  /**
   * Right links
   */
  rightLinks?: LinkObject[];
}

/**
 * The `AppFooter` component is the footer section of the application. It is used to display the copywrite information and useful links.
 */
export const AppFooter: React.FC<Props> = ({ appName }: Props) => (
  <footer className={styles['app-footer']}>
    <div className={styles['left-col']}>
      <p>
        Copyright © {new Date().getFullYear()} {appName}
      </p>
    </div>
    <div className={styles['right-col']}>
      <nav>links will go here.</nav>
    </div>
  </footer>
);

AppFooter.displayName = 'AppFooter';

export default AppFooter;
