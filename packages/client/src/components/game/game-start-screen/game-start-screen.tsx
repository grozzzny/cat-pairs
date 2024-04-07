import { Button, ConfigProvider, Select } from 'antd';
import { Color } from '@/helpers/constants/global';
import { Difficulty } from '@/components/game/types';
import React, { useEffect, useState } from 'react';
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
  const [level, setLevel] = useState(1);
  const [isShowContinueGame, setIsShowContinueGame] = useState(true);
  useEffect(() => {
    const storedLevel = localStorage.getItem('memory_game_level');
    if (storedLevel) {
      setLevel(parseInt(storedLevel));
      level !== 1 ? setIsShowContinueGame(false) : setIsShowContinueGame(true);
    } else {
      localStorage.setItem('memory_game_level', '1');
    }
  }, [level]);

  const handleResetGame = () => {
    setLevel(1);
    localStorage.setItem('memory_game_level', '1');
  };
  const handleContinueGame = () => {
    setIsShowContinueGame(true);
  };
  return (
    <div className='game-start-screen'>
      {level !== 1 && !isShowContinueGame && (
        <Button
          type='primary'
          size='large'
          className='game-start-screen__button'
          onClick={handleContinueGame}>
          Продолжить игру на уровне {level}
        </Button>
      )}
      {isShowContinueGame && (
        <>
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
            Играть!
          </Button>
        </>
      )}

      {level !== 1 && (
        <Button
          type='primary'
          size='large'
          className='game-start-screen__button'
          onClick={handleResetGame}>
          Начать заново
        </Button>
      )}
    </div>
  );
};
