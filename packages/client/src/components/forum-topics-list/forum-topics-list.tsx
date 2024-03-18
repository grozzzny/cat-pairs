import { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components';
import './forum-topics-list.css';

interface ForumTopic {
  id: number;
  title: string;
  messages: string;
}

interface ForumTopicsListProps {
  list: ForumTopic[];
}

export const ForumTopicsList = ({
  list,
}: ForumTopicsListProps): JSX.Element => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex className='forum-topics-list' justify='center'>
      <table className='forum-topics-list__table'>
        <thead>
          <tr>
            <th className='forum-topics-list__column-title'>Темы</th>
            <th className='forum-topics-list__column-title'>Сообщения</th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, title, messages }) => (
            <tr key={id}>
              <td>
                <Flex
                  className='forum-topics-list__item-title'
                  align='center'
                  onClick={() => navigate(`/forum/${id}`)}>
                  {title}
                </Flex>
              </td>
              <td>
                <Flex
                  className='forum-topics-list__item-messages-count'
                  align='center'
                  justify='center'>
                  {messages}
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
        okText='Создать тему'>
        <form>
          <Input placeholder='Название темы' />
          <Input placeholder='Описание' />
        </form>
      </Modal>
      <div className='forum-topics-list__right-column'>
        <Button
          type='default'
          size='large'
          className='forum-topics-list__create-button'
          onClick={showModal}>
          Создать новую тему
        </Button>
      </div>
    </Flex>
  );
};
