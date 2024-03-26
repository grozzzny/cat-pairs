import React, { useEffect, useState } from 'react';
import './start-timer.css';
import { GameStatus } from '@/components/game/types';
interface StartTimerProps {
  changeGameStatus: (status: GameStatus) => void;
}
export const StartTimer: React.FC<StartTimerProps> = ({ changeGameStatus }) => {
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (time > 0) {
      const id = setTimeout(() => setTime(time - 1), 1500);
      return () => {
        clearTimeout(id);
      };
    } else {
      changeGameStatus(GameStatus.PLAYING);
    }
  }, [time, changeGameStatus]);

  return <p className='start-timer'>{time}</p>;
};
