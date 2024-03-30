import { GameApi, Level, Timer } from '@/components';
import React, { useEffect, useState } from 'react';
import './game-info.css';

interface GameInfoProps {
  game: GameApi;
  paused: boolean;
  isResetGame: boolean;
  themeColor: string;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  game,
  paused,
  isResetGame,
  themeColor,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(game.getTimeLeft());

  useEffect(() => {
    setTimeLeft(game.getTimeLeft());
  }, [isResetGame]);

  useEffect(() => {
    if (!paused && timeLeft <= 0) {
      game.handleGameOver();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!paused) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
        game.setRemainingTime(timeLeft);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, paused]);

  return (
    <div className='game-info'>
      <Level level={game.level} color={themeColor} />
      <Timer time={timeLeft} color={themeColor} />
    </div>
  );
};
