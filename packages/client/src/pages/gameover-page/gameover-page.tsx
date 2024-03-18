import { PageWrapper } from '@/components';
import './gameover-page.css';

import { useState } from 'react';
import { GameOverWrapper } from '@/components';
import Confetti from 'react-confetti';
import { ExitButton } from '@/components/exit-button';

export const GameOverPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  return (
    <PageWrapper>
      <>
        {isSuccess ? (
          <div>
            <Confetti />
            <GameOverWrapper
              title='Поздравляем!'
              message='Вы перешли на следующий уровень'
              buttonText='Продолжить игру'
            />
          </div>
        ) : (
          <GameOverWrapper
            title='Вы проиграли'
            message='Попробуйте еще раз'
            buttonText='Играть'
          />
        )}
        <ExitButton />
      </>
    </PageWrapper>
  );
};
