import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { GamePage } from '@/pages';
import '@testing-library/jest-dom';

describe('Тестируем страницу GamePage в обход Auth Route HOC.', () => {
  test('проверяем рендер основного состояния страницы GameStartScreen с выбором уровня сложности', async () => {
    const { getByText } = render(<GamePage />);
    const chooseDifficultyElement = getByText(/Выберите уровень сложности/i);
    expect(chooseDifficultyElement).toBeInTheDocument();
  });

  test('проверяем отображение экрана начала игры после нажатия на кнопку "Start Game" на странице', async () => {
    const { getByText, container } = render(<GamePage />);
    const startGameButton = getByText('Начать игру');
    fireEvent.click(startGameButton);

    await waitFor(() => {
      const loader = container.querySelector('.game-loader');
      expect(loader).toBeInTheDocument();
    });
  });
});
