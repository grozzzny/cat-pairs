import {
  fetchGetCurrentUser,
  fetchGetCurrentUserServer,
  selectUser,
} from '@/store/userSlice';
import { PageInitArgs } from '@/routes';

export const initMainPage = () => Promise.resolve();
export const initNewPasswordPage = () => Promise.resolve();
export const initForumPagePage = () => Promise.resolve();
export const initForumTopicPage = () => Promise.resolve();
export const initGamePage = () => Promise.resolve();
export const initLeaderboardPage = () => Promise.resolve();
export const initLoginPage = () => Promise.resolve();
export const initPage404 = () => Promise.resolve();
export const initPage500 = () => Promise.resolve();
export const initProfilePage = async ({
  dispatch,
  state,
  ctx,
}: PageInitArgs) => {
  return dispatch(fetchGetCurrentUserServer(ctx));
};
export const initRegistrationPage = () => Promise.resolve();
