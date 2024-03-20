import React from 'react';

interface GameEndScreenProps {
  status: string;
  onRestartGame: () => void;
}

export const GameEndScreen: React.FC<GameEndScreenProps> = ({
  status,
  onRestartGame,
}) => {
  return (
    <div>
      <h2>{status === 'WON' ? 'Congratulations! You won!' : 'Game Over!'}</h2>
      <button onClick={onRestartGame}>
        {status === 'WON' ? 'Continue' : 'Play Again'}
      </button>
    </div>
  );
};
