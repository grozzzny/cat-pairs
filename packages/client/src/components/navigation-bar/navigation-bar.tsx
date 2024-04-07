import { Flex, theme as antdTheme } from 'antd';
import { IconButton } from '@/components';
import {
  CrownTwoTone,
  MessageTwoTone,
  PlayCircleTwoTone,
  SmileTwoTone,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

interface NavigationBarProps {
  className?: string;
}

export const NavigationBar = memo((props: NavigationBarProps) => {
  const { className } = props;
  const { token: theme } = antdTheme.useToken();
  const iconProps = {
    twoToneColor: theme.colorIcon,
    rev: null,
    style: { fontSize: '30px' },
  };
  const navigate = useNavigate();
  return (
    <Flex gap={24} className={className}>
      <IconButton
        icon={
          <MessageTwoTone {...iconProps} onClick={() => navigate('/forum')} />
        }
      />
      <IconButton
        icon={
          <CrownTwoTone
            {...iconProps}
            onClick={() => navigate('/leaderboard')}
          />
        }
      />
      <IconButton
        icon={
          <PlayCircleTwoTone {...iconProps} onClick={() => navigate('/game')} />
        }
      />
      <IconButton
        icon={
          <SmileTwoTone {...iconProps} onClick={() => navigate('/profile')} />
        }
      />
    </Flex>
  );
});
