import './game-end-screen.css';
import { GameEndWrapper } from '@/components';
import Confetti from 'react-confetti';
import { ExitButton } from '@/components/exit-button';
import React from 'react';

interface GameEndScreenProps {
  status: 'WON' | 'LOST';
  onRestartGame: () => void;
}
export const GameEndScreen: React.FC<GameEndScreenProps> = ({
  status,
  onRestartGame,
}) => {
  return (
    <>
      {status === 'WON' ? (
        <div>
          <Confetti style={{ outline: '1px solid red' }} />
          <GameEndWrapper
            title='Поздравляем!'
            message='Вы перешли на следующий уровень'
            buttonText='Продолжить игру'
            handleClick={onRestartGame}
          />
        </div>
      ) : (
        <GameEndWrapper
          title='Вы проиграли'
          message='Попробуйте еще раз'
          buttonText='Играть'
          handleClick={onRestartGame}
        />
      )}
      <ExitButton onClick={onRestartGame} />
    </>
  );
};
