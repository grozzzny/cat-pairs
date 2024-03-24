import { GameEndScreen, GameStartScreen, PageWrapper } from '@/components';
import { Difficulty, GameStatus } from '@/components/game/types';
import React, { useState } from 'react';
import './game-page.css';
import { Game } from '@/components/game/game';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const GamePage = () => {
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
              setGameStatus(GameStatus.PLAYING);
            }}
            onDifficultyChange={difficulty => setSelectedDifficulty(difficulty)}
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
        {gameStatus === GameStatus.WON && (
          <GameEndScreen
            status='WON'
            onRestartGame={() => {
              setGameStatus(GameStatus.PLAYING);
            }}
          />
        )}
        {gameStatus === GameStatus.LOST && (
          <GameEndScreen
            status='LOST'
            onRestartGame={() => {
              setGameStatus(GameStatus.PLAYING);
            }}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(GamePage);
