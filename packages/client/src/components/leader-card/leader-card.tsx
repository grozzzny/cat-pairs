import { Flex } from 'antd';
import './leader-card.css';

interface LeaderCardProps {
  position: number;
  avatar: string;
  name: string;
  score: string;
}

export const LeaderCard = ({
  position,
  avatar,
  name,
  score,
}: LeaderCardProps): JSX.Element => {
  return (
    <Flex align='center' justify='center' className='leader-card'>
      <div className='leader-card__icon'></div>
      <div className='leader-card__position'>{position}</div>
      <div
        className='leader-card__avatar'
        style={{ backgroundImage: `url(${avatar})` }}>
        {avatar}
      </div>
      <div className='leader-card__name'>{name}</div>
      <div className='leader-card__score'>{score}</div>
    </Flex>
  );
};
