import { Card, Difficulty, GameStatus } from '@/components/game/types';
import React from 'react';
import {
  calculateCardSize,
  loadImage,
  shuffleCards,
} from '@/utils/game-helpers';
import {
  CARD_SPACING,
  GAME_FIELD_SIZE,
  LEVEL_PAIR_COUNTS,
  PAIR_CARDS,
} from '@/components/game/constants';
import { drawCards } from '@/utils/graw-cards';
const THEME = 'light';

export class Game {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cards: Card[];
  foundPairs: number[];
  level: number;
  initialLevel: number;
  timeLeft: number;
  timerRunning: boolean;
  clickDisabled: boolean;
  gameStatus: GameStatus;
  paused: boolean;
  selectedDifficulty: Difficulty;
  cardBackImageName: string;
  cardBackImage: HTMLImageElement | null;
  cardImages: HTMLImageElement[];
  constructor(canvasRef: React.RefObject<HTMLCanvasElement>) {
    this.canvasRef = canvasRef;
    this.cards = [];
    this.foundPairs = [];
    this.level = 1;
    this.initialLevel = 1;
    this.timeLeft = 0;
    this.timerRunning = false;
    this.clickDisabled = false;
    this.gameStatus = GameStatus.PRE_GAME;
    this.paused = false;
    this.selectedDifficulty = Difficulty.EASY;
    this.cardBackImageName =
      THEME === 'light' ? 'card-back-light.jpg' : 'card-back-dark.jpg';
    this.cardBackImage = null;
    this.cardImages = [];
    this.initGame();
  }

  componentDidMount() {
    const savedLevel = localStorage.getItem('memory_game_level');
    if (savedLevel) {
      this.initialLevel = parseInt(savedLevel);
      this.level = parseInt(savedLevel);
    }
  }
  private initGame = async () => {
    const numPairs = LEVEL_PAIR_COUNTS[this.level] || 32;
    const countCards = numPairs * PAIR_CARDS;

    try {
      const cardBackImagePromise = loadImage(
        `images/cards/${this.cardBackImageName}`
      );
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

      this.cardBackImage = cardBackImg;
      this.cardImages = cardImgs;

      const gameCards = Array.from(
        { length: numPairs },
        (_, index) => index + 1
      ).flatMap(value => [value, value]);
      shuffleCards(gameCards);

      this.cards = gameCards.map(value => ({
        value,
        flipped: false,
        x: 0,
        y: 0,
      }));

      const baseTime =
        countCards * (this.selectedDifficulty === Difficulty.EASY ? 4 : 3) -
        10 * Math.max(this.level - 4, 0);
      this.timeLeft = Math.round(baseTime / 10) * 10;
      this.timerRunning = true;
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };

  public handleCardClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    // Логика обработки кликов по картам
    const cardSize = calculateCardSize(
      this.cards.length,
      CARD_SPACING,
      GAME_FIELD_SIZE
    );
    if (this.clickDisabled || this.paused) return;

    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.cards.forEach((card, index) => {
      if (
        mouseX >= card.x &&
        mouseX <= card.x + cardSize &&
        mouseY >= card.y &&
        mouseY <= card.y + cardSize
      ) {
        if (this.foundPairs.includes(card.value) || card.flipped) return;

        const newCards = [...this.cards];
        newCards[index].flipped = true;
        this.cards = newCards;

        const flippedCards = newCards.filter(
          card => card.flipped && !this.foundPairs.includes(card.value)
        );

        if (flippedCards.length === PAIR_CARDS) {
          this.clickDisabled = true;
          setTimeout(() => {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.value === secondCard.value) {
              this.foundPairs = [...this.foundPairs, firstCard.value];
              if (this.foundPairs.length + 1 === newCards.length / 2) {
                this.handleGameWon();
              }
            } else {
              this.cards = newCards.map(card => {
                if (card.flipped && !this.foundPairs.includes(card.value)) {
                  return { ...card, flipped: false };
                }
                return card;
              });
            }
            this.clickDisabled = false;
          }, 1000);
        }
      }
    });
  };

  private handleGameWon = () => {
    this.gameStatus = GameStatus.WON;
    this.timerRunning = false;
    const newLevel = this.level + 1;
    this.level = newLevel;
    this.foundPairs = [];
    localStorage.setItem('memory_game_level', newLevel.toString());
  };

  private handleGameOver = () => {
    this.gameStatus = GameStatus.LOST;
    this.timerRunning = false;
  };

  public handlePauseGame = () => {
    this.paused = !this.paused;
    this.timerRunning = !this.timerRunning;
  };
  public handleRestartGame = () => {
    this.paused = false;
    this.initGame();
  };

  public handleExitGame = () => {
    this.gameStatus = GameStatus.PRE_GAME;
    this.timerRunning = false;
    this.timeLeft = 0;
    this.foundPairs = [];
    this.level = this.initialLevel; // Не уверен, нужно ли сбрасывать уровень при выходе из игры, если нет удалить
  };

  public handleStartGame = () => {
    this.gameStatus = GameStatus.PLAYING;
    this.level = this.initialLevel;
    localStorage.setItem('memory_game_level', this.initialLevel.toString());
    this.initGame();
  };
  public getSelectedDifficulty = (): Difficulty => {
    return this.selectedDifficulty;
  };

  public setSelectedDifficulty = (selectedValue: Difficulty) => {
    this.selectedDifficulty = selectedValue;
  };
  public getLevel = () => {
    return this.level;
  };
  public getTimeLeft = () => {
    return this.timeLeft;
  };
  public getPaused = () => {
    return this.paused;
  };
  public getCards = () => {
    return this.cards;
  };
  public getCardImages = () => {
    return this.cardImages;
  };
  public getCardBackImage = () => {
    return this.cardBackImage;
  };

  private drawCardsOnCanvas() {
    drawCards(this.canvasRef, this.cards, this.cardImages, this.cardBackImage);
  }
}
