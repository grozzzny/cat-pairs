import { useCallback, useState } from 'react';
import { ForumService } from '@/services/forum';
import { Button, ForumTopicFeedItem } from '@/components';
import { Form, type FormProps } from 'antd';
import {
  ForumCreateCommentDto,
  ForumTopicRequestResult,
} from '@/helpers/types';
import { timeFormatConverter } from '@/helpers';
import { Input } from '@/components';
import './forum-topic.css';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';

export const ForumTopic = ({
  id,
  topicName,
  description,
  comments,
}: ForumTopicRequestResult): JSX.Element => {
  const theme = useAppSelector(state => state.user.theme);
  const [actualComments, setActualComments] = useState(comments);
  const [form] = Form.useForm();
  const onFinish: FormProps<ForumCreateCommentDto>['onFinish'] = useCallback(
    (values: ForumCreateCommentDto) => {
      const service = new ForumService();
      const addComment = () => {
        service
          .createComment({
            topicId: id,
            text: values.text,
          })
          .then(data => {
            setActualComments(actualComments => [...actualComments, data]);
            form.resetFields();
          })
          .catch(err => console.warn(err));
      };

      addComment();

      return () => service.api.abortController.abort();
    },
    [form, id, setActualComments]
  );

  return (
    <div
      className={[
        'forum-topic',
        theme === Theme.Dark ? 'forum-topic--dark' : null,
      ].join(' ')}>
      <h1>{topicName}</h1>
      <div className='forum-topic__description'>{description}</div>
      {actualComments.length > 0 && (
        <div className='forum-topic__feed'>
          {actualComments.map(item => (
            <ForumTopicFeedItem
              key={item.id}
              topicId={item.topicId}
              name={`${item.user.first_name} ${item.user.second_name}`}
              text={item.text}
              createdAt={timeFormatConverter(item.createdAt)}
            />
          ))}
        </div>
      )}
      <Form form={form} onFinish={onFinish}>
        <Form.Item<ForumCreateCommentDto>
          name='text'
          rules={[{ required: true, message: 'Пожалуйста, заполните поле' }]}>
          <Input type='textarea' placeholder='Написать сообщение' />
        </Form.Item>
        <Button
          className='forum-topic__send-message-button'
          type='primary'
          darkTheme={theme !== Theme.Dark}
          label={'Отправить'}
          htmlType='submit'
        />
      </Form>
    </div>
  );
};
