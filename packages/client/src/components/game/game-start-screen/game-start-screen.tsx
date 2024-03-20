import { Difficulty } from '@/components/game/types';
import React from 'react';

interface GameStartScreenProps {
  selectedDifficulty: Difficulty;
  onStartGame: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export const GameStartScreen: React.FC<GameStartScreenProps> = ({
  selectedDifficulty,
  onStartGame,
  onDifficultyChange,
}) => {
  return (
    <div>
      <h2>Choose Difficulty:</h2>
      <select
        value={selectedDifficulty}
        onChange={e => onDifficultyChange(e.target.value as Difficulty)}>
        <option value={Difficulty.EASY}>Easy</option>
        <option value={Difficulty.HARD}>Hard</option>
      </select>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};
