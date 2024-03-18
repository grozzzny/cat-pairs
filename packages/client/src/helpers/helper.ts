import { useEffect } from 'react';

export const setPageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const setBodyScroll = () => {
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'scroll';
      const root = document.getElementById('root');
      if (root) root.style.overflow = 'scroll';
    };
  }, []);
};
