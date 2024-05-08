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
  const value = emojiNumber || '';

  const handleEmojiClick = async () => {
    if (isActive) {
      const result = await service.deleteReaction({
        topicId,
        userId: currentUserId,
        emojiCode,
      });
      console.log(result);
      return;
    }
    const result = await service.addReaction({
      topicId,
      userId: currentUserId,
      emojiCode,
    });
    console.log(result);
  };

  return (
    <Button
      className={`emoji-button ${isActive && 'emoji-button--active'}`}
      label={String(value)}
      icon={emojiImg}
      key={key}
      onClick={handleEmojiClick}
    />
  );
};
