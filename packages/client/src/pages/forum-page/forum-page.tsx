import { setPageTitle } from '@/helpers/helper';
import { PageWrapper } from '@/components';
import { ForumTopicsList } from '@/components';
import { FORUM_TOPICS_LIST } from '@/helpers/constants/forum';
import { ExitButton } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const ForumPage = () => {
  setPageTitle('Форум');
  return (
    <PageWrapper>
      <>
        <ForumTopicsList list={FORUM_TOPICS_LIST} />
        <ExitButton />
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(ForumPage);
