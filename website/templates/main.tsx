import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

// Import styles
import styles from './main.module.scss';

// Import components
import { AppHeader, AppFooter, Logo, Icons } from 'components';

// Import types
import FcProps from 'lib/types/fc-props';
import { User } from 'lib/types/user';
export interface Props extends FcProps {
  children: React.ReactNode;
  user?: User;
  redirectURL?: string;
}

const MainTemplate: NextPage<Props> = ({
  children,
  user,
  redirectURL = '/'
}: Props) => {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || '';

  const links = [
    {
      href: '/',
      label: 'Home',
      icon: <Icons.House width={'15px'} />
    },
    {
      href: '/getting-started',
      label: 'Getting Started'
    },
    {
      href: '/docs',
      label: 'Docs'
    },
    {
      href: '/pricing',
      label: 'Pricing'
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>{appName}</title>
        <meta
          name="description"
          content={`${appName} - The everything generator`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <AppHeader
        appName={appName}
        logo={<Logo />}
        user={user}
        links={links}
        redirectURL={redirectURL}
      />
      <main className={styles.main}>{children}</main>
      <AppFooter appName={appName} />
    </div>
  );
};

export default MainTemplate;
