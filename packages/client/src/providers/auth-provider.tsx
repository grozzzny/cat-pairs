import { AuthService } from '@/services';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Spin } from 'antd';
import { PageWrapper } from '@/components';
import { LoadingOutlined } from '@ant-design/icons';

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

  const stopLoading = () => setLoading(false);

  const handleNavigate = () => {
    navigate(authRoute);
    stopLoading();
  };

  useEffect(() => {
    if (exceptionRoutes.includes(pathname)) {
      stopLoading();
      return;
    }
    AuthService.getUser().then(isOk =>
      !isOk ? handleNavigate() : stopLoading()
    );
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
