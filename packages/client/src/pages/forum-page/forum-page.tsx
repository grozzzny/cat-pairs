import { useEffect, useState } from 'react';
import { ForumService } from '@/services/forum';
import { setPageTitle } from '@/helpers/helper';
import { PageWrapper } from '@/components';
import { ForumTopicsList } from '@/components';
import { ExitButton } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const ForumPage = () => {
  const [forumTopicsList, setForumTopicsList] = useState(null);

  setPageTitle('Форум');
  useEffect(() => {
    const service = new ForumService();
    const fetchForumTopics = async () => {
      service
        .getAllTopics()
        .then(data => setForumTopicsList(data as any))
        .catch(err => console.warn(err));
    };

    fetchForumTopics();

    return () => service.api.abortController.abort();
  }, []);

  return (
    <PageWrapper>
      <>
        {forumTopicsList && <ForumTopicsList list={forumTopicsList} />}
        <ExitButton />
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(ForumPage);
