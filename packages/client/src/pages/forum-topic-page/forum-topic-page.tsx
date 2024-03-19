import { useParams } from 'react-router-dom';
import { setPageTitle } from '@/helpers/helper';
import { PageWrapper } from '@/components';
import { FORUM_TOPICS_LIST } from '@/helpers/constants/forum';
import { ForumTopic } from '@/components';
import { ExitButton } from '@/components';

export const ForumTopicPage = () => {
  const { id } = useParams();
  const topic = FORUM_TOPICS_LIST.find(
    topic => topic.id === parseInt(id as string)
  );

  setPageTitle(topic ? topic.title : 'Форум');

  return (
    <PageWrapper>
      <>
        {topic ? (
          <ForumTopic
            title={topic.title}
            description={topic.description}
            feed={topic.feed}
          />
        ) : (
          <h1>Тема ещё не создана или удалена</h1>
        )}
        <ExitButton />
      </>
    </PageWrapper>
  );
};
