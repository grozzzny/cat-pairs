import { PageWrapper } from '@/components';
import { ForumTopicsList } from '@/components';
import { FORUM_TOPICS_LIST } from '@/helpers/constants/forum';

export const ForumPage = () => {
  return (
    <PageWrapper>
      <ForumTopicsList list={FORUM_TOPICS_LIST} />
    </PageWrapper>
  );
};
