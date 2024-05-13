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
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Color, Theme } from '@/helpers/constants/global';

interface NavigationBarProps {
  className?: string;
}

export const NavigationBar = memo((props: NavigationBarProps) => {
  const theme = useAppSelector(state => state.user.theme);
  const { className } = props;
  const { token: themeAntd } = antdTheme.useToken();
  const iconProps: Omit<AntdIconProps, 'ref'> = {
    twoToneColor: theme === Theme.Dark ? Color.Black : themeAntd.colorIcon,
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
