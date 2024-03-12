import React from 'react';
import { Typography } from 'antd';
import './level.css';

interface LevelProps {
  level: number | string;
  color?: string;
}

export const Level: React.FC<LevelProps> = ({ level, color }) => {
  return (
    <div
      className='level'
      style={{
        color: color,
      }}>
      <div className='level__wrapper'>{level}</div>
      <Typography className='level__text'>уровень</Typography>
    </div>
  );
};
