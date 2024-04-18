import { GameEndWrapper } from '@/components';
import Confetti from 'react-confetti';
import { ExitButton } from '@/components/exit-button';
import React, { useEffect } from 'react';
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

  const playVictorySound = () => {
    const audio = document.getElementById('victorySound') as HTMLAudioElement;
    audio.play();
  };

  const playDefeatSound = () => {
    const audio = document.getElementById('defeatSound') as HTMLAudioElement;
    audio.play();
  };

  useEffect(() => {
    if (status === GameStatus.WON) {
      playVictorySound();
    }
    if (status === GameStatus.LOST) {
      playDefeatSound();
    }
  }, [status]);
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
          <audio src='/media/win.mp3' id='victorySound'></audio>
        </div>
      )}
      {status === GameStatus.LOST && (
        <>
          <GameEndWrapper
            title='Вы проиграли'
            message='Попробуйте еще раз'
            buttonText='Играть'
            handleClick={onRestartGame}
          />
          <audio src='/media/lost.mp3' id='defeatSound'></audio>
        </>
      )}
      <ExitButton onClick={handleExitGame} />
    </>
  );
};
