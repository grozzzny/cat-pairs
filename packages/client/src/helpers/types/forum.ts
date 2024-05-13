import { User } from '@/helpers/types';

export type EmojiCodes = 'grin' | 'cry' | 'pout' | 'smile';

export type ForumTopicReactionDto = {
  id: number;
  emojiId: number;
  emojiCode: EmojiCodes;
  topicId: number;
  userId: number;
};

export type ForumGetReactionsResult = {
  data: ForumTopicReactionDto[];
};

export type ReactionInfo = {
  emojiNumber: number;
  isActive: boolean;
};

export type ReactionList = Record<EmojiCodes, ReactionInfo>;

export type ForumGetReactionsRequest = {
  topicId: number;
};

export type ForumUpdateReactionRequest = {
  topicId: number;
  userId: number;
  emojiCode: string;
};

export type ForumTopicComment = {
  id: number;
  topicId: number;
  userId: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type ForumTopicRequestResult = {
  id: number;
  topicName: string;
  // userId: number;
  description: string;
  // createdAt: string;
  // updatedAt: string;
  comments: ForumTopicComment[];
};

export type ForumTopics = ForumTopicRequestResult[];

export type ForumCreateTopicDto = {
  topicName: string;
  description: string;
};

export type ForumCreateCommentDto = {
  topicId: number;
  text: string;
};
