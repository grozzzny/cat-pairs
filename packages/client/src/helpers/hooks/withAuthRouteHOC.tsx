import { PageWrapper } from '@/components';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const authProviderStyles = {
  spinWrapper: {
    height: '100%',
  },
  spin: {
    fontSize: 40,
    color: 'blue',
  },
};

export function withAuthRouteHOC<T extends JSX.IntrinsicAttributes>(
  WrappedRoute: React.ComponentType<T>
) {
  const ComponentWithAuth = (props: T) => {
    const navigate = useNavigate();
    const { isLoading, isAuth } = useAuth();
    if (isLoading) {
      return (
        <PageWrapper withMenu={false}>
          <Flex
            vertical
            justify='center'
            align='center'
            style={authProviderStyles.spinWrapper}>
            <Spin
              indicator={
                <LoadingOutlined style={authProviderStyles.spin} spin />
              }
            />
          </Flex>
        </PageWrapper>
      );
    }
    if (!isAuth) {
      setTimeout(() => navigate('/login'));
      return <></>;
    }
    return <WrappedRoute {...props} />;
  };

  return ComponentWithAuth;
}
