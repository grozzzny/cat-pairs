import { PageWrapper } from '@/components';
import { ForumTopicsList } from '@/components';
import { FORUM_TOPICS_LIST } from '@/helpers/constants/forum';
import { ExitButton } from '@/components';

export const ForumPage = () => {
  return (
    <PageWrapper>
      <>
        <ForumTopicsList list={FORUM_TOPICS_LIST} />
        <ExitButton />
      </>
    </PageWrapper>
  );
};
