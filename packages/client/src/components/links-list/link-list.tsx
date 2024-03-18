import { Space } from 'antd';
import React from 'react';
import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const LinkList: React.FC = () => {
  const navigate = useNavigate();
  const data = [
    { title: 'Лидерборд', url: '/leaderboard' },
    { title: 'Форум', url: '/forum' },
    { title: 'Профиль игрока', url: '/profile' },
  ];

  return (
    <Space>
      {data.map(item => (
        <Button label={item.title} onClick={() => navigate(item.url)} />
      ))}
    </Space>
  );
};
