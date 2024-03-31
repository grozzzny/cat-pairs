import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Difficulty, GameStatus } from '@/components/game/types';
import { Theme } from '@/helpers/constants/global';
import { Game } from '@/components/game/game';
import '@testing-library/jest-dom';
import { GameApi } from '@/components';
import { Provider } from 'react-redux';
import store from '@/store';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Тестируем игровой движок компонента Game.', () => {
  let gameFake: GameApi;

  beforeEach(() => {
    gameFake = new GameApi(
      null as unknown as React.RefObject<HTMLCanvasElement>,
      null as unknown as (status: GameStatus) => void,
      null as unknown as GameStatus,
      null as unknown as Difficulty,
      null as unknown as 'light' | 'dark'
    );

    (useState as jest.Mock).mockImplementation((init: never) => [
      init,
      jest.fn(),
    ]);
  });

  test('проверяем отображение экрана загрузки', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Game
          theme='light'
          gameStatus={GameStatus.PLAYING}
          selectedDifficulty={Difficulty.EASY}
          changeGameStatus={jest.fn()}
        />
      </Provider>
    );

    const gameElement = getByText('Loading...');
    expect(gameElement).toBeInTheDocument();
  });

  it('проверяем кнопку Restart', () => {
    const handleRestartGame = jest.fn();
    gameFake.handleRestartGame = handleRestartGame;

    (useState as jest.Mock).mockImplementationOnce(() => [gameFake, jest.fn()]);

    const { getByRole } = render(
      <Provider store={store}>
        <Game
          theme={Theme.Light}
          gameStatus={GameStatus.PLAYING}
          selectedDifficulty={Difficulty.EASY}
          changeGameStatus={jest.fn()}
        />
      </Provider>
    );

    const restartButton = getByRole('restart');
    fireEvent.click(restartButton);

    expect(handleRestartGame).toHaveBeenCalledTimes(1);
  });

  it('проверяем нажатие кнопки Pause', () => {
    (useState as jest.Mock).mockImplementationOnce(() => [gameFake, jest.fn()]);

    const setPaused = jest.fn();
    (useState as jest.Mock).mockImplementationOnce(() => [false, setPaused]);

    const { getByRole } = render(
      <Provider store={store}>
        <Game
          theme={Theme.Light}
          gameStatus={GameStatus.PLAYING}
          selectedDifficulty={Difficulty.EASY}
          changeGameStatus={jest.fn()}
        />
      </Provider>
    );

    const pauseButton = getByRole('pause');
    fireEvent.click(pauseButton);

    expect(setPaused).toHaveBeenCalledTimes(1);
  });

  it('проверяем нажатие кнопки Exit', () => {
    const handleExitGame = jest.fn();
    gameFake.handleExitGame = handleExitGame;

    (useState as jest.Mock).mockImplementationOnce(() => [gameFake, jest.fn()]);

    const { getByRole } = render(
      <Provider store={store}>
        <Game
          theme={Theme.Light}
          gameStatus={GameStatus.PLAYING}
          selectedDifficulty={Difficulty.EASY}
          changeGameStatus={jest.fn()}
        />
      </Provider>
    );

    const exitButton = getByRole('exit');
    fireEvent.click(exitButton);
    expect(handleExitGame).toHaveBeenCalledTimes(1);
  });
});
