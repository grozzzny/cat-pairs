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
