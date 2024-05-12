import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { GamePage, LoginPage } from '@/pages';
import '@testing-library/jest-dom';
import store from '@/store';
import { Provider } from 'react-redux';

describe('Тестируем страницу GamePage в обход Auth Route HOC.', () => {
  test('проверяем рендер основного состояния страницы GameStartScreen с выбором уровня сложности', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );
    const chooseDifficultyElement = getByText(/Выберите уровень сложности/i);
    expect(chooseDifficultyElement).toBeInTheDocument();
  });

  test('проверяем отображение экрана начала игры после нажатия на кнопку "Start Game" на странице', async () => {
    const { getByText, container } = render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );
    const startGameButton = getByText('Играть!');
    fireEvent.click(startGameButton);

    await waitFor(() => {
      const loader = container.querySelector('.game-loader');
      expect(loader).toBeInTheDocument();
    });
  });
});
