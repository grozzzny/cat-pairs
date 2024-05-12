import { ConfigProvider, Select } from 'antd';
import { Color, Theme } from '@/helpers/constants/global';
import { Difficulty } from '@/components/game/types';
import React, { useEffect, useState } from 'react';
import './game-start-screen.css';
import { Button } from '@/components';

interface GameStartScreenProps {
  selectedDifficulty: Difficulty;
  theme: Theme;
  onStartGame: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export const GameStartScreen: React.FC<GameStartScreenProps> = ({
  selectedDifficulty,
  theme = Theme.Light,
  onStartGame,
  onDifficultyChange,
}) => {
  const [level, setLevel] = useState(1);
  const [isShowContinueGame, setIsShowContinueGame] = useState(true);
  useEffect(() => {
    const storedLevel = localStorage.getItem('memory_game_level');
    if (storedLevel) {
      setLevel(parseInt(storedLevel));
      setIsShowContinueGame(level === 1);
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
          size='large'
          block
          darkTheme={theme !== Theme.Dark}
          onClick={handleContinueGame}
          label={`Продолжить игру на уровне ${level}`}
        />
      )}
      {isShowContinueGame && (
        <>
          <h2>Выберите уровень сложности:</h2>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: theme == Theme.Light ? Color.Dark : Color.Light,
                colorBorder: theme === Theme.Light ? Color.Dark : Color.Light,
                colorText: theme === Theme.Light ? Color.Dark : Color.Light,
              },
              components: {
                Select: {
                  selectorBg:
                    theme === Theme.Light ? 'transparent' : Color.Dark,
                  optionSelectedBg:
                    theme === Theme.Light ? Color.Light : Color.Dark,
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
            size='large'
            block
            darkTheme={theme !== Theme.Dark}
            onClick={onStartGame}
            label={'Играть!'}
          />
        </>
      )}

      {level !== 1 && (
        <Button
          size='large'
          block
          darkTheme={theme !== Theme.Dark}
          onClick={handleResetGame}
          label={'Начать заново'}
        />
      )}
    </div>
  );
};
