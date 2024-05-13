import React, { useEffect, useState } from 'react';
import './start-timer.css';
import { GameStatus } from '@/components/game/types';
import { Theme } from '@/helpers/constants/global';
interface StartTimerProps {
  changeGameStatus: (status: GameStatus) => void;
  theme: Theme;
}
export const StartTimer: React.FC<StartTimerProps> = ({
  changeGameStatus,
  theme = Theme.Light,
}) => {
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

  return (
    <p
      className={[
        'start-timer',
        theme === Theme.Dark ? 'start-timer--dark' : null,
      ].join(' ')}>
      {time}
    </p>
  );
};
