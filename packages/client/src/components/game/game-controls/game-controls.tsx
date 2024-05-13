import React from 'react';
import './game-controls.css';
import { Theme } from '@/helpers/constants/global';

interface GameControlsProps {
  paused: boolean;
  isFullscreen: boolean;
  handlePause: () => void;
  handleRestartGame: () => void;
  handleFullscreen: () => void;
  theme: Theme;
}

export const GameControls: React.FC<GameControlsProps> = ({
  paused,
  isFullscreen,
  handlePause,
  handleRestartGame,
  handleFullscreen,
  theme = Theme.Light,
}) => {
  return (
    <div
      className={[
        'game-controls',
        theme === Theme.Dark ? 'game-controls--dark' : null,
      ].join(' ')}>
      <button
        role='pause'
        className={`game-controls__button ${
          paused ? 'game-controls__button_play' : 'game-controls__button_pause'
        }`}
        onClick={handlePause}></button>
      <button
        role='restart'
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
