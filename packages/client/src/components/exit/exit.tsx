import { Link, Navigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './exit.css';

export const Exit = () => {
  const navigate = useNavigate();
  return (
    <div className='exitContainer'>
      <p className='exitText'>выход из игры</p>
      <LogoutOutlined
        style={{ fontSize: '150%', color: '#565A5D' }}
        rev={undefined}
        onClick={() => navigate('/')}
      />
    </div>
  );
};
