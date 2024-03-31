import React from 'react';
import './game-controls.css';

interface GameControlsProps {
  paused: boolean;
  handlePause: () => void;
  handleRestartGame: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  paused,
  handlePause,
  handleRestartGame,
}) => {
  return (
    <div className='game-controls'>
      <button role='pause' onClick={handlePause}>
        {paused ? 'Resume' : 'Pause'}
      </button>
      <button role='restart' onClick={handleRestartGame}>
        Restart
      </button>
    </div>
  );
};
