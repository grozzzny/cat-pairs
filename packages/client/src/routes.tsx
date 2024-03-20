import * as Pages from '@/pages';

export const routes = [
  {
    path: '/',
    element: <Pages.MainPage />,
    index: true,
  },
  {
    path: '/game',
    element: <Pages.GamePage />,
  },
  {
    path: '/login',
    element: <Pages.LoginPage />,
  },
  {
    path: '/registration',
    element: <Pages.RegistrationPage />,
  },
  {
    path: '/profile',
    element: <Pages.ProfilePage />,
  },
  {
    path: '/change-password',
    element: <Pages.NewPassword />,
  },
  {
    path: '/leaderboard',
    element: <Pages.LeaderboardPage />,
  },
  {
    path: '/forum',
    element: <Pages.ForumPage />,
  },
  {
    path: '/forum/:id',
    element: <Pages.ForumPage />,
  },
  {
    path: '/gameover',
    element: <Pages.GameOverPage />,
  },
  {
    path: '*',
    element: <Pages.Page404 />,
  },
];
