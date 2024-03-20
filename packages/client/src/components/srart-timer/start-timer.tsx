import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './start-timer.css';

export const StartTimer = () => {
  const [time, setTime] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (time > 0) {
      const id = setTimeout(() => setTime(time - 1), 1500);
      return () => {
        clearTimeout(id);
      };
    } else navigate('/game');
  }, [time]);

  return <p className='start-timer'>{time}</p>;
};
