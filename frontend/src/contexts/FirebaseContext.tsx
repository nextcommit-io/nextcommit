'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { auth, db, storage, analytics } from '../lib/firebase';

interface FirebaseContextType {
  auth: typeof auth;
  db: typeof db;
  storage: typeof storage;
  analytics: typeof analytics;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const firebaseValue: FirebaseContextType = {
    auth,
    db,
    storage,
    analytics,
  };

  return (
    <FirebaseContext.Provider value={firebaseValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
