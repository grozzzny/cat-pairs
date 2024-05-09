import { ForumTopicFeedItem } from '@/components';
import { Button, Form } from 'antd';
import { Input } from '@/components';
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
      {feed.length > 0 && (
        <div className='forum-topic__feed'>
          {feed.map(item => (
            <ForumTopicFeedItem
              key={item.messageId}
              topicId={item.messageId}
              name={item.name}
              text={item.text}
              time={item.time}
            />
          ))}
        </div>
      )}
      <Form>
        <Input type='textarea' placeholder='Написать сообщение' />
        <Button
          className='forum-topic__send-message-button'
          type='primary'
          htmlType='submit'>
          Отправить
        </Button>
      </Form>
    </div>
  );
};
