import { Flex } from 'antd';
import './leader-card.css';

interface LeaderCardProps {
  position: number;
  avatar?: string;
  name: string;
  score: string;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({
  position,
  avatar,
  name,
  score,
}) => {
  return (
    <Flex align='center' justify='center' className='leader-card'>
      <div className='leader-card__icon'></div>
      <div className='leader-card__position'>{position}</div>
      <img
        className='leader-card__avatar'
        src={avatar || '/public/cat-background.png'}
        alt={name}
      />
      <div className='leader-card__name'>{name}</div>
      <div className='leader-card__score'>{score}</div>
    </Flex>
  );
};
