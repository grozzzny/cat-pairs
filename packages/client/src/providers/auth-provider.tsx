import { AuthService } from '@/services';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuth: false,
  isLoading: true,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = props => {
  const { children } = props;
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const stopLoading = () => setLoading(false);

  const handleAuth = () => {
    setIsAuth(true);
    stopLoading();
  };

  useEffect(() => {
    AuthService.getUser().then(isOk => (isOk ? handleAuth() : stopLoading()));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
