import { useEffect } from 'react';
import { useAppDispatch, useAppStore } from '@/helpers/hooks/storeHooks';

import { PageInitArgs, PageInitContext } from '@/routes';

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>;
};

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  useEffect(() => {
    initPage({
      dispatch,
      state: store.getState(),
      ctx: 'authCookie=9dcb9dfeafba539f96e3eb557daceedae7b8d8e2%3A1713635124; uuid=f3861c03-f3a7-4cf9-a811-9f3feb8ddb79;',
    });
  }, []);
};
