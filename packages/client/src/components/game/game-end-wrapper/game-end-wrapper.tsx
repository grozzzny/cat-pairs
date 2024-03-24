import './game-end-wrapper.css';
import { Button } from '@/components/button';

interface GameOverWrapperProps {
  title: string;
  message: string;
  buttonText: string;
  handleClick: () => void;
}

export const GameEndWrapper = ({
  title,
  message,
  buttonText,
  handleClick,
}: GameOverWrapperProps) => {
  return (
    <div className='game-end-wrapper'>
      <h1 className='game-end-wrapper__title'>{title}</h1>
      <p className='game-end-wrapper__text'>{message}</p>
      <Button label={buttonText} onClick={handleClick} />
    </div>
  );
};
