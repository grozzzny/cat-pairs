import { LeaderboardTeamRequestResult } from '@/helpers/types/leaderboard';
import { Flex } from 'antd';
import { LeaderCard } from '@/components';
import './leaders-table.css';

interface LeadersTableProps {
  list: LeaderboardTeamRequestResult;
}

export const LeadersTable = ({ list }: LeadersTableProps): JSX.Element => {
  return (
    <Flex wrap='wrap' justify='space-between' className='leaders-table'>
      {list.map((item, index) => (
        <LeaderCard
          key={index + 1}
          position={index + 1}
          avatar={item.data.avatar}
          name={item.data.name}
          score={item.data.scoreCatCoders}
        />
      ))}
    </Flex>
  );
};
