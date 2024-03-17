import {
  Game,
  GameControls,
  GameEndScreen,
  GameField,
  GameInfo,
  GameStartScreen,
  PageWrapper,
} from '@/components';
import { GameStatus } from '@/components/game/types';
import React, { useRef } from 'react';

const THEME = 'light';
export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = new Game(canvasRef);

  return (
    <PageWrapper>
      <div className='game-page'>
        {game.gameStatus === GameStatus.PRE_GAME && (
          <GameStartScreen
            selectedDifficulty={game.getSelectedDifficulty()}
            onStartGame={game.handleStartGame}
            onDifficultyChange={difficulty =>
              game.setSelectedDifficulty(difficulty)
            }
          />
        )}
        {game.gameStatus === GameStatus.PLAYING && (
          <div className='game'>
            <GameInfo
              level={game.getLevel()}
              timeLeft={game.getTimeLeft()}
              themeColor={THEME === 'light' ? '#565A5D' : '#EFE5CC'}
            />
            <div className='game__wrapper'>
              <GameControls
                paused={game.getPaused()}
                handlePauseGame={game.handlePauseGame}
                handleRestartGame={game.handleRestartGame}
              />
              <GameField
                cards={game.getCards()}
                cardImages={game.getCardImages()}
                cardBackImg={game.getCardBackImage()}
                onCardClick={game.handleCardClick}
              />
            </div>
            <div className='game__exit-wrapper'>
              <button onClick={game.handleExitGame}>Exit Game</button>
            </div>
          </div>
        )}
        {game.gameStatus === GameStatus.WON && (
          <GameEndScreen status='WON' onRestartGame={game.handleRestartGame} />
        )}
        {game.gameStatus === GameStatus.LOST && (
          <GameEndScreen status='LOST' onRestartGame={game.handleRestartGame} />
        )}
      </div>
    </PageWrapper>
  );
};
