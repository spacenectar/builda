import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import MainTemplate from 'templates/main';
import useAuth from 'lib/context/auth-context';
import { User } from 'lib/types/user';
import { Card, Grid } from 'components';

const Home: NextPage = () => {
  const auth = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check if a user is logged in
    setUser(auth?.getUser());
  }, [auth]);

  return (
    <MainTemplate user={user}>
      <Grid columns={1}>
        <h2>Welcome to Builda</h2>
        <p>
        <strong>Build your entire application or just parts of it from config.</strong>            A stupidly simple command line tool.
        </p>
      </Grid>
      <Grid columns={3}>
        <Card>
          <Card.Header>
            <h3>Generate something new from a Scaffold</h3>
          </Card.Header>
          <Card.Body>
            <p>Select a scaffold from our trade store, use one from the community or create your own and you can use it to generate any part of your application!</p>
            <p>A scaffold can live anywhere your application has access to via command line.</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h3>Generate something pre-made from a Prefab</h3>
          </Card.Header>
          <Card.Body>
            <p>Generate a copy of a component from a component library, a set of config files, or a pre-configured plugin from a Prefab.</p>
            <p>Prefabs are available in our Trade Store, from the community or you can make your own.</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h3>Your entire application, built from config.</h3>
          </Card.Header>
          <Card.Body>
          <p>Everything generated via Builda is built from a config file and versions are tracked using registry files, making everything easily updatable with a simple command.</p>
          <p>You can keep all of your application boilerplate code locked away and focus on the look, feel and content of the app itself.</p>
          </Card.Body>
        </Card>
      </Grid>
    </MainTemplate>
  );
};

export default Home;
