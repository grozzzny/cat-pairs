import { useEffect } from 'react';

export const enum Color {
  Dark = '#565A5D',
  Light = '#EFE5CC',
}

export const setPageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
