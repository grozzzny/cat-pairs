import React from 'react';
import { Typography } from 'antd';

interface TimerProps {
  time: number;
  color?: string;
}

export const Timer: React.FC<TimerProps> = ({ time, color }) => {
  const textColor: string = time <= 20 ? 'red' : `${color}`; // Устанавливаем красный цвет, если остается 20 секунд или меньше
  const formatTime = `${String(Math.floor(time / 60)).padStart(
    2,
    '0'
  )}:${String(time % 60).padStart(2, '0')}`;
  return (
    <Typography
      style={{
        fontSize: '32px',
        lineHeight: '32px',
        fontWeight: 'bold',
        color: textColor,
      }}>
      {formatTime}
    </Typography>
  );
};
