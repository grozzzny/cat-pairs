export const timeFormatConverter = (timeString: string) => {
  if (!timeString) return;

  const date = new Date(timeString);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formatter.format(date);
  }
};
