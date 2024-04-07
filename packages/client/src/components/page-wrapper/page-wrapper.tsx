import { theme as antdTheme } from 'antd';
import React from 'react';
import { NavigationBar } from '@/components';
import './page-wrapper.css';
import { useNavigate } from 'react-router-dom';

export interface PageWrapperProps {
  children: JSX.Element | string;
  withMenu?: boolean;
}

export const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  const { children, withMenu = true } = props;
  const { token: theme } = antdTheme.useToken();
  const navigate = useNavigate();
  return (
    <div className='page-wrapper' style={{ background: theme.colorPrimary }}>
      <img
        src='/public/cat-background.png'
        alt='cat-background'
        className='page-wrapper__cat-background'
        onClick={() => navigate('/')}
      />
      <div className='page-wrapper__content'>{children}</div>
      {withMenu && <NavigationBar className='page-wrapper__navigation-bar' />}
    </div>
  );
};
