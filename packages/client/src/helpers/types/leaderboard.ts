type LeaderboardUserData = {
  avatar?: string;
  name: string;
  scoreCatCoders: number;
};

export type LeaderboardNewLeaderRequest = {
  data: LeaderboardUserData;
  ratingFieldName: string;
};

export type LeaderboardRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type LeaderboardNewLeaderRequestResult = {
  isOk: boolean;
  reason: string;
};

export type LeaderboardTeamRequestResult = Array<{
  data: LeaderboardUserData;
}>;
