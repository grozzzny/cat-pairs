import { theme as antdTheme } from 'antd';
import React from 'react';
import { NavigationBar } from '..';
import './page-wrapper.css';

interface PageWrapperProps {
  children: JSX.Element | string;
  withMenu?: boolean;
}

export const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  const { children, withMenu = true } = props;
  const { token: theme } = antdTheme.useToken();
  return (
    <div className='page-wrapper' style={{ background: theme.colorPrimary }}>
      <img
        src='src/assets/cat-background.png'
        alt='cat-background'
        className='page-wrapper__cat-background'
      />
      <div className='page-wrapper__content'>{children}</div>
      {withMenu && <NavigationBar className='page-wrapper__navigation-bar' />}
    </div>
  );
};
