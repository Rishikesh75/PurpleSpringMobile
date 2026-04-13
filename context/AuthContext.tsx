import React, { createContext, useState, useContext } from 'react';

type AuthContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
} | null;

const AuthContext = createContext<AuthContextType>(null);

import { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
