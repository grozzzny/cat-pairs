import { Button, ForumTopicFeedItem } from '@/components';
import { Form } from 'antd';
import { Input } from '@/components';
import './forum-topic.css';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';

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
  const theme = useAppSelector(state => state.user.theme);

  return (
    <div
      className={[
        'forum-topic',
        theme === Theme.Dark ? 'forum-topic--dark' : null,
      ].join(' ')}>
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
          darkTheme={theme !== Theme.Dark}
          label={'Отправить'}
          htmlType='submit'
        />
      </Form>
    </div>
  );
};
