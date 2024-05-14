import { EmojiBar } from '../emoji-bar/emoji-bar';
import './forum-topic-feed-item.css';

interface ForumTopicFeedItemProps {
  name: string;
  text: string;
  commentId: number;
  createdAt?: string;
}

export const ForumTopicFeedItem = ({
  name,
  text,
  commentId,
  createdAt,
}: ForumTopicFeedItemProps): JSX.Element => {
  return (
    <div className='forum-topic-feed-item'>
      <div className='forum-topic-feed-item__name'>{name}</div>
      <div className='forum-topic-feed-item__text'>{text}</div>
      {createdAt && (
        <div className='forum-topic-feed-item__time'>{createdAt}</div>
      )}
      <div className='forum-topic-feed-item__emoji'>
        <EmojiBar commentId={commentId} />
      </div>
    </div>
  );
};
