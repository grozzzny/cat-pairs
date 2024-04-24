import { fetchHelper, getString, setHeaders } from '@/helpers';
import {
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
} from '@/helpers/types/leaderboard';

export class LeaderboardApi {
  static addUser(params: LeaderboardNewLeaderRequest) {
    return fetchHelper('/leaderboard', {
      method: 'POST',
      body: getString(params),
      headers: setHeaders('application/json'),
    });
  }

  static getTeamLeaderboard(params: LeaderboardRequest) {
    return fetchHelper('/leaderboard/all', {
      method: 'POST',
      body: getString(params),
      headers: setHeaders('application/json'),
    });
  }
}
