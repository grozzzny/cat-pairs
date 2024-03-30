import React from 'react';
import './game-controls.css';

interface GameControlsProps {
  paused: boolean;
  isFullscreen: boolean;
  handlePause: () => void;
  handleRestartGame: () => void;
  handleFullscreen: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  paused,
  isFullscreen,
  handlePause,
  handleRestartGame,
  handleFullscreen,
}) => {
  return (
    <div className='game-controls'>
      <button
        className={`game-controls__button ${
          paused ? 'game-controls__button_play' : 'game-controls__button_pause'
        }`}
        onClick={handlePause}></button>
      <button
        className='game-controls__button game-controls__button_restart'
        onClick={handleRestartGame}></button>
      <button
        className={`game-controls__button ${
          isFullscreen
            ? 'game-controls__button_exit-fullscreen'
            : 'game-controls__button_request-fullscreen'
        }`}
        onClick={handleFullscreen}></button>
    </div>
  );
};
