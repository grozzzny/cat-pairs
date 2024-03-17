import React, { useEffect, useRef } from 'react';
import { drawCards } from '@/utils/graw-cards';
import { Card } from '@/components/game/types';

interface GameFieldProps {
  cards: Card[];
  cardImages: HTMLImageElement[];
  cardBackImg: HTMLImageElement | null;
  onCardClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

export const GameField: React.FC<GameFieldProps> = ({
  cards,
  cardImages,
  cardBackImg,
  onCardClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawCards(canvasRef, cards, cardImages, cardBackImg);
  }, [cards, cardImages, cardBackImg]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    onCardClick(event);
  };

  return <canvas ref={canvasRef} onClick={handleCanvasClick} />;
};
