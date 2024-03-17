import React from 'react';
import './game-controls.css';

interface GameControlsProps {
  paused: boolean;
  handlePauseGame: () => void;
  handleRestartGame: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  paused,
  handlePauseGame,
  handleRestartGame,
}) => {
  return (
    <div className='game-controls'>
      <button onClick={handlePauseGame}>{paused ? 'Resume' : 'Pause'}</button>
      <button onClick={handleRestartGame}>Restart</button>
    </div>
  );
};
