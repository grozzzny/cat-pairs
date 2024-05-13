import { LeaderboardTeamRequestResult } from '@/helpers/types/leaderboard';
import { Flex } from 'antd';
import { LeaderCard } from '@/components';
import './leaders-table.css';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';

interface LeadersTableProps {
  list: LeaderboardTeamRequestResult;
}

export const LeadersTable = ({ list }: LeadersTableProps): JSX.Element => {
  const theme = useAppSelector(state => state.user.theme) as Theme;
  return (
    <Flex wrap='wrap' justify='space-between' className='leaders-table'>
      {list.map((item, index) => (
        <LeaderCard
          key={index + 1}
          theme={theme}
          position={index + 1}
          avatar={item.data.avatar}
          name={item.data.name}
          score={item.data.scoreCatCoders}
        />
      ))}
    </Flex>
  );
};
