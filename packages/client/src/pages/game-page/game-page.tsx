import { Level, PageWrapper, Timer } from '@/components';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const CARD_SIZE = 180;
const CARD_SPACING = 20;
const CARD_BORDER_RADIUS = 8;
const THEME = 'light';

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cards, setCards] = useState<{ value: number; flipped: boolean }[]>([]);
  const [foundPairs, setFoundPairs] = useState<number[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [initialLevel, setInitialLevel] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [clickDisabled, setClickDisabled] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<string>('pre-game');
  const [paused, setPaused] = useState<boolean>(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('easy');

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

  useEffect(() => {
    const savedLevel = localStorage.getItem('memory_game_level');
    if (savedLevel) {
      setInitialLevel(parseInt(savedLevel));
      setLevel(parseInt(savedLevel));
    }
  }, []);

  useEffect(() => {
    if (gameStatus === 'playing') {
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

  const initGame = () => {
    const size = level * 2;
    const cardValues = Array.from(
      { length: size / 2 },
      (_, index) => index + 1
    );
    const gameCards = cardValues.concat(cardValues);
    shuffleCards(gameCards);
    setCards(gameCards.map(value => ({ value, flipped: false })));

    const baseTime = size * (selectedDifficulty === 'easy' ? 4 : 3);
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
    imgSrc: string
  ) => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + CARD_BORDER_RADIUS, y);
      ctx.arcTo(
        x + CARD_SIZE,
        y,
        x + CARD_SIZE,
        y + CARD_SIZE,
        CARD_BORDER_RADIUS
      );
      ctx.arcTo(
        x + CARD_SIZE,
        y + CARD_SIZE,
        x,
        y + CARD_SIZE,
        CARD_BORDER_RADIUS
      );
      ctx.arcTo(x, y + CARD_SIZE, x, y, CARD_BORDER_RADIUS);
      ctx.arcTo(x, y, x + CARD_SIZE, y, CARD_BORDER_RADIUS);
      ctx.clip();
      ctx.drawImage(img, x, y, CARD_SIZE, CARD_SIZE);
      ctx.restore();
    };
  };

  const drawCards = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const numRows = Math.ceil(cards.length / level);
    const canvasWidth = level * CARD_SIZE + (level - 1) * CARD_SPACING;
    const canvasHeight = numRows * CARD_SIZE + (numRows - 1) * CARD_SPACING;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cards.forEach((card, index) => {
      const row = Math.floor(index / level);
      const col = index % level;
      const x = col * (CARD_SIZE + CARD_SPACING);
      const y = row * (CARD_SIZE + CARD_SPACING);
      ctx.fillStyle = `${themeColor}`;
      fillRoundedRect(ctx, x, y, CARD_SIZE, CARD_SIZE, CARD_BORDER_RADIUS);
      if (!card.flipped && !foundPairs.includes(card.value)) {
        drawCard(ctx, x, y, `images/cards/${cardBackImage}`);
      } else if (card.flipped || foundPairs.includes(card.value)) {
        const imgSrc = card.flipped
          ? `images/cards/card-${card.value}.jpg`
          : `images/cards/${cardBackImage}`;
        drawCard(ctx, x, y, imgSrc);
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

    // Находим индекс карточки по координатам клика
    const col = Math.floor(mouseX / (CARD_SIZE + CARD_SPACING));
    const row = Math.floor(mouseY / (CARD_SIZE + CARD_SPACING));
    const clickedIndex = row * level + col;

    // Если клик произошел в пределах отступа, игнорируем его
    const withinCardAreaX =
      mouseX >= col * (CARD_SIZE + CARD_SPACING) &&
      mouseX <= (col + 1) * CARD_SIZE + col * CARD_SPACING;
    const withinCardAreaY =
      mouseY >= row * (CARD_SIZE + CARD_SPACING) &&
      mouseY <= (row + 1) * CARD_SIZE + row * CARD_SPACING;
    if (!withinCardAreaX || !withinCardAreaY) return;
    if (foundPairs.includes(cards[clickedIndex].value)) {
      return;
    }

    const newCards = [...cards];
    newCards[clickedIndex].flipped = true;
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
      }, 1000);
    }
  };

  const handleStartGame = () => {
    setGameStatus('playing');
    setLevel(initialLevel);
    localStorage.setItem('memory_game_level', initialLevel.toString());
  };
  const handlePauseGame = () => {
    setPaused(prevPaused => !prevPaused);
    setTimerRunning(prevTimerRunning => !prevTimerRunning);
  };

  const handleRestartGame = () => {
    setPaused(false);
    setGameStatus('playing');
    setFoundPairs([]);
    initGame();
  };

  const handleExitGame = () => {
    setGameStatus('pre-game');
    setTimerRunning(false);
    setLevel(initialLevel);
    setTimeLeft(0);
    setFoundPairs([]);
  };

  const handleGameWon = () => {
    setGameStatus('won');
    setTimerRunning(false);
    const newLevel = level + 1;
    setLevel(newLevel);
    setFoundPairs([]);
    localStorage.setItem('memory_game_level', newLevel.toString());
  };

  const handleGameOver = () => {
    setGameStatus('lost');
    setTimerRunning(false);
  };

  useEffect(() => {
    drawCards();
  }, [cards, foundPairs]);

  return (
    <PageWrapper>
      <div>
        {gameStatus === 'pre-game' && (
          <div>
            <h2>Choose Difficulty:</h2>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}>
              <option value='easy'>Easy</option>
              <option value='hard'>Hard</option>
            </select>
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        )}
        {gameStatus === 'playing' && (
          <div
            style={{
              display: 'flex',
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                minWidth: '100px',
              }}>
              {levelComponent}
              <Timer time={timeLeft} color={themeColor} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <button onClick={handlePauseGame}>
                  {paused ? 'Resume' : 'Pause'}
                </button>
                <button onClick={handleRestartGame}>Restart</button>
              </div>

              <canvas ref={canvasRef} onClick={handleCardClick} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'end',
              }}>
              <button onClick={handleExitGame}>Exit Game</button>
            </div>
          </div>
        )}
        {gameStatus === 'won' && (
          <div>
            <h2>Congratulations! You won!</h2>
            <button onClick={handleRestartGame}>Continue</button>
          </div>
        )}
        {gameStatus === 'lost' && (
          <div>
            <h2>Game Over!</h2>
            <button onClick={handleRestartGame}>Play Again</button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
