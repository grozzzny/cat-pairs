import { Space } from 'antd';
import React from 'react';
import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';

export const LinkList: React.FC = () => {
  const theme = useAppSelector(state => state.user.theme);
  const navigate = useNavigate();
  const data = [
    { title: 'Лидерборд', url: '/leaderboard' },
    { title: 'Форум', url: '/forum' },
    { title: 'Профиль игрока', url: '/profile' },
  ];

  return (
    <Space>
      {data.map((item, index) => (
        <Button
          key={index}
          darkTheme={theme === Theme.Dark}
          label={item.title}
          onClick={() => navigate(item.url)}
        />
      ))}
    </Space>
  );
};
