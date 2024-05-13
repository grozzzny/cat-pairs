import { ForumTopicReactionDto } from '../types';

// TODO: удалить файл после подключения API
export const FORUM_TOPICS_LIST = [
  {
    id: 1,
    title: 'Новые игры',
    description:
      'Здесь обсуждаются свежие релизы и готовящиеся к выходу новинки',
    feed: [
      {
        messageId: 1,
        name: 'Вася',
        text: 'План на вечер: построить город в мире киберпанка! В Steam вышла демка Dystopika — градостроительного симулятора мегаполисов будущего. Строим небоскребы, ставим неоновые вывески, добавляем туман и создаем атмосферу под приятную музыку. Самое то, чтобы отдохнуть.',
        time: '17:58',
      },
      {
        messageId: 2,
        name: 'Петя',
        text: 'Это убийца The Sims из Кореи — новый реалистичный симулятор жизни inZOI делают на Unreal Engine 5. Тут есть современный графон, детали, персонажи, любые возможности и полноценная симуляция реального мира.',
        time: '17:58',
      },
      {
        messageId: 3,
        name: 'John Doe',
        text: 'Просто ещё одно сообщение',
        time: '17:58',
      },
    ],
    messages: '345',
  },
  {
    id: 2,
    title: 'Технологии',
    description: '',
    feed: [],
    messages: '14',
  },
  {
    id: 3,
    title: 'Геймдизайнеры',
    description: '',
    feed: [],
    messages: '222',
  },
];

export const FORUM_REACTIONS_LIST: ForumTopicReactionDto[] = [
  {
    id: 1,
    emojiId: 1,
    commentId: 1,
    createdAt: '2024-05-13T20:48:35.115Z',
    updatedAt: '2024-05-13T20:48:35.115Z',
    userId: 290,
    emoji: { id: 1, emojiCode: 'grin' },
  },
  {
    id: 2,
    emojiId: 2,
    commentId: 1,
    createdAt: '2024-05-13T20:48:35.115Z',
    updatedAt: '2024-05-13T20:48:35.115Z',
    userId: 289,
    emoji: { id: 2, emojiCode: 'cry' },
  },
  {
    id: 3,
    emojiId: 3,
    commentId: 1,
    createdAt: '2024-05-13T20:48:35.115Z',
    updatedAt: '2024-05-13T20:48:35.115Z',
    userId: 290,
    emoji: { id: 3, emojiCode: 'pout' },
  },
  {
    id: 4,
    emojiId: 4,
    commentId: 1,
    createdAt: '2024-05-13T20:48:35.115Z',
    updatedAt: '2024-05-13T20:48:35.115Z',
    userId: 290,
    emoji: { id: 4, emojiCode: 'smile' },
  },
  {
    id: 5,
    emojiId: 3,
    commentId: 1,
    createdAt: '2024-05-13T20:48:35.115Z',
    updatedAt: '2024-05-13T20:48:35.115Z',
    userId: 291,
    emoji: { id: 3, emojiCode: 'pout' },
  },
];
