import { AuthService } from '@/services';
import React, { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuth: boolean;
  isLoading: boolean;
  setAuth?: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  isLoading: true,
  setAuth: undefined,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = props => {
  const { children } = props;
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const abortController = new AbortController();

  const stopLoading = () => setLoading(false);

  const handleAuth = () => {
    setIsAuth(true);
    stopLoading();
  };

  useEffect(() => {
    AuthService.getUser({ signal: abortController.signal }).then(isOk =>
      isOk ? handleAuth() : stopLoading()
    );
    // TODO: вернуть при вливании в prod, сейчас в StrictMode происходит mount -> unmount -> mount
    // return () => {
    //   abortController.abort();
    // };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        setAuth: handleAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
