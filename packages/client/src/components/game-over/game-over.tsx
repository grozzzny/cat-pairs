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
    <div className='gameOverContainer'>
      <h1 className='gameOverTitle'>{title}</h1>
      <p className='gameOverText'>{message}</p>
      <Button
        className='continueGameButton'
        type='primary'
        onClick={() => {
          navigate('/game');
        }}>
        {buttonText}
      </Button>
    </div>
  );
};
