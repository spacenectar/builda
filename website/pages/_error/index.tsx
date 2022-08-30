import React from 'react';

import CenterTemplate from 'templates/center';

// Import components
import { Card, Logo } from 'components';

// Import styles
import styles from './styles.module.scss';
import Link from 'next/link';

/**
 * The `Register` page is used to register a new user to the application.
 * @returns {JSX.Element}
 */
export const Error = ({ statusCode }: { statusCode: number }): JSX.Element => {
  return (
    <CenterTemplate>
      <Card className={styles['holding-page']}>
        <Card.Header>
          <h1 className={styles['header']}>
            <Logo />
          </h1>
        </Card.Header>
        <Card.Body className={styles['body']}>
          <div className={styles['blurb']}>
            {statusCode === 404 ? (
              <>
                <h2 className={styles['subheader']}>404: Page not found</h2>
                <p>Err.... I have no idea where you were trying to go.</p>
                <p>
                  <Link href="/">
                    <a>Go back to the homepage and give it another shot.</a>
                  </Link>
                </p>
              </>
            ) : (
              <>
                <h2 className={styles['subheader']}>
                  {statusCode}:{' '}
                  <span className={styles['status-code']}>
                    {statusCode === 500 ? 'Internal Server Error' : 'Error'}
                  </span>
                </h2>
                <p>Something went wrong. Please try again later.</p>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </CenterTemplate>
  );
};

Error.displayName = 'Holding';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- 3rd party code from Next.js
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
