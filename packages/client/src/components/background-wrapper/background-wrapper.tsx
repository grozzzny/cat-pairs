import { Flex } from 'antd';
import React, { ReactNode } from 'react';
import './background-wrapper.css';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';

interface BackgroundProps {
  title: string;
  children: ReactNode;
}

export const BackgroundWrapper: React.FC<BackgroundProps> = ({
  title,
  children,
}) => {
  const theme = useAppSelector(state => state.user.theme);
  return (
    <div
      className={[
        'background-wrapper',
        theme === Theme.Dark ? 'background-wrapper--dark' : null,
      ].join(' ')}>
      <Flex
        className='background-wrapper__container'
        vertical
        justify='space-between'
        align='center'>
        <Flex className='background-wrapper__header' justify='center'>
          <h1 className='background-wrapper__title'>{title}</h1>
        </Flex>
        <div className='background-wrapper__footer'>{children}</div>
      </Flex>
    </div>
  );
};
