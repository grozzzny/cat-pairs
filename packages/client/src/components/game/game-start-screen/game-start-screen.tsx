import { Button, ConfigProvider, Select } from 'antd';
import { Color } from '@/helpers/constants/global';
import { Difficulty } from '@/components/game/types';
import React from 'react';
import './game-start-screen.css';

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
    <div className='game-start-screen'>
      <h2>Выберите уровень сложности:</h2>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: Color.Dark,
            colorBorder: Color.Dark,
            colorText: Color.Dark,
          },
          components: {
            Select: {
              selectorBg: 'transparent',
              optionSelectedBg: Color.Light,
            },
          },
        }}>
        <Select
          className='game-start-screen__select'
          defaultValue={selectedDifficulty}
          options={[
            { value: Difficulty.EASY, label: <span>Лёгкий</span> },
            { value: Difficulty.HARD, label: <span>Хардкор</span> },
          ]}
          onChange={onDifficultyChange}
        />
      </ConfigProvider>
      <Button
        type='primary'
        size='large'
        className='game-start-screen__button'
        onClick={onStartGame}>
        Начать игру
      </Button>
    </div>
  );
};
