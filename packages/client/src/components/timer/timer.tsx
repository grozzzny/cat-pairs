import React from 'react';
import { Typography } from 'antd';
import './timer.css';

interface TimerProps {
  time: number;
  color?: string;
}

export const Timer: React.FC<TimerProps> = ({ time, color }) => {
  const textColor: string = time <= 20 ? 'red' : `${color}`;
  const formatTime = `${String(Math.floor(time / 60)).padStart(
    2,
    '0'
  )}:${String(time % 60).padStart(2, '0')}`;
  return (
    <Typography
      className='timer'
      style={{
        color: textColor,
      }}>
      {formatTime}
    </Typography>
  );
};
