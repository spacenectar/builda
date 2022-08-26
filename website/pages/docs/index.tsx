import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import MainTemplate from "templates/main";
import useAuth from "lib/context/auth-context";
import { User } from "lib/types/user";

import styles from "./styles.module.scss";

/**
 * The `Docs` page is used to display the Docs page of the application.
 * @returns {JSX.Element}
 */
export const Docs: NextPage = () => {
  const { getUser, isLoggedIn } = useAuth();
  const router = useRouter();

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
      <div className={styles["docs"]}>Your content goes here.</div>
    </MainTemplate>
  );
};

Docs.displayName = "Docs";

export default Docs;
