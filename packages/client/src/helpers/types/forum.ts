import { User } from '@/helpers/types';

export type EmojiCodes = 'grin' | 'cry' | 'pout' | 'smile';

export type EmojiDto = {
  id: number;
  emojiCode: EmojiCodes;
};

export type ForumTopicReactionDto = {
  id: number;
  userId: number;
  commentId: number;
  emojiId: number;
  createdAt: string;
  updatedAt: string;
  emoji: EmojiDto;
};

export type ForumGetReactionsResult = ForumTopicReactionDto[];

export type ReactionInfo = {
  emojiNumber: number;
  isActive: boolean;
};

export type ReactionList = Record<EmojiCodes, ReactionInfo>;

export type ForumGetReactionsRequest = {
  commentId: number;
};

export type ForumUpdateReactionRequest = {
  emojiId: number;
  commentId: number;
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
  description: string;
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
