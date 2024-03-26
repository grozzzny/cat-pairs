import { AuthContext } from '@/providers/auth-provider';
import { useContext } from 'react';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth not found in context');
  }
  return authContext;
};
