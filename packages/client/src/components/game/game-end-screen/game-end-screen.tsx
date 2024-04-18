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
  const VICTORY_SOUND_ID = 'victorySound';
  const DEFEAT_SOUND_ID = 'defeatSound';
  const handleExitGame = () => {
    navigate('/');
  };

  const playSound = (soundId: string) => {
    const muted = localStorage.getItem('muted') === 'true';
    const volume = parseFloat(localStorage.getItem('volume') || '0.5');
    if (!muted) {
      const audio = document.getElementById(soundId) as HTMLAudioElement;
      audio.volume = volume;
      audio.play();
    }
  };

  useEffect(() => {
    if (status === GameStatus.WON) {
      playSound(VICTORY_SOUND_ID);
    }
    if (status === GameStatus.LOST) {
      playSound(DEFEAT_SOUND_ID);
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
          <audio src='/media/win.mp3' id={VICTORY_SOUND_ID}></audio>
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
          <audio src='/media/lost.mp3' id={DEFEAT_SOUND_ID}></audio>
        </>
      )}
      <ExitButton onClick={handleExitGame} />
    </>
  );
};
