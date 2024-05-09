import { EmojiCodes, ReactionInfo, ReactionList } from '../types';

export const EMOJI: Record<EmojiCodes, string> = {
  grin: '/images/emoji/emoji-grin-32.png',
  cry: '/images/emoji/emoji-cry-32.png',
  pout: '/images/emoji/emoji-pout-32.png',
  smile: '/images/emoji/emoji-smile-32.png',
};

const REACTION_INFO_DEFAULT: ReactionInfo = {
  emojiNumber: 0,
  isActive: false,
};

export const REACTION_LIST_DEFAULT: ReactionList = {
  grin: structuredClone(REACTION_INFO_DEFAULT),
  cry: structuredClone(REACTION_INFO_DEFAULT),
  pout: structuredClone(REACTION_INFO_DEFAULT),
  smile: structuredClone(REACTION_INFO_DEFAULT),
};
