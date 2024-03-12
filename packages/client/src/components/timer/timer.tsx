import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './timer.css';

export const Timer = () => {
  const [time, setTime] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => setTime(time - 1), 1500);
    } else navigate('/game');
  }, [time]);

  return (
    <>
      <p className='timer__count'>{time}</p>
    </>
  );
};
