import { Flex } from 'antd';
import React, { ReactNode } from 'react';
import './auth-wrapper.css';

interface AuthWrapperProps {
  label: string;
  children: ReactNode;
  darkTheme?: boolean;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  label,
  children,
  darkTheme = false,
}) => {
  const authClassName = [
    'auth-wrapper',
    darkTheme ? 'auth-wrapper--dark' : null,
  ].join(' ');
  return (
    <Flex justify='center' className={authClassName}>
      <Flex className='auth-wrapper__container'>
        <Flex
          vertical
          className='auth-wrapper__content'
          justify='space-between'>
          <h1 className='auth-wrapper__title'>{label}</h1>
          <div className='auth-wrapper__body'>{children}</div>
        </Flex>
      </Flex>
    </Flex>
  );
};
