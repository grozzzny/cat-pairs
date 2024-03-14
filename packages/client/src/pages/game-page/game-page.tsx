import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Level, PageWrapper, Timer } from '@/components';
import './game-page.css';
import {
  calculateCardSize,
  loadImage,
  shuffleCards,
} from '@/utils/game-helpers';

enum Difficulty {
  EASY = 'easy',
  HARD = 'hard',
}

enum GameStatus {
  PRE_GAME = 'pre-game',
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost',
}

interface Card {
  value: number;
  flipped: boolean;
  x: number;
  y: number;
}

const CARD_SPACING = 10;
const CARD_BORDER_RADIUS = 8;
const MAX_CARDS_LINE = 8;
const GAME_FIELD_SIZE = 800;
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
  const levelComponent = useMemo(
    () => <Level level={level} color={themeColor} />,
    [level]
  );

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

  const drawCard = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    img: HTMLImageElement,
    cardSize: number,
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

  const drawCards = () => {
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
        card.flipped
      );
    });
  };

  const handleCardClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const cardSize = calculateCardSize(
      cards.length,
      CARD_SPACING,
      GAME_FIELD_SIZE
    );
    if (clickDisabled || paused) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

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
    setLevel(initialLevel);
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
    drawCards();
  }, [cards, foundPairs]);

  return (
    <PageWrapper>
      <div className='game-page'>
        {gameStatus === GameStatus.PRE_GAME && (
          <div>
            <h2>Choose Difficulty:</h2>
            <select
              value={selectedDifficulty}
              onChange={e =>
                setSelectedDifficulty(e.target.value as Difficulty)
              }>
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.HARD}>Hard</option>
            </select>
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        )}
        {gameStatus === GameStatus.PLAYING && (
          <div className='game'>
            <div className='game__info-wrapper'>
              {levelComponent}
              <Timer time={timeLeft} color={themeColor} />
            </div>
            <div className='game__wrapper'>
              <div className='game__controls-wrapper'>
                <button onClick={handlePauseGame}>
                  {paused ? 'Resume' : 'Pause'}
                </button>
                <button onClick={handleRestartGame}>Restart</button>
              </div>

              <canvas ref={canvasRef} onClick={handleCardClick} />
            </div>
            <div className='game__exit-wrapper'>
              <button onClick={handleExitGame}>Exit Game</button>
            </div>
          </div>
        )}
        {gameStatus === GameStatus.WON && (
          <div>
            <h2>Congratulations! You won!</h2>
            <button onClick={handleRestartGame}>Continue</button>
          </div>
        )}
        {gameStatus === GameStatus.LOST && (
          <div>
            <h2>Game Over!</h2>
            <button onClick={handleRestartGame}>Play Again</button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
