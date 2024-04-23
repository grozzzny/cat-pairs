export type LeaderboardNewLeaderRequest = {
  data: {
    avatar?: string;
    name: string;
    scoreCatCoders: number;
  };
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
  data: {
    avatar?: string;
    name: string;
    scoreCatCoders: number;
  };
}>;
