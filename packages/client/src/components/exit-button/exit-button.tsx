import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './exit-button.css';
import { Color } from '@/helpers/constants/global';
import React from 'react';

interface ExitButtonProps {
  onClick?: () => void;
}
export const ExitButton: React.FC<ExitButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    onClick?.();
    navigate('/');
  };
  return (
    <div className='exit-button' onClick={handleClick}>
      <button className='exit-button__button'>
        <p className='exit-button__button-text'>выход из игры</p>
        <LogoutOutlined
          style={{ fontSize: '150%', color: Color.Dark }}
          rev={undefined}
        />
      </button>
    </div>
  );
};
