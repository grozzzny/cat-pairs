import { useEffect } from 'react';

export const setPageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const setBodyScroll = () => {
  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'auto';
      const root = document.getElementById('root');
      if (root) root.style.overflowY = 'auto';
    };
  }, []);
};
