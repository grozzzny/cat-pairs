import { PageWrapper } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';

const LeaderboardPage = () => {
  return (
    <PageWrapper>
      <div>Страница лидерборда</div>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(LeaderboardPage);
