import { BaseApi } from '@/api/base';
import {
  DefaultResult,
  ForumGetReactionsRequest,
  ForumGetReactionsResult,
  ForumUpdateReactionRequest,
} from '@/helpers/types';

export class ForumApi extends BaseApi {
  getReactions({ commentId }: ForumGetReactionsRequest) {
    return this.get<ForumGetReactionsResult>(`/comment/reaction/${commentId}`);
  }

  addReaction(params: ForumUpdateReactionRequest) {
    return this.post<DefaultResult>('/comment/reaction', params);
  }

  deleteReaction(params: ForumUpdateReactionRequest) {
    return this.delete<DefaultResult>('/comment/reaction', params);
  }
}
