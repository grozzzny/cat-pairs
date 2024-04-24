import './game-end-wrapper.css';
import { Button } from '@/components/button';
import { LeaderboardService } from '@/services/leaderboard';
import { SCORE_CAT_CODERS, YANDEX_API_HOST } from '@/helpers/constants/api';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { useEffect } from 'react';

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
  const userName = useAppSelector(state => state.user.currentUser.first_name);
  const userAvatar = useAppSelector(state => state.user.currentUser.avatar);

  useEffect(() => {
    if (score) {
      LeaderboardService.addUser({
        data: {
          name: userName,
          avatar: userAvatar ? `${YANDEX_API_HOST}/resources${userAvatar}` : '',
          scoreCatCoders: Number(score),
        },
        ratingFieldName: SCORE_CAT_CODERS,
      });
    }
  }, [score]);

  return (
    <div className='game-end-wrapper'>
      <h1 className='game-end-wrapper__title'>{title}</h1>
      {score && <h2>Счёт: {score}</h2>}
      <p className='game-end-wrapper__text'>{message}</p>
      <Button label={buttonText} onClick={handleClick} />
    </div>
  );
};
