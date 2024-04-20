import * as Pages from '@/pages';
import { AppDispatch, RootState } from './store';
import * as init from '@/helpers/pagesInit';

export type PageInitContext = {
  authCookie?: string;
  uuid?: string;
};

export type PageInitArgs = {
  dispatch: AppDispatch;
  state: RootState;
  ctx: string;
};

export const routes = [
  {
    path: '/',
    element: <Pages.MainPage />,
    index: true,
    fetchData: init.initProfilePage,
  },
  {
    path: '/game',
    element: <Pages.GamePage />,
    fetchData: init.initGamePage,
  },
  {
    path: '/login',
    element: <Pages.LoginPage />,
    fetchData: init.initProfilePage,
  },
  {
    path: '/registration',
    element: <Pages.RegistrationPage />,
    fetchData: init.initRegistrationPage,
  },
  {
    path: '/profile',
    element: <Pages.ProfilePage />,
    fetchData: init.initProfilePage,
  },
  {
    path: '/change-password',
    element: <Pages.NewPassword />,
    fetchData: init.initNewPasswordPage,
  },
  {
    path: '/leaderboard',
    element: <Pages.LeaderboardPage />,
    fetchData: init.initLeaderboardPage,
  },
  {
    path: '/forum',
    element: <Pages.ForumPage />,
    fetchData: init.initForumPagePage,
  },
  {
    path: '/forum/:id',
    element: <Pages.ForumTopicPage />,
    fetchData: init.initForumTopicPage,
  },
  {
    path: '*',
    element: <Pages.Page404 />,
    fetchData: init.initPage404,
  },
];
