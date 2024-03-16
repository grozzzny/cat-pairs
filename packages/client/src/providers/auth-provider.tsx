import { AuthService } from '@/services/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: React.ReactNode;
  authRoute: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = props => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getUser().then(isOk => (!isOk ? navigate('/login') : null));
  }, []);

  return <>{props.children}</>;
};
