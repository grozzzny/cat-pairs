import { EmojiCodes, ReactionInfo, ReactionList } from '../types';

export const EMOJI: Record<EmojiCodes, string> = {
  grin: '/public/images/emoji/emoji-grin-32.png',
  cry: '/public/images/emoji/emoji-cry-32.png',
  pout: '/public/images/emoji/emoji-pout-32.png',
  smile: '/public/images/emoji/emoji-smile-32.png',
};

const REACTION_INFO_DEFAULT: ReactionInfo = {
  emojiNumber: 0,
  isActive: false,
};

export const REACTION_LIST_DEFAULT: ReactionList = {
  grin: REACTION_INFO_DEFAULT,
  cry: REACTION_INFO_DEFAULT,
  pout: REACTION_INFO_DEFAULT,
  smile: REACTION_INFO_DEFAULT,
};
