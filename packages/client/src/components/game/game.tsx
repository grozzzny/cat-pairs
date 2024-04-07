import React, { useEffect, useRef, useState } from 'react';
import {
  ExitButton,
  GameApi,
  GameControls,
  GameField,
  GameInfo,
} from '@/components';
import { Difficulty, GameStatus } from '@/components/game/types';
import { useNavigate } from 'react-router-dom';

interface GameProps {
  theme: 'light' | 'dark';
  gameStatus: GameStatus;
  selectedDifficulty: Difficulty;
  changeGameStatus: (status: GameStatus) => void;
}

export const Game: React.FC<GameProps> = ({
  theme = 'light',
  gameStatus,
  selectedDifficulty,
  changeGameStatus,
}) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<null | GameApi>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGameReset, setIsGameReset] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      const gameApi = new GameApi(
        gameRef,
        canvasRef,
        changeGameStatus,
        gameStatus,
        selectedDifficulty
      );
      gameApi.render();
      setGame(gameApi);
    };
  }, [changeGameStatus, gameStatus, selectedDifficulty]);

  if (!game) return <div style={{ color: 'white' }}>Loading...</div>;
  const handleExitGame = () => {
    navigate('/');
  };
  return (
    <div className='game' ref={gameRef}>
      <GameInfo
        game={game}
        paused={paused}
        isResetGame={isGameReset}
        themeColor={theme === 'light' ? '#565A5D' : '#EFE5CC'}
      />
      <div className='game__wrapper'>
        <GameControls
          handlePause={() => {
            setPaused(game.handlePauseGame());
          }}
          handleRestartGame={() => {
            game.handleRestartGame();
            setIsGameReset(prevState => !prevState);
          }}
          handleFullscreen={() => {
            setIsFullscreen(game.toggleFullscreen);
          }}
          paused={paused}
          isFullscreen={isFullscreen}
        />
        <GameField game={game} canvasRef={canvasRef} />
      </div>
      <div className='game__exit-wrapper'>
        <ExitButton onClick={handleExitGame} />
      </div>
    </div>
  );
};
