import { ForumApi } from '@/api';
import {
  ForumCreateCommentDto,
  ForumCreateTopicDto,
  ForumGetReactionsRequest,
  ForumGetReactionsResult,
  ForumUpdateReactionRequest,
} from '@/helpers/types';

export class ForumService {
  constructor(public readonly api: ForumApi = new ForumApi()) {}

  getAllTopics() {
    return this.api.getAllTopics();
  }

  getTopic(topicId: string) {
    return this.api.getTopic(topicId);
  }

  createTopic(props: ForumCreateTopicDto) {
    return this.api.createTopic(props);
  }

  createComment(props: ForumCreateCommentDto) {
    return this.api.createComment(props);
  }

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
