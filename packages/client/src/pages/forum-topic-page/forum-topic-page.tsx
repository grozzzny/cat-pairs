import { useEffect, useState } from 'react';
import { ForumService } from '@/services/forum';
import { useParams } from 'react-router-dom';
import { setPageTitle } from '@/helpers/helper';
import { PageWrapper } from '@/components';
import { ForumTopicRequestResult } from '@/helpers/types';
import { ForumTopic } from '@/components';
import { ExitButton } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const ForumTopicPage = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState<ForumTopicRequestResult | null>(null);

  setPageTitle(topic?.topicName ?? 'Форум');
  useEffect(() => {
    const service = new ForumService();
    const fetchTopicContent = async () => {
      service
        .getTopic(id as string)
        .then(data => setTopic(data as any))
        .catch(err => console.warn(err));
      console.log(topic);
    };

    fetchTopicContent();

    return () => service.api.abortController.abort();
  }, []);
  return (
    <PageWrapper>
      <>
        {topic ? (
          <ForumTopic
            id={topic.id}
            topicName={topic.topicName}
            description={topic.description}
            comments={topic.comments}
          />
        ) : (
          <h1>Тема ещё не создана или удалена</h1>
        )}
        <ExitButton />
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(ForumTopicPage);
