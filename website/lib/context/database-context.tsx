import React, { useContext, createContext } from 'react';

import FcProps from 'lib/types/fc-props';

const DatabaseContext = createContext<unknown>(null);

const DatabaseProvider: React.FC<FcProps> = ({ children }) => {
  const nothing = 'nothing';

  const contextValue = {
    nothing
  };

  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};

const useDatabase = () => {
  const db = useContext(DatabaseContext);
  if (!db) {
    throw new Error('Database is not initialized');
  }
  return db;
};

export { DatabaseProvider, useDatabase };

export default useDatabase;
