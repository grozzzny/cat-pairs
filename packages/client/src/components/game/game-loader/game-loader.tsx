import './game-loader.css';
import { Loader, StartTimer } from '@/components';
import { GameStatus } from '@/components/game/types';
import React from 'react';
import { Theme } from '@/helpers/constants/global';
interface GameLoaderProps {
  changeGameStatus: (status: GameStatus) => void;
  theme: Theme;
}
export const GameLoader: React.FC<GameLoaderProps> = ({
  changeGameStatus,
  theme = Theme.Light,
}) => {
  return (
    <>
      <div
        className={[
          'game-loader',
          theme === Theme.Dark ? 'game-loader--dark' : null,
        ].join(' ')}>
        <StartTimer theme={theme} changeGameStatus={changeGameStatus} />
        <Loader />
      </div>
    </>
  );
};
