import { useEffect } from 'react';

export const setPageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} — Cat Pairs`;
  }, [title]);
};

export const localStorageGetItem = (key: string) => {
  try {
    localStorage.getItem(key);
  } catch (e) {
    return undefined;
  }
};

export const localStorageSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    return undefined;
  }
};
