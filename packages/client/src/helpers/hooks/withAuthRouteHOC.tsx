import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export function withAuthRouteHOC<T extends JSX.IntrinsicAttributes>(
  WrappedRoute: React.ComponentType<T>
) {
  const ComponentWithAuth = (props: T) => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    if (!isAuth) {
      setTimeout(() => navigate('/login'));
      return <></>;
    }
    return <WrappedRoute {...props} />;
  };

  return ComponentWithAuth;
}
