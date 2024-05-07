import { ForumApi } from '@/api';
import {
  ForumGetReactionsRequest,
  ForumGetReactionsResult,
  ForumUpdateReactionRequest,
} from '@/helpers/types';

export class ForumService {
  constructor(public readonly api: ForumApi = new ForumApi()) {}

  getReactions(
    props: ForumGetReactionsRequest
  ): Promise<ForumGetReactionsResult> {
    return this.api.getReactions(props);
  }

  addReaction(props: ForumUpdateReactionRequest) {
    return this.api.addReaction(props);
  }

  deleteReaction(props: ForumUpdateReactionRequest) {
    return this.api.deleteReaction(props);
  }
}
