import { useState } from 'react';
import { ForumService } from '@/services/forum';
import { ForumTopicFeedItem } from '@/components';
import { Button, Form, type FormProps } from 'antd';
import {
  ForumCreateCommentDto,
  ForumTopicRequestResult,
} from '@/helpers/types';
import { timeFormatConverter } from '@/helpers';
import { Input } from '@/components';
import './forum-topic.css';

export const ForumTopic = ({
  id,
  topicName,
  description,
  comments,
}: ForumTopicRequestResult): JSX.Element => {
  const [actualComments, setActualComments] = useState(comments);
  const [form] = Form.useForm();
  const onFinish: FormProps<ForumCreateCommentDto>['onFinish'] = values => {
    const service = new ForumService();
    const addComment = async () => {
      service
        .createComment({
          topicId: id,
          text: values.text,
        })
        .then(data => setActualComments([...actualComments, data]))
        .catch(err => console.warn(err));
    };

    addComment();
    form.resetFields();

    return () => service.api.abortController.abort();
  };
  return (
    <div className='forum-topic'>
      <h1>{topicName}</h1>
      <div className='forum-topic__description'>{description}</div>
      {actualComments.length > 0 && (
        <div className='forum-topic__feed'>
          {actualComments.map(item => (
            <ForumTopicFeedItem
              key={item.id}
              topicId={item.topicId}
              // name={item.name}
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
          htmlType='submit'>
          Отправить
        </Button>
      </Form>
    </div>
  );
};
