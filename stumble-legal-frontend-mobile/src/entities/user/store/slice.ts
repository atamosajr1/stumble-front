import { UserAuth } from '@appello/services/dist/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { resetStore } from '~/app/store';

import { UserProfileModel } from '../model';
import { UserState } from './types';

export const initialState: UserState = {
  profile: null,
  auth: null,
  isLogedIn: false,
  isFirstLaunch: null,
  isShowedModal: null,
  range: null,
  hasPermission: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Nullable<UserAuth>>) {
      state.auth = action.payload;
    },
    setUser(state, action: PayloadAction<Nullable<UserProfileModel>>) {
      state.profile = action.payload;
      state.isLogedIn = !!action.payload?.role;
    },

    setIsFirstLaunch(state, action: PayloadAction<Nullable<boolean>>) {
      state.isFirstLaunch = action.payload;
    },
    setIsShowedModal(state, action: PayloadAction<Nullable<boolean>>) {
      state.isShowedModal = action.payload;
    },
    setRange(state, action: PayloadAction<Nullable<string>>) {
      state.range = action.payload;
    },
    setHasPermission(state, action: PayloadAction<Nullable<boolean>>) {
      state.hasPermission = action.payload;
    },
  },
});

export const signOut = createAsyncThunk(`${userSlice.name}/signOut`, async (_, { dispatch }) => {
  dispatch(resetStore());
});

export const userReducer = userSlice.reducer;
export const { setAuth, setUser, setIsFirstLaunch, setIsShowedModal, setRange, setHasPermission } =
  userSlice.actions;
