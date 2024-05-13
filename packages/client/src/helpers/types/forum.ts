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
