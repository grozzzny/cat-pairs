import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Level, PageWrapper, Timer } from '@/components';
import './game-page.css';

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

const CARD_SPACING = 10;
const CARD_BORDER_RADIUS = 8;
const MAX_CARDS_LINE = 8;
const GAME_FIELD_SIZE = 800;
const THEME = 'light';

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cards, setCards] = useState<
    { value: number; flipped: boolean; x: number; y: number }[]
  >([]);
  const [foundPairs, setFoundPairs] = useState<number[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [initialLevel, setInitialLevel] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [clickDisabled, setClickDisabled] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PRE_GAME);
  const [paused, setPaused] = useState<boolean>(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    Difficulty.EASY
  );

  const cardBackImage = useMemo(
    () => (THEME === 'light' ? 'card-back-light.jpg' : 'card-back-dark.jpg'),
    [THEME]
  );
  const themeColor = useMemo(
    () => (THEME === 'light' ? '#565A5D' : '#EFE5CC'),
    [THEME]
  );
  const levelComponent = useMemo(
    () => <Level level={level} color={themeColor} />,
    [level]
  );

  const calculateCardSize = (numCards: number) => {
    let columns = 2;
    let rows = Math.ceil(numCards / columns);
    while (rows > columns) {
      columns += 2;
      rows = Math.ceil(numCards / columns);
    }

    const totalSpacingHorizontal = (columns - 1) * CARD_SPACING;
    const totalSpacingVertical = (rows - 1) * CARD_SPACING;
    const availableWidth = GAME_FIELD_SIZE - totalSpacingHorizontal;
    const availableHeight = GAME_FIELD_SIZE - totalSpacingVertical;
    const cardWidth = availableWidth / columns;
    const cardHeight = availableHeight / rows;
    return Math.min(cardWidth, cardHeight);
  };

  useEffect(() => {
    const savedLevel = localStorage.getItem('memory_game_level');
    if (savedLevel) {
      setInitialLevel(parseInt(savedLevel));
      setLevel(parseInt(savedLevel));
    }
  }, []);

  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      initGame();
    }
  }, [gameStatus]);

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

  const initGame = () => {
    const numPairs = levelPairCounts[level] || 32;
    const countCards = numPairs * 2;

    const cardValues = Array.from(
      { length: numPairs },
      (_, index) => index + 1
    );
    const gameCards = cardValues.concat(cardValues);
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
      level <= 4
        ? countCards * (selectedDifficulty === Difficulty.EASY ? 4 : 3)
        : countCards * (selectedDifficulty === Difficulty.EASY ? 4 : 3) -
          10 * (level - 4);
    setTimeLeft(Math.round(baseTime / 10) * 10);
    setTimerRunning(true);
  };

  const shuffleCards = (cards: number[]) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  };

  const fillRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
  };

  const drawCard = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    imgSrc: string,
    cardSize: number
  ) => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + CARD_BORDER_RADIUS, y);
      ctx.arcTo(
        x + cardSize,
        y,
        x + cardSize,
        y + cardSize,
        CARD_BORDER_RADIUS
      );
      ctx.arcTo(
        x + cardSize,
        y + cardSize,
        x,
        y + cardSize,
        CARD_BORDER_RADIUS
      );
      ctx.arcTo(x, y + cardSize, x, y, CARD_BORDER_RADIUS);
      ctx.arcTo(x, y, x + cardSize, y, CARD_BORDER_RADIUS);
      ctx.clip();
      ctx.drawImage(img, x, y, cardSize, cardSize);
      ctx.restore();
    };
  };

  const drawCards = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numCards = cards.length;
    const columns = Math.min(Math.ceil(Math.sqrt(numCards)), MAX_CARDS_LINE);
    const rows = Math.ceil(numCards / columns);
    const cardSize = calculateCardSize(numCards);

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

      ctx.fillStyle = `${themeColor}`;
      fillRoundedRect(ctx, x, y, cardSize, cardSize, CARD_BORDER_RADIUS);

      if (!card.flipped && !foundPairs.includes(card.value)) {
        drawCard(ctx, x, y, `images/cards/${cardBackImage}`, cardSize);
      } else if (card.flipped || foundPairs.includes(card.value)) {
        const imgSrc = card.flipped
          ? `images/cards/card-${card.value}.jpg`
          : `images/cards/${cardBackImage}`;
        drawCard(ctx, x, y, imgSrc, cardSize);
      }
    });
  };

  const handleCardClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
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

        if (flippedCards.length === 2) {
          setClickDisabled(true);
          setTimeout(() => {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.value === secondCard.value) {
              setFoundPairs(prevPairs => [...prevPairs, firstCard.value]);
              if (foundPairs.length + 1 === newCards.length / 2) {
                handleGameWon();
              }
            } else {
              newCards.forEach((card, i) => {
                if (card.flipped && !foundPairs.includes(card.value)) {
                  newCards[i].flipped = false;
                }
              });
              setCards(newCards);
            }
            setClickDisabled(false);
          }, 500);
        }
      }
    });
  };

  const handleStartGame = () => {
    setGameStatus(GameStatus.PLAYING);
    setLevel(initialLevel);
    localStorage.setItem('memory_game_level', initialLevel.toString());
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

  const cardSize = calculateCardSize(cards.length);

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
