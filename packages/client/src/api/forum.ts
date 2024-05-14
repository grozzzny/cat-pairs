import { BaseApi } from '@/api/base';
import { FetchHelperParams, fetchServerHelper } from '@/helpers/fetch-helper';
import {
  DefaultResult,
  ForumCreateCommentDto,
  ForumCreateTopicDto,
  ForumGetReactionsRequest,
  ForumGetReactionsResult,
  ForumTopicComment,
  ForumTopicRequestResult,
  ForumTopics,
  ForumUpdateReactionRequest,
} from '@/helpers/types';

export class ForumApi extends BaseApi {
  getFetch(url: string, options: FetchHelperParams) {
    return fetchServerHelper(url, options);
  }

  getAllTopics() {
    return this.get<ForumTopics>('/topic/getAll');
  }

  getTopic(topicId: string) {
    return this.get<ForumTopicRequestResult>(`/topic/getOne/${topicId}`);
  }

  createTopic(params: ForumCreateTopicDto) {
    return this.post<ForumTopicRequestResult>('/topic/create', params);
  }

  createComment(params: ForumCreateCommentDto) {
    return this.post<ForumTopicComment>('/comment/create', params);
  }

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
