import { useParams } from 'react-router-dom';
import { PageWrapper } from '@/components';
import { FORUM_TOPICS_LIST } from '@/helpers/constants/forum';
import { ForumTopic } from '@/components';

export const ForumTopicPage = () => {
  const { id } = useParams();
  const topic = FORUM_TOPICS_LIST.find(
    topic => topic.id === parseInt(id as string)
  );
  return (
    <PageWrapper>
      {topic ? (
        <ForumTopic
          title={topic.title}
          description={topic.description}
          feed={topic.feed}
        />
      ) : (
        <h1>Тема ещё не создана или удалена</h1>
      )}
    </PageWrapper>
  );
};
