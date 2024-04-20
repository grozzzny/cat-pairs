import { PageWrapper } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';
import { setPageTitle } from '@/helpers/helper';
import { LeadersTable } from '@/components';
import { LEADERS_LIST } from '@/helpers/constants/leaderboard';
import { ExitButton } from '@/components/exit-button';

export const LeaderboardPage = () => {
  setPageTitle('Таблица лидеров');
  return (
    <PageWrapper>
      <>
        <LeadersTable list={LEADERS_LIST} />
        <ExitButton />
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(LeaderboardPage);
