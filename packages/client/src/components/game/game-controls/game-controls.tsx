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
      <button onClick={handlePause}>{paused ? 'Resume' : 'Pause'}</button>
      <button onClick={handleRestartGame}>Restart</button>
    </div>
  );
};
