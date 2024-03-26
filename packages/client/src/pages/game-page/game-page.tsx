import {
  GameEndScreen,
  GameLoader,
  GameStartScreen,
  PageWrapper,
} from '@/components';
import { Difficulty, GameStatus } from '@/components/game/types';
import React, { useState } from 'react';
import './game-page.css';
import { Game } from '@/components/game/game';

export const GamePage = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PRE_GAME);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    Difficulty.EASY
  );
  return (
    <PageWrapper>
      <div className='game-page'>
        {gameStatus === GameStatus.PRE_GAME && (
          <GameStartScreen
            selectedDifficulty={selectedDifficulty}
            onStartGame={() => {
              setGameStatus(GameStatus.LOAD);
            }}
            onDifficultyChange={difficulty => setSelectedDifficulty(difficulty)}
          />
        )}
        {gameStatus === GameStatus.LOAD && (
          <GameLoader
            changeGameStatus={status => {
              setGameStatus(status);
            }}
          />
        )}
        {gameStatus === GameStatus.PLAYING && (
          <Game
            changeGameStatus={status => {
              setGameStatus(status);
            }}
            gameStatus={gameStatus}
            selectedDifficulty={selectedDifficulty}
            theme='light'
          />
        )}
        {(gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST) && (
          <GameEndScreen
            status={gameStatus}
            onRestartGame={() => {
              setGameStatus(GameStatus.LOAD);
            }}
          />
        )}
      </div>
    </PageWrapper>
  );
};
