import './game-end-wrapper.css';
import { Button } from '@/components/button';

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
  return (
    <div className='game-end-wrapper'>
      <h1 className='game-end-wrapper__title'>{title}</h1>
      {score && <h2>Счёт: {score}</h2>}
      <p className='game-end-wrapper__text'>{message}</p>
      <Button label={buttonText} onClick={handleClick} />
    </div>
  );
};
