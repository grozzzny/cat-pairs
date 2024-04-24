import {
  LeaderboardNewLeaderRequest,
  LeaderboardNewLeaderRequestResult,
  LeaderboardRequest,
  LeaderboardTeamRequestResult,
} from '@/helpers/types/leaderboard';
import { LeaderboardApi } from '@/api';
import { isRequestError } from '@/helpers/request';

export class LeaderboardService {
  static async addUser(
    props: LeaderboardNewLeaderRequest
  ): Promise<LeaderboardNewLeaderRequestResult | undefined> {
    try {
      const response = await LeaderboardApi.addUser(props);

      if (response.ok && !isRequestError(response.status)) {
        return { isOk: true, reason: '' };
      }

      const error = await response.json();

      return { isOk: false, reason: error.reason };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  static async getTeamLeaderboard(
    props: LeaderboardRequest
  ): Promise<LeaderboardTeamRequestResult | undefined> {
    try {
      const response = await LeaderboardApi.getTeamLeaderboard(props);
      const data = await response.json();

      if (response.ok && !isRequestError(response.status)) {
        return data;
      }

      const error = await response.json();

      return error.reason;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}
