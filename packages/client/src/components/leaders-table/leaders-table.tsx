import { Flex } from 'antd';
import { LeaderCard } from '@/components';
import './leaders-table.css';

export interface Leader {
  position: number;
  avatar: string;
  name: string;
  score: string;
}

interface LeadersTableProps {
  list: Leader[];
}

export const LeadersTable = ({ list }: LeadersTableProps): JSX.Element => {
  return (
    <Flex wrap='wrap' justify='space-between' className='leaders-table'>
      {list.map(item => (
        <LeaderCard
          key={item.position}
          position={item.position}
          avatar={item.avatar}
          name={item.name}
          score={item.score}
        />
      ))}
    </Flex>
  );
};
