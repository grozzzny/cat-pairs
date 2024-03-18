import './forum-topic.css';

interface Message {
  messageId: number;
  name: string;
  text: string;
  time: string;
}

interface ForumTopicProps {
  title: string;
  description: string;
  feed: Message[];
}

export const ForumTopic = ({
  title,
  description,
  feed,
}: ForumTopicProps): JSX.Element => {
  return (
    <div className='forum-topic'>
      <h1>{title}</h1>
      <div className='forum-topic__description'>{description}</div>
      <div className='forum-topic__feed'>
        {feed.map(({ messageId, name, text, time }) => (
          <div key={messageId} className='forum-topic__feed-item'>
            <div className='forum-topic__feed-item-name'>{name}</div>
            <div className='forum-topic__feed-item-text'>{text}</div>
            <div className='forum-topic__feed-item-time'>{time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
