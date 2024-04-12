import { GameEndWrapper } from '@/components';
import Confetti from 'react-confetti';
import { ExitButton } from '@/components/exit-button';
import React from 'react';
import { GameStatus } from '@/components/game/types';
import { useNavigate } from 'react-router-dom';

interface GameEndScreenProps {
  status: GameStatus;
  onRestartGame: () => void;
}
export const GameEndScreen: React.FC<GameEndScreenProps> = ({
  status,
  onRestartGame,
}) => {
  const navigate = useNavigate();
  const handleExitGame = () => {
    navigate('/');
  };
  return (
    <>
      {status === GameStatus.WON && (
        <div>
          <Confetti />
          <GameEndWrapper
            title='Поздравляем!'
            message='Вы перешли на следующий уровень'
            buttonText='Продолжить игру'
            handleClick={onRestartGame}
            score={localStorage.getItem('memory_game_score')}
          />
        </div>
      )}
      {status === GameStatus.LOST && (
        <GameEndWrapper
          title='Вы проиграли'
          message='Попробуйте еще раз'
          buttonText='Играть'
          handleClick={onRestartGame}
        />
      )}
      <ExitButton onClick={handleExitGame} />
    </>
  );
};
