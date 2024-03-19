import { useEffect } from 'react';

export const setPageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} — Cat Pairs`;
  }, [title]);
};
