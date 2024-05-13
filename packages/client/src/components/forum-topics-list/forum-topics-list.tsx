import { useRef, useState } from 'react';
import {
  Button,
  ConfigProvider,
  Flex,
  Form,
  type FormInstance,
  type FormProps,
  Modal,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components';
import { Color } from '@/helpers';
import { ForumCreateTopicDto, ForumTopicRequestResult } from '@/helpers/types';
import { ForumService } from '@/services/forum';
import './forum-topics-list.css';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';

interface ForumTopicsListProps {
  list: ForumTopicRequestResult[];
}

export const ForumTopicsList = ({
  list,
}: ForumTopicsListProps): JSX.Element => {
  const theme = useAppSelector(state => state.user.theme);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<FormInstance<ForumCreateTopicDto> | null>(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<ForumCreateTopicDto>['onFinish'] = values => {
    const service = new ForumService();
    const createNewTopic = async () => {
      service
        .createTopic(values)
        .then(data => navigate(`/forum/${data.id}`))
        .catch(err => console.warn(err));
    };

    createNewTopic();

    return () => service.api.abortController.abort();
  };

  return (
    <Flex
      className={[
        'forum-topics-list',
        theme === Theme.Dark ? 'forum-topics-list--dark' : null,
      ].join(' ')}
      justify='center'>
      <table className='forum-topics-list__table'>
        <thead>
          <tr>
            <th className='forum-topics-list__column-title'>Темы</th>
            <th className='forum-topics-list__column-title'>Сообщения</th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, topicName, comments }) => (
            <tr key={id}>
              <td>
                <Flex
                  className='forum-topics-list__item-title'
                  align='center'
                  onClick={() => navigate(`/forum/${id}`)}>
                  {topicName}
                </Flex>
              </td>
              <td>
                <Flex
                  className='forum-topics-list__item-messages-count'
                  align='center'
                  justify='center'>
                  {comments.length}
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ className: 'forum-topics-list__cancel-button' }}
        okButtonProps={{ className: 'forum-topics-list__submit-button' }}
        okText='Создать тему'
        cancelText='Закрыть'
        className='forum-topics-list__modal'>
        <Form ref={formRef} onFinish={onFinish}>
          <Form.Item<ForumCreateTopicDto>
            name='topicName'
            rules={[{ required: true, message: 'Пожалуйста, заполните поле' }]}>
            <Input placeholder='Название темы' />
          </Form.Item>
          <Form.Item<ForumCreateTopicDto>
            name='description'
            rules={[{ required: true, message: 'Пожалуйста, заполните поле' }]}>
            <Input type='textarea' placeholder='Описание' />
          </Form.Item>
        </Form>
      </Modal>
      <div className='forum-topics-list__right-column'>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverColor: Color.Dark,
                defaultHoverBorderColor: Color.Dark,
                defaultHoverBg: 'transparent',
                defaultActiveBg: 'transparent',
              },
            },
          }}>
          <Button
            type='default'
            size='large'
            className='forum-topics-list__create-button'
            onClick={showModal}>
            Создать новую тему
          </Button>
        </ConfigProvider>
      </div>
    </Flex>
  );
};
