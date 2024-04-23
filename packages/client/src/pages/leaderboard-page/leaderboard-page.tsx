import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';
import { setPageTitle } from '@/helpers/helper';
import { LeadersTable } from '@/components';
import { LeaderboardService } from '@/services/leaderboard';
import { LeaderboardTeamRequestResult } from '@/helpers/types/leaderboard';
import { ExitButton } from '@/components/exit-button';

export const LeaderboardPage = () => {
  const [leadersList, setLeadersList] =
    useState<LeaderboardTeamRequestResult | null>(null);

  useEffect(() => {
    LeaderboardService.getTeamLeaderboard({
      ratingFieldName: 'scoreCatCoders',
      cursor: 0,
      limit: 6,
    }).then(res => {
      res && setLeadersList(res);
    });
  }, []);

  setPageTitle('Таблица лидеров');

  return (
    <PageWrapper>
      <>
        {leadersList && <LeadersTable list={leadersList} />}
        <ExitButton />
      </>
    </PageWrapper>
  );
};

export default withAuthRouteHOC(LeaderboardPage);
