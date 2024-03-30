import { AuthService } from '@/services';
import { notification } from 'antd';
import React, { createContext, useEffect, useRef, useState } from 'react';

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
  const isAuthRef = useRef(false);
  const [notify, contextHolder] = notification.useNotification();

  const abortController = new AbortController();

  const stopLoading = () => setLoading(false);

  const handleAuth = () => {
    setIsAuth(true);
    stopLoading();
  };

  const handleNotAuth = () => {
    stopLoading();
    notify.error({
      message: 'Ошибка авторизации',
      description: 'Время авторизации истекло, пожалуйста, войдите еще раз',
      className: 'notification-bar',
    });
  };

  useEffect(() => {
    if (!isAuthRef.current) {
      isAuthRef.current = true;
      AuthService.getUser({ signal: abortController.signal }).then(isOk =>
        isOk ? handleAuth() : handleNotAuth()
      );
    }
    return () => {
      !isAuthRef.current && abortController.abort();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        setAuth: handleAuth,
      }}>
      {children}
      {contextHolder}
    </AuthContext.Provider>
  );
};
