import { REACTION_LIST_DEFAULT } from '@/helpers/constants/emoji';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import { ForumTopicReactionDto, ReactionList } from '@/helpers/types';
import { ForumService } from '@/services/forum';
import { Flex } from 'antd';
import { useEffect, useState } from 'react';
import { EmojiButton } from '..';

interface EmojiBarProps {
  commentId: number;
}

const mapRawReactions = (
  rawReactions: ForumTopicReactionDto[],
  currentUserId: number
): ReactionList => {
  const reactions = structuredClone(REACTION_LIST_DEFAULT);
  rawReactions.forEach(value => {
    const emojiEntity = reactions[value.emoji.emojiCode];
    emojiEntity.emojiNumber += 1;
    emojiEntity.isActive =
      emojiEntity.isActive || value.userId === currentUserId;
  });
  return reactions;
};

export const EmojiBar = ({ commentId }: EmojiBarProps): JSX.Element => {
  const [reactions, setReactions] = useState<ReactionList>(
    REACTION_LIST_DEFAULT
  );
  const currentUserId = useAppSelector(store => store.user.currentUser.id);
  useEffect(() => {
    const service = new ForumService();
    service
      .getReactions({ commentId })
      .then(rawReactions => {
        setReactions(mapRawReactions(rawReactions, currentUserId));
      })
      .catch(() => {
        setReactions(REACTION_LIST_DEFAULT);
      });
    return () => {
      service.api.abortController.abort();
    };
  }, []);

  return (
    <Flex gap={4}>
      {Object.entries(reactions).map(([key, value]) => (
        <EmojiButton
          key={key}
          emojiCode={key}
          reactionInfo={value}
          commentId={commentId}
        />
      ))}
    </Flex>
  );
};
