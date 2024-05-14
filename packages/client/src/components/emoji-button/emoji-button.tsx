import { EMOJI } from '@/helpers/constants/emoji';
import { EmojiCodes, ReactionInfo } from '@/helpers/types';
import { ForumService } from '@/services/forum';
import { useEffect, useState } from 'react';
import { Button } from '..';
import './emoji-button.css';

interface EmojiButtonProps {
  emojiCode: string;
  reactionInfo: ReactionInfo;
  commentId: number;
}

export const EmojiButton = ({
  emojiCode,
  reactionInfo,
  commentId,
}: EmojiButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [emojiNumber, setEmojiNumber] = useState(0);
  const key = emojiCode as EmojiCodes;
  const emojiEntity = EMOJI[key];
  const emojiImg = <img src={emojiEntity.avatarHref} alt={key} />;
  const { emojiNumber: initialEmojiNumber, isActive: initialIsActive } =
    reactionInfo;
  const service = new ForumService();
  const value = emojiNumber || '';

  const addReaction = () => {
    setIsActive(true);
    setEmojiNumber(prevState => prevState + 1);
  };

  const deleteReaction = () => {
    setIsActive(false);
    setEmojiNumber(prevState => prevState - 1);
  };

  useEffect(() => {
    setIsActive(initialIsActive);
    setEmojiNumber(initialEmojiNumber);
  }, [initialIsActive, initialEmojiNumber]);

  const handleEmojiClick = async () => {
    if (isActive) {
      const result = await service.deleteReaction({
        commentId,
        emojiId: emojiEntity.id,
      });
      deleteReaction();
      console.log(result);
      return;
    }
    const result = await service.addReaction({
      commentId,
      emojiId: emojiEntity.id,
    });
    addReaction();
    console.log(result);
  };

  return (
    <Button
      className={`emoji-button ${isActive && 'emoji-button--active'}`}
      label={String(value)}
      icon={emojiImg}
      onClick={handleEmojiClick}
    />
  );
};
