import { Level, Timer } from '@/components';
import React from 'react';
import './game-info.css';
interface GameInfoProps {
  level: number;
  timeLeft: number;
  themeColor: string;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  level,
  timeLeft,
  themeColor,
}) => {
  return (
    <div className='game-info'>
      <Level level={level} color={themeColor} />
      <Timer time={timeLeft} color={themeColor} />
    </div>
  );
};
