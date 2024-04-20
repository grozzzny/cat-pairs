import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import { combineReducers } from 'redux';

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState;
  }
}

export const reducer = combineReducers({
  user: userReduser,
});

/*function createStore(service: IUserService) {
  return configureStore({
    reducer,
    preloadedState:
      typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: { extraArgument: service, }
      });
    }
  });
}*/

const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducer>;
export type AppStore = typeof store;
