import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentUser } from '@/store/userSlice';
import { UserService } from '@/services/user';
import { CurrentUserRequestResult } from '@/helpers/types';
import { AuthService } from '@/services';
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
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector(state => state.user.userAuth);

  const { children } = props;
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const isAuthRef = useRef(false);

  const abortController = new AbortController();

  const stopLoading = () => setLoading(false);

  const handleAuth = () => {
    setIsAuth(true);
    stopLoading();
  };

  const handleSetUserInStore = (res: CurrentUserRequestResult) => {
    stopLoading();
    if (res.user) dispatch(setCurrentUser(res.user));
  };

  useEffect(() => {
    if (!isAuthRef.current) {
      isAuthRef.current = true;
      AuthService.getUser({ signal: abortController.signal }).then(isOk =>
        isOk ? handleAuth() : stopLoading()
      );
    }
    //переделала метод обработки запроса, что бы можно было получать данные пользователя и устанавливать в store
    /*UserService.getCurrentUser().then(res =>
      !res?.isOk ? handleNavigate() : handleSetUserInStore(res)
    );
    AuthService.getUser().then(isOk =>
      !isOk ? handleNavigate() : handleSetUsetInStore()
    );
  }, [isUserAuth]);*/
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
    </AuthContext.Provider>
  );
};
