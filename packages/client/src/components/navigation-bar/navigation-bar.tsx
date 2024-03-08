import { Flex, theme as antdTheme } from 'antd';
import { IconButton } from '..';
import {
  CrownTwoTone,
  MessageTwoTone,
  PlayCircleTwoTone,
} from '@ant-design/icons';

interface NavigationBarProps {
  className?: string;
}

export const NavigationBar = (props: NavigationBarProps) => {
  const { className } = props;
  const { token: theme } = antdTheme.useToken();
  return (
    <Flex gap={24} className={className}>
      <IconButton
        icon={
          <MessageTwoTone
            twoToneColor={theme.colorIcon}
            rev={null}
            style={{ fontSize: '30px' }}
          />
        }
      />
      <IconButton
        icon={
          <CrownTwoTone
            twoToneColor={theme.colorIcon}
            rev={null}
            style={{ fontSize: '30px' }}
          />
        }
      />
      <IconButton
        icon={
          <PlayCircleTwoTone
            twoToneColor={theme.colorIcon}
            rev={null}
            style={{ fontSize: '30px' }}
          />
        }
      />
    </Flex>
  );
};
