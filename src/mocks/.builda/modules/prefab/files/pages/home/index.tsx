import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';
import { User } from 'lib/types/user';
import { Button, Card, Grid, TerminalDemo, Text } from 'components';

import styles from './styles.module.scss';

const terminalCommands = [
  {
    text: 'builda add component "Hello World"',
    typing: true,
    delay: 0
  },
  {
    text: '█████████████████████████████████████████████████ v4.0.1\n\n████████▄  ███    ███ ███ ███      ████████▄   ▄████████\n███    ███ ███    ███ ███ ███      ███   ▀███ ███▀   ███\n███    ███ ███    ███ ███ ███      ███    ███ ███    ███\n███▄▄▄██▀  ███    ███ ███ ███      ███    ███ ███    ███\n███▀▀▀██▄  ███    ███ ███ ███      ███    ███ ██████████\n███    ██▄ ███    ███ ███ ███      ███    ███ ███    ███\n███    ███ ███    ███ ███ ███      ███   ▄███ ███    ███\n████████▀   ▀██████▀  ███ ████████ ████████▀  ███    ███ ██████\n\nComponent generator ███████████████████████████████████████████',
    colour: '#D33682',
    delay: 2000
  },
  {
    text: "Building component 'Hello World'",
    colour: '#2589CF',
    delay: 3000
  },
  {
    text: 'Done',
    delay: 4000
  }
];

/**
 * The `Home` page is used to display the home page of the application.
 * @returns {JSX.Element}
 */
export const Home: NextPage = () => {
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
    <MainTemplate user={user}>
      <Grid columns={1}>
        <h2 className={styles['page-header']}>
          <strong>
            Build your entire application (or just parts of it) from config.
          </strong>{' '}
          A stupidly simple command line tool.
        </h2>
        <Grid rowGap="2rem">
          <TerminalDemo
            commands={terminalCommands}
            windowTitle="Builda"
            height="250px"
          />
          <Grid columns={3} colGap="2rem">
            <Card>
              <Card.Header>
                <Text use="h2" as="h1">
                  Generate something new from a Scaffold
                </Text>
              </Card.Header>
              <Card.Body>
                <Text>
                  Select a scaffold from our trade store, use one from the
                  community or create your own and you can use it to generate
                  any part of your application!
                </Text>
                <Text>
                  A scaffold can live anywhere your application has access to
                  via command line.
                </Text>
              </Card.Body>
              <Card.Footer>
                <Button fullWidth>Find out more about scaffolds</Button>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Header>
                <Text use="h2" as="h1">
                  Generate something pre-made from a Prefab
                </Text>
              </Card.Header>
              <Card.Body>
                <Text>
                  Generate a copy of a component from a component library, a set
                  of config files, or a pre-configured plugin from a Prefab.
                </Text>
                <Text>
                  Prefabs are available in our Trade Store, from the community
                  or you can make your own.
                </Text>
              </Card.Body>
              <Card.Footer>
                <Button fullWidth>Discover the power of prefabs</Button>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Header>
                <Text use="h2" as="h1">
                  Your entire application, built from config.
                </Text>
              </Card.Header>
              <Card.Body>
                <Text>
                  Everything generated via Builda is built from a config file
                  and versions are tracked using registry files, making
                  everything easily updatable with a simple command.
                </Text>
                <Text>
                  You can keep all of your application boilerplate code locked
                  away and focus on the look, feel and content of the app
                  itself.
                </Text>
              </Card.Body>
              <Card.Footer>
                <Button fullWidth>How does this work?</Button>
              </Card.Footer>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </MainTemplate>
  );
};

Home.displayName = 'Home';

export default Home;
