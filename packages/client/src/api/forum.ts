import { BaseApi } from '@/api/base';
import { FORUM_REACTIONS_LIST } from '@/helpers/constants/forum';
import {
  DefaultResult,
  ForumGetReactionsRequest,
  ForumGetReactionsResult,
  ForumUpdateReactionRequest,
} from '@/helpers/types';

export class ForumApi extends BaseApi {
  getReactions({ topicId }: ForumGetReactionsRequest) {
    // TODO: временная заглушка на время отсутствия АПИ
    // return this.get<ForumGetReactionsResult>(`/forum/reaction?id=${topicId}`);
    return new Promise<ForumGetReactionsResult>(resolve =>
      resolve({ data: FORUM_REACTIONS_LIST })
    );
  }

  addReaction(params: ForumUpdateReactionRequest) {
    return this.post<DefaultResult>('/forum/reaction', params);
  }

  deleteReaction(params: ForumUpdateReactionRequest) {
    return this.delete<DefaultResult>('/forum/reaction', params);
  }
}
