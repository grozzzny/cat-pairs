import React from 'react';
import { Typography } from 'antd';

interface LevelProps {
  level: number | string;
  color?: string;
}

export const Level: React.FC<LevelProps> = ({ level, color }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: color,
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          width: '91px',
          height: '91px',
          borderRadius: '50%',
          border: '2px solid',
          fontSize: '36px',
          fontWeight: 'bold',
        }}>
        {level}
      </div>
      <Typography
        style={{
          fontSize: '24px',
          lineHeight: '24px',
          fontWeight: 'bold',
          color: 'inherit',
        }}>
        уровень
      </Typography>
    </div>
  );
};
