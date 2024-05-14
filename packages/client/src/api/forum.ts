import { BaseApi } from '@/api/base';
import { FetchHelperParams, fetchServerHelper } from '@/helpers/fetch-helper';
import { FORUM_REACTIONS_LIST } from '@/helpers/constants/forum';
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
