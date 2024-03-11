import { PageWrapper } from '@/components';
import './gameover-page.css';

import { useState } from 'react';
import { GameOver } from '@/components';
import Confetti from 'react-confetti';
import { Exit } from '@/components/exit';

export const GameOverPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <PageWrapper>
      <>
        {isSuccess ? (
          <div>
            <Confetti />
            <GameOver
              title='Поздравляем!'
              message='Вы перешли на следующий уровень'
              buttonText='Продолжить игру'
            />
          </div>
        ) : (
          <GameOver
            title='Вы проиграли'
            message='Попробуйте еще раз'
            buttonText='Играть'
          />
        )}
        <Exit />
      </>
    </PageWrapper>
  );
};
