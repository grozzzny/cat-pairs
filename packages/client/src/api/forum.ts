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
    // TODO: временная заглушка на время отсутствия АПИ
    // return this.post<DefaultResult>('/forum/reaction', params);
    return new Promise<ForumUpdateReactionRequest>(resolve => resolve(params));
  }

  deleteReaction(params: ForumUpdateReactionRequest) {
    // TODO: временная заглушка на время отсутствия АПИ
    // return this.delete<DefaultResult>('/forum/reaction', params);
    return new Promise<ForumUpdateReactionRequest>(resolve => resolve(params));
  }
}
