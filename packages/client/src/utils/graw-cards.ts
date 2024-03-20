import {
  CARD_BORDER_RADIUS,
  CARD_SPACING,
  GAME_FIELD_SIZE,
  MAX_CARDS_LINE,
} from '@/components/game/constants';
import { calculateCardSize } from '@/utils/game-helpers';
import { Card } from '@/components/game/types';
import React from 'react';

const drawCard = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  img: HTMLImageElement,
  cardSize: number,
  cardBackImg: HTMLImageElement | null, // Added cardBackImg parameter
  flipped: boolean
) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + CARD_BORDER_RADIUS, y);
  ctx.arcTo(x + cardSize, y, x + cardSize, y + cardSize, CARD_BORDER_RADIUS);
  ctx.arcTo(x + cardSize, y + cardSize, x, y + cardSize, CARD_BORDER_RADIUS);
  ctx.arcTo(x, y + cardSize, x, y, CARD_BORDER_RADIUS);
  ctx.arcTo(x, y, x + cardSize, y, CARD_BORDER_RADIUS);
  ctx.clip();

  if (!flipped && cardBackImg) {
    ctx.drawImage(cardBackImg, x, y, cardSize, cardSize);
  } else {
    ctx.drawImage(img, x, y, cardSize, cardSize);
  }
  ctx.restore();
};

export const drawCards = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  cards: Card[],
  cardImages: HTMLImageElement[],
  cardBackImg: HTMLImageElement | null
) => {
  const canvas = canvasRef.current;
  if (!canvas || !cardBackImg) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const numCards = cards.length;
  const columns = Math.min(Math.ceil(Math.sqrt(numCards)), MAX_CARDS_LINE);
  const rows = Math.ceil(numCards / columns);
  const cardSize = calculateCardSize(numCards, CARD_SPACING, GAME_FIELD_SIZE);

  const totalWidth = columns * cardSize + (columns - 1) * CARD_SPACING;
  const totalHeight = rows * cardSize + (rows - 1) * CARD_SPACING;
  const offsetX = (GAME_FIELD_SIZE - totalWidth) / 2;
  const offsetY = (GAME_FIELD_SIZE - totalHeight) / 2;

  canvas.width = GAME_FIELD_SIZE;
  canvas.height = GAME_FIELD_SIZE;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cards.forEach((card, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const x = offsetX + col * (cardSize + CARD_SPACING);
    const y = offsetY + row * (cardSize + CARD_SPACING);
    cards[index].x = x;
    cards[index].y = y;

    drawCard(
      ctx,
      x,
      y,
      card.flipped ? cardImages[card.value - 1] : cardBackImg,
      cardSize,
      cardBackImg,
      card.flipped
    );
  });
};
