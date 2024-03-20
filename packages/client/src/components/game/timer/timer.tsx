import React from 'react';
import { Typography } from 'antd';
import './timer.css';
import { getFormatTime } from '@/utils/game-helpers';

interface TimerProps {
  time: number;
  color?: string;
}

export const Timer: React.FC<TimerProps> = ({ time, color = 'black' }) => {
  const textColor: string = time <= 20 ? 'red' : color;
  const formatTime = getFormatTime(time);
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
