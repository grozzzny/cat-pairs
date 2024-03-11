import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './game-over.css';

interface GameOverProps {
  title: string;
  message: string;
  buttonText: string;
}

export const GameOver = ({ title, message, buttonText }: GameOverProps) => {
  const navigate = useNavigate();
  return (
    <div className='gameover__container'>
      <h1 className='gameover__title'>{title}</h1>
      <p className='gameover__text'>{message}</p>
      <Button
        className='gameover__button'
        type='primary'
        onClick={() => {
          navigate('/game');
        }}>
        {buttonText}
      </Button>
    </div>
  );
};
