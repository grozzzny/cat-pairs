import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileFieldType, User } from '@/helpers/types';
import { UserService } from '@/services/user';
import { Theme } from '@/helpers/constants/global';
import { userNotAutn } from '@/helpers/constants/store';
import { RootState } from '@/store';
import { PageInitContext } from '@/routes';

type CatPairsState = {
  currentUser: User;
  error: undefined | string;
  theme: string;
};

const initialState: CatPairsState = {
  currentUser: userNotAutn,
  error: undefined,
  theme: Theme.Light,
};

export interface IUserService {
  getCurrentUser(): Promise<User | undefined>;
}

const abortController = new AbortController();
export const fetchGetCurrentUser = createAsyncThunk<
  string | User | PageInitContext | undefined,
  undefined,
  { rejectValue: string }
>('user/fetchGetCurrentUser', async (_, thinkApi) => {
  /*const service: IUserService = thinkApi.extra as IUserService;
  return service.getCurrentUser();*/
  const result = await UserService.getCurrentUser({
    signal: abortController.signal,
  });
  if (result?.isOk) {
    return result?.user;
  }
  return result?.error && thinkApi.rejectWithValue(result?.error);
});

export const fetchGetCurrentUserServer = createAsyncThunk<
  string | User | undefined,
  string,
  { rejectValue: string }
>('user/fetchGetCurrentUserServer', async (ctx, { rejectWithValue }) => {
  const result = await UserService.getCurrentUserWhithCookie(
    { signal: abortController.signal },
    ctx
  );
  if (result?.isOk) {
    return result?.user;
  }
  return result?.error && rejectWithValue(result?.error);
});
export const fetchChangeCurrentUser = createAsyncThunk<
  string | User | undefined,
  ProfileFieldType,
  { rejectValue: string }
>('user/fetchChangeCurrentUser', async (params, { rejectWithValue }) => {
  const result = await UserService.changeUser(params);
  if (result?.isOk) {
    return result?.user;
  }
  return result?.error && rejectWithValue(result?.error);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<string>): void {
      state.currentUser.avatar = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User>): void {
      Object.assign(state.currentUser, action.payload);
    },
    deleteCurrentUser(state): void {
      Object.assign(state.currentUser, userNotAutn);
    },
    setTheme(state, action: PayloadAction<string>): void {
      state.theme = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChangeCurrentUser.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addCase(fetchGetCurrentUserServer.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      });
  },
});

export const { setAvatar, setCurrentUser, setTheme, deleteCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;

function isError(action: { type: string }) {
  return action.type.endsWith('rejected');
}

export const selectUser = (state: RootState) => state.user.currentUser;
