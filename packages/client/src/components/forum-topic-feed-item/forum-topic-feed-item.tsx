import { EmojiBar } from '../emoji-bar/emoji-bar';
import './forum-topic-feed-item.css';

interface ForumTopicFeedItemProps {
  name: string;
  text: string;
  time: string;
  key: number;
}

export const ForumTopicFeedItem = ({
  name,
  text,
  time,
  key: topicId,
}: ForumTopicFeedItemProps): JSX.Element => {
  return (
    <div className='forum-topic-feed-item'>
      <div className='forum-topic-feed-item__name'>{name}</div>
      <div className='forum-topic-feed-item__text'>{text}</div>
      <div className='forum-topic-feed-item__time'>{time}</div>
      <div className='forum-topic-feed-item__emoji'>
        <EmojiBar topicId={topicId} />
      </div>
    </div>
  );
};
