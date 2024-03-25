import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Spin } from 'antd';
import { PageWrapper } from '@/components';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/hooks';
import { setCurrentUser } from '@/store/userSlice';
import { UserService } from '@/services/user';
import { CurrentUserRequestResult } from '@/helpers/types';

interface AuthProviderProps {
  children: React.ReactNode;
  authRoute: string;
  exceptionRoutes: string[];
}

const authProviderStyles = {
  spinWrapper: {
    height: '100%',
  },
  spin: {
    fontSize: 40,
    color: 'blue',
  },
};

export const AuthProvider: React.FC<AuthProviderProps> = props => {
  const { children, authRoute, exceptionRoutes } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const stopLoading = () => setLoading(false);

  const handleNavigate = () => {
    navigate(authRoute);
    stopLoading();
  };

  const handleSetUserInStore = (res: CurrentUserRequestResult) => {
    stopLoading();
    if (res.user) dispatch(setCurrentUser(res.user));
  };

  useEffect(() => {
    if (exceptionRoutes.includes(pathname)) {
      stopLoading();
      return;
    }
    //переделала метод обработки запроса, что бы можно было получать данные пользователя и устанавливать в store
    UserService.getCurrentUser().then(res =>
      !res?.isOk ? handleNavigate() : handleSetUserInStore(res)
    );
    /*AuthService.getUser().then(isOk =>
      !isOk ? handleNavigate() : handleSetUsetInStore()
    );*/
  }, []);

  if (loading) {
    return (
      <PageWrapper withMenu={false}>
        <Flex
          vertical
          justify='center'
          align='center'
          style={authProviderStyles.spinWrapper}>
          <Spin
            indicator={
              <LoadingOutlined
                rev={null}
                style={authProviderStyles.spin}
                spin
              />
            }
          />
        </Flex>
      </PageWrapper>
    );
  }

  return <>{children}</>;
};
