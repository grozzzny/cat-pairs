import React, { useEffect } from 'react';
import { drawCards } from '@/utils/graw-cards';
import { GameApi } from '@/components';

interface GameFieldProps {
  game: GameApi;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const GameField: React.FC<GameFieldProps> = ({ game, canvasRef }) => {
  const cards = game.getCards();
  const cardImages = game.getCardImages();
  const cardBackImg = game.getCardBackImage();
  useEffect(() => {
    drawCards(canvasRef, cards, cardImages, cardBackImg);
  }, [cards, cardImages, cardBackImg]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    game.handleCardClick(event);
  };

  return <canvas ref={canvasRef} onClick={handleCanvasClick} />;
};
