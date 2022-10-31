import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import FcProps from 'lib/types/fc-props';

import styles from './center.module.scss';

const CenterTemplate: NextPage<FcProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta
          name="description"
          content={`${process.env.NEXT_PUBLIC_APP_NAME} - The everything generator`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default CenterTemplate;
