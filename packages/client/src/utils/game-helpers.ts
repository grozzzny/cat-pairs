export const getFormatTime = (time: number): string => {
  return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(
    time % 60
  ).padStart(2, '0')}`;
};

export const shuffleCards = (cards: number[]) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
};

export const calculateCardSize = (
  numCards: number,
  cardSpacing: number,
  gameFieldSize: number
) => {
  let columns = 2;
  let rows = Math.ceil(numCards / columns);
  while (rows > columns) {
    columns += 2;
    rows = Math.ceil(numCards / columns);
  }

  const totalSpacingHorizontal = (columns - 1) * cardSpacing;
  const totalSpacingVertical = (rows - 1) * cardSpacing;
  const availableWidth = gameFieldSize - totalSpacingHorizontal;
  const availableHeight = gameFieldSize - totalSpacingVertical;
  const cardWidth = availableWidth / columns;
  const cardHeight = availableHeight / rows;
  return Math.min(cardWidth, cardHeight);
};

export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};
