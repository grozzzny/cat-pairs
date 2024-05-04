export type EmojiCodes = 'grin' | 'cry' | 'pout' | 'smile';

export type ForumTopicReactionDto = {
  id: number;
  emojiId: number;
  emojiCode: EmojiCodes;
  topicId: number;
  userId: number;
};

export type ReactionInfo = {
  emojiNumber: number;
  isActive: boolean;
};

export type ReactionList = Record<EmojiCodes, ReactionInfo>;
