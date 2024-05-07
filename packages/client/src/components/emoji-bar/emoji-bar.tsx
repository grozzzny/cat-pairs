import { REACTION_LIST_DEFAULT } from '@/helpers/constants/emoji';
import { useAppSelector } from '@/helpers/hooks/storeHooks';
import {
  EmojiCodes,
  ForumTopicReactionDto,
  ReactionList,
} from '@/helpers/types';
import { ForumService } from '@/services/forum';
import { Flex } from 'antd';
import { useEffect, useState } from 'react';
import { EmojiButton } from '..';

interface EmojiBarProps {
  topicId: number;
}

const mapRawReactions = (
  rawReactions: ForumTopicReactionDto[],
  currentUserId: number
): ReactionList => {
  const reactions = JSON.parse(JSON.stringify(REACTION_LIST_DEFAULT));
  rawReactions.forEach(value => {
    const emojiEntity = reactions[value.emojiCode];
    emojiEntity.emojiNumber += 1;
    emojiEntity.isActive =
      emojiEntity.isActive || value.userId === currentUserId;
  });
  return reactions;
};

export const EmojiBar = ({ topicId }: EmojiBarProps): JSX.Element => {
  const [reactions, setReactions] = useState<ReactionList>();
  const currentUserId = useAppSelector(store => store.user.currentUser.id);
  useEffect(() => {
    const fetchReactions = async () => {
      const service = new ForumService();
      const rawReactions = await service.getReactions({ topicId });
      setReactions(mapRawReactions(rawReactions.data, currentUserId));
    };
    fetchReactions();
  }, []);

  return (
    <Flex gap={4} key={topicId}>
      {reactions &&
        Object.keys(reactions).map(value => (
          <EmojiButton
            key={`${topicId}_${value}`}
            emojiCode={value}
            reactionInfo={reactions[value as EmojiCodes]}
            currentUserId={currentUserId}
            topicId={topicId}
          />
        ))}
    </Flex>
  );
};
