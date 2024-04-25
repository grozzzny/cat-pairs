import { notification } from 'antd';
import { UserService } from '@/services/user';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { AuthService } from '@/services';
import { redirectToUrl } from '@/helpers/redirect-helper';

type AuthContextType = {
  isAuth: boolean;
  isLoading: boolean;
  setAuth?: () => void;
  deleteAuth?: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  isLoading: true,
  setAuth: undefined,
  deleteAuth: undefined,
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

  const deleteAuth = () => {
    setIsAuth(false);
  };

  useEffect(() => {
    if (!isAuthRef.current) {
      isAuthRef.current = true;

      const handleOauth = async (code: string) => {
        try {
          setLoading(true);
          const response = await AuthService.loginOauth({ code });
          if (response?.isOk) {
            handleAuth();
            redirectToUrl('/');
          }
          stopLoading();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      };

      const fetchUser = async () => {
        try {
          const response = await UserService.getCurrentUser({
            signal: abortController.signal,
          });
          if (response?.isOk) {
            handleAuth();
            return;
          }
          //этот stopLoading отрабатывает в случае, если response не isOk
          handleNotAuth();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      };

      if (typeof window !== undefined) {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
          handleOauth(code);
          return;
        }
      }

      fetchUser();
    }
    return () => {
      !isAuthRef.current && abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (isAuth) {
      const fetchUser = async () => {
        try {
          const response = await UserService.getCurrentUser({
            signal: abortController.signal,
          });
        } catch (err) {
          // eslint-disable-next-line no-console
        }
      };
      fetchUser();
    }
    return () => {
      !isAuthRef.current && abortController.abort();
    };
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        setAuth: handleAuth,
        deleteAuth,
      }}>
      {children}
      {contextHolder}
    </AuthContext.Provider>
  );
};
