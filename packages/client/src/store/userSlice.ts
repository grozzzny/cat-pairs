import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../helpers/types/user';
import { UserService } from '@/services/user';

type CatPairsState = {
  currentUser: User;
  loading: boolean;
  isPopupOpen: boolean;
  isAvatarPopupOpen: boolean;
  status: null | string;
  error: null | string;
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
  error: null,
};

export const fetchGetCurrentUser = createAsyncThunk(
  'user/fetchGetCurrentUser',
  async () => {
    const result = await UserService.getCurrentUser();
    if (result?.isOk) {
      return result?.user;
    }
  }
);

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
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
      // Add user to the state array
      Object.assign(state.currentUser, action.payload);
    });
  },
  /*extraReducers: {
    [fetchGetCurrentUser.pending]: (state, action) => {
      state.status = 'loading',
        state.error = null
    }
    [fetchGetCurrentUser.fulfilled]: (state, action) => {
      state.status = 'resolved',
        state.currentUser = action.payload;
    }
    [fetchGetCurrentUser.rejected]: (state, action) => { }
  }*/
});

export const { toggleOpenPopup, toggleOpenAvatarPopup } = userSlice.actions;
export default userSlice.reducer;
