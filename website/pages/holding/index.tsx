import React, { useState } from 'react';
import type { NextPage } from 'next';

import CenterTemplate from 'templates/center';

// Import components
import { Button, Card, Logo } from 'components';

// Import styles
import styles from './styles.module.scss';

/**
 * The `Register` page is used to register a new user to the application.
 * @returns {JSX.Element}
 */
export const Holding: NextPage = () => {
  const [formPosted, setFormPosted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [formName, setFormName] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { name, email } = e.currentTarget.elements;
    if (name.value && email.value) {
      setFormPosted(true);
      setFormName(name.value);
    } else {
      setFormError('Please fill out all fields');
    }
  };

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
            <h2 className={styles['subheader']}>
              We&apos;re still getting things ready
            </h2>
            <p>
              The website isn&apos;t quite ready yet. This domain is currently
              only used to host Builda assets.
            </p>
            <p>Check back later though, there is a lot more to come!</p>
            <p>
              If you want to be notified when this site goes live. Add your name
              and email to our mailing list, <br /> we will use this list to
              send you exactly one email and then we will purge the list.
            </p>
            <hr />
            <br />
            <p>
              If you are looking for the builda app, you can find it on NPM:{' '}
              <a href="https://npmjs.com/package/builda">Builda on NPM</a>
            </p>
          </div>
          <div className={styles['form']}>
            {formPosted ? (
              <div className={styles['postback']}>
                <h2 className={styles['subheader']}>
                  Thank you for your interest,
                  <br /> {formName}!
                </h2>
                <p>
                  We&apos;ll let you know when <br /> the site is active
                </p>
              </div>
            ) : (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <form netlify="true" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" required />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <Button
                  type="submit"
                  label="Register your interest"
                  className={styles['button']}
                />
                {formError && <p className={styles['error']}>{formError}</p>}
              </form>
            )}
          </div>
        </Card.Body>
      </Card>
    </CenterTemplate>
  );
};

Holding.displayName = 'Holding';

export default Holding;
