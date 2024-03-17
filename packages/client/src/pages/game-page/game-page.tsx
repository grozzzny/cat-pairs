import React, { useEffect, useRef, useState } from 'react';
import {
  GameControls,
  GameField,
  GameInfo,
  GameStartScreen,
  PageWrapper,
} from '@/components';
import './game-page.css';

import { Card, Difficulty, GameStatus } from '@/components/game/types';

import { GameEndScreen } from '@/components/game/game-end-screen/game-end-screen';
import {
  calculateCardSize,
  loadImage,
  shuffleCards,
} from '@/utils/game-helpers';
import { CARD_SPACING, GAME_FIELD_SIZE } from '@/components/game/constants';
import { drawCards } from '@/utils/graw-cards';

const THEME = 'light';
const PAIR_CARDS = 2;

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [foundPairs, setFoundPairs] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [initialLevel, setInitialLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PRE_GAME);
  const [paused, setPaused] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    Difficulty.EASY
  );

  const cardBackImage =
    THEME === 'light' ? 'card-back-light.jpg' : 'card-back-dark.jpg';
  const themeColor = THEME === 'light' ? '#565A5D' : '#EFE5CC';

  const [cardBackImg, setCardBackImg] = useState<HTMLImageElement | null>(null);
  const [cardImages, setCardImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const savedLevel = localStorage.getItem('memory_game_level');
    if (savedLevel) {
      setInitialLevel(parseInt(savedLevel));
      setLevel(parseInt(savedLevel));
    }
  }, []);

  useEffect(() => {
    if (timerRunning && timeLeft === 0) {
      handleGameOver();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timerRunning) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, timerRunning]);

  const levelPairCounts: { [key: number]: number } = {
    1: 3,
    2: 8,
    3: 18,
  };

  const initGame = async () => {
    const numPairs = levelPairCounts[level] || 32;
    const countCards = numPairs * PAIR_CARDS;

    try {
      const cardBackImagePromise = loadImage(`images/cards/${cardBackImage}`);
      const cardImagesPromises = Array.from(
        { length: numPairs },
        (_, index) => {
          return loadImage(`images/cards/card-${index + 1}.jpg`);
        }
      );

      const [cardBackImg, ...cardImgs] = await Promise.all([
        cardBackImagePromise,
        ...cardImagesPromises,
      ]);

      setCardBackImg(cardBackImg);
      setCardImages(cardImgs);

      const gameCards = Array.from(
        { length: numPairs },
        (_, index) => index + 1
      ).flatMap(value => [value, value]);
      shuffleCards(gameCards);

      setCards(
        gameCards.map(value => ({
          value,
          flipped: false,
          x: 0,
          y: 0,
        }))
      );

      const baseTime =
        countCards * (selectedDifficulty === Difficulty.EASY ? 4 : 3) -
        10 * Math.max(level - 4, 0);
      setTimeLeft(Math.round(baseTime / 10) * 10);
      setTimerRunning(true);
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };

  const handleCardClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const cardSize = calculateCardSize(
      cards.length,
      CARD_SPACING,
      GAME_FIELD_SIZE
    );
    if (clickDisabled || paused) return;

    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    cards.forEach((card, index) => {
      if (
        mouseX >= card.x &&
        mouseX <= card.x + cardSize &&
        mouseY >= card.y &&
        mouseY <= card.y + cardSize
      ) {
        if (foundPairs.includes(card.value) || card.flipped) return;

        const newCards = [...cards];
        newCards[index].flipped = true;
        setCards(newCards);

        const flippedCards = newCards.filter(
          card => card.flipped && !foundPairs.includes(card.value)
        );

        if (flippedCards.length === PAIR_CARDS) {
          setClickDisabled(true);
          setTimeout(() => {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.value === secondCard.value) {
              setFoundPairs(prevPairs => [...prevPairs, firstCard.value]);
              if (foundPairs.length + 1 === newCards.length / 2) {
                handleGameWon();
              }
            } else {
              const resetCards = newCards.map(card => {
                if (card.flipped && !foundPairs.includes(card.value)) {
                  return { ...card, flipped: false };
                }
                return card;
              });
              setCards(resetCards);
            }
            setClickDisabled(false);
          }, 1000);
        }
      }
    });
  };

  const handleStartGame = () => {
    setGameStatus(GameStatus.PLAYING);
    setLevel(initialLevel);
    localStorage.setItem('memory_game_level', initialLevel.toString());
    initGame();
  };

  const handlePauseGame = () => {
    setPaused(prevPaused => !prevPaused);
    setTimerRunning(prevTimerRunning => !prevTimerRunning);
  };

  const handleRestartGame = () => {
    setPaused(false);
    setGameStatus(GameStatus.PLAYING);
    setFoundPairs([]);
    initGame();
  };

  const handleExitGame = () => {
    setGameStatus(GameStatus.PRE_GAME);
    setTimerRunning(false);
    // setLevel(initialLevel); сброс уровня на начальный при выходе
    setTimeLeft(0);
    setFoundPairs([]);
  };

  const handleGameWon = () => {
    setGameStatus(GameStatus.WON);
    setTimerRunning(false);
    const newLevel = level + 1;
    setLevel(newLevel);
    setFoundPairs([]);
    localStorage.setItem('memory_game_level', newLevel.toString());
  };

  const handleGameOver = () => {
    setGameStatus(GameStatus.LOST);
    setTimerRunning(false);
  };

  useEffect(() => {
    drawCards(canvasRef, cards, cardImages, cardBackImg);
  }, [cards, foundPairs]);

  return (
    <PageWrapper>
      <div className='game-page'>
        {gameStatus === GameStatus.PRE_GAME && (
          <GameStartScreen
            selectedDifficulty={selectedDifficulty}
            onStartGame={handleStartGame}
            onDifficultyChange={setSelectedDifficulty}
          />
        )}
        {gameStatus === GameStatus.PLAYING && (
          <div className='game'>
            <GameInfo
              level={level}
              timeLeft={timeLeft}
              themeColor={themeColor}
            />
            <div className='game__wrapper'>
              <GameControls
                paused={paused}
                handlePauseGame={handlePauseGame}
                handleRestartGame={handleRestartGame}
              />
              <GameField
                cards={cards}
                cardImages={cardImages}
                cardBackImg={cardBackImg}
                onCardClick={handleCardClick}
              />
            </div>
            <div className='game__exit-wrapper'>
              <button onClick={handleExitGame}>Exit Game</button>
            </div>
          </div>
        )}
        {gameStatus === GameStatus.WON && (
          <GameEndScreen status='WON' onRestartGame={handleRestartGame} />
        )}
        {gameStatus === GameStatus.LOST && (
          <GameEndScreen status='LOST' onRestartGame={handleRestartGame} />
        )}
      </div>
    </PageWrapper>
  );
};
