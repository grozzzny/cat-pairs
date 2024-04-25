import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components';
import { withAuthRouteHOC } from '@/helpers/hooks/withAuthRouteHOC';
import { setPageTitle } from '@/helpers/helper';
import { LeadersTable } from '@/components';
import { LeaderboardService } from '@/services/leaderboard';
import { LeaderboardTeamRequestResult } from '@/helpers/types/leaderboard';
import { LeaderboardRequest } from '@/helpers/types/leaderboard';
import { SCORE_CAT_CODERS } from '@/helpers/constants/api';
import { ExitButton } from '@/components/exit-button';

export const LeaderboardPage = () => {
  const [leadersList, setLeadersList] =
    useState<LeaderboardTeamRequestResult | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async ({
      ratingFieldName,
      cursor,
      limit,
    }: LeaderboardRequest) => {
      const result = await LeaderboardService.getTeamLeaderboard({
        ratingFieldName,
        cursor,
        limit,
      });

      if (result) {
        setLeadersList(result);
      }
    };

    fetchLeaderboard({
      ratingFieldName: SCORE_CAT_CODERS,
      cursor: 0,
      limit: 6,
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
