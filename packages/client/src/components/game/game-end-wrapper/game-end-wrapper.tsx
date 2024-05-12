import './game-end-wrapper.css';
import { Button } from '@/components/button';
import { LeaderboardService } from '@/services/leaderboard';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { useEffect } from 'react';
import { Theme } from '@/helpers/constants/global';

interface GameEndWrapperProps {
  title: string;
  message: string;
  buttonText: string;
  handleClick: () => void;
  score?: string | null;
}

export const GameEndWrapper = ({
  title,
  message,
  buttonText,
  handleClick,
  score,
}: GameEndWrapperProps) => {
  const currentUser = useAppSelector(state => state.user.currentUser);
  const theme = useAppSelector(state => state.user.theme);

  useEffect(() => {
    if (!score) return;
    const service = new LeaderboardService();
    service.addUser({
      name: currentUser.first_name,
      avatar: currentUser.avatar,
      scoreCatCoders: Number(score),
    });
    return () => service.api.abortController.abort();
  }, [score]);

  return (
    <div
      className={[
        'game-end-wrapper',
        theme === Theme.Dark ? 'game-end-wrapper--dark' : null,
      ].join(' ')}>
      <h1 className='game-end-wrapper__title'>{title}</h1>
      {score && <h2>Счёт: {score}</h2>}
      <p className='game-end-wrapper__text'>{message}</p>
      <Button
        block
        darkTheme={theme !== Theme.Dark}
        label={buttonText}
        onClick={handleClick}
      />
    </div>
  );
};
