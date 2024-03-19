import { Flex } from 'antd';
import React, { ReactNode } from 'react';
import './background-wrapper.css';

interface BackgroundProps {
  title: string;
  children: ReactNode;
}

export const BackgroundWrapper: React.FC<BackgroundProps> = ({
  title,
  children,
}) => {
  return (
    <div className='background-wrapper'>
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
