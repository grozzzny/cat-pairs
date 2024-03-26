import './game-loader.css';
import { Loader, StartTimer } from '@/components';
import { GameStatus } from '@/components/game/types';
import React from 'react';
interface GameLoaderProps {
  changeGameStatus: (status: GameStatus) => void;
}
export const GameLoader: React.FC<GameLoaderProps> = ({ changeGameStatus }) => {
  return (
    <>
      <div className='game-loader'>
        <StartTimer changeGameStatus={changeGameStatus} />
        <Loader />
      </div>
    </>
  );
};
