import { EMOJI } from '@/helpers/constants/emoji';
import { EmojiCodes, ReactionInfo } from '@/helpers/types';
import { ForumService } from '@/services/forum';
import { Button } from '..';
import './emoji-button.css';

interface EmojiButtonProps {
  emojiCode: string;
  reactionInfo: ReactionInfo;
  currentUserId: number;
  topicId: number;
}

export const EmojiButton = ({
  emojiCode,
  reactionInfo,
  currentUserId,
  topicId,
}: EmojiButtonProps) => {
  const key = emojiCode as EmojiCodes;
  const emojiImg = <img src={EMOJI[key]} alt={key} />;
  const { emojiNumber, isActive } = reactionInfo;
  const service = new ForumService();

  const handleEmojiClick = () => {
    if (isActive) {
      service.deleteReaction({ topicId, userId: currentUserId, emojiCode });
      return;
    }
    service.addReaction({ topicId, userId: currentUserId, emojiCode });
  };

  return (
    <Button
      className={`emoji-button ${isActive && 'emoji-button--active'}`}
      label={String(emojiNumber)}
      icon={emojiImg}
      key={key}
      onClick={handleEmojiClick}
    />
  );
};
