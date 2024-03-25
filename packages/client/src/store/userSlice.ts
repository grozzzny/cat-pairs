import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileFieldType, User } from '../helpers/types/user';
import { UserService } from '@/services/user';
import { Theme } from '@/helpers/constants/global';

type CatPairsState = {
  currentUser: User;
  loading: boolean;
  isPopupOpen: boolean;
  isAvatarPopupOpen: boolean;
  status: null | string;
  error: undefined | string;
  theme: string;
};

const initialState: CatPairsState = {
  currentUser: {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
    login: '',
    avatar: '',
    email: '',
  },
  loading: false,
  isPopupOpen: false,
  isAvatarPopupOpen: false,
  status: null,
  error: undefined,
  theme: Theme.Dark,
};

export const fetchGetCurrentUser = createAsyncThunk<
  string | User | undefined,
  undefined,
  { rejectValue: string }
>('user/fetchGetCurrentUser', async (_, { rejectWithValue }) => {
  const result = await UserService.getCurrentUser();
  if (result?.isOk) {
    return result?.user;
  } else return result?.error && rejectWithValue(result?.error);
});

export const fetchChangeCurrentUser = createAsyncThunk<
  string | User | undefined,
  ProfileFieldType,
  { rejectValue: string }
>('user/fetchChangeCurrentUser', async (params, { rejectWithValue }) => {
  const result = await UserService.changeUser(params);
  if (result?.isOk) {
    return result?.user;
  } else return result?.error && rejectWithValue(result?.error);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleOpenPopup(state, action: PayloadAction<boolean>): void {
      state.isPopupOpen = action.payload;
    },
    toggleOpenAvatarPopup(state, action: PayloadAction<boolean>): void {
      state.isAvatarPopupOpen = action.payload;
    },
    setAvatar(state, action: PayloadAction<string>): void {
      state.currentUser.avatar = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User>): void {
      Object.assign(state.currentUser, action.payload);
    },
    setThemeDark(state): void {
      state.theme = Theme.Dark;
    },
    setThemeLight(state): void {
      state.theme = Theme.Light;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addCase(fetchChangeCurrentUser.fulfilled, (state, action) => {
        Object.assign(state.currentUser, action.payload);
        state.error = undefined;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  toggleOpenPopup,
  toggleOpenAvatarPopup,
  setAvatar,
  setCurrentUser,
  setThemeDark,
  setThemeLight,
} = userSlice.actions;
export default userSlice.reducer;

function isError(action: { type: string }) {
  return action.type.endsWith('rejected');
}
