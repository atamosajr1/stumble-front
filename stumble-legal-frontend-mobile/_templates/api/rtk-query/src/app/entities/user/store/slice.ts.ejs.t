---
to: src/entities/user/store/slice.ts
force: true
---
import { UserAuth } from '@appello/services/dist/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { resetStore } from '~/app/store';

import { UserState } from './types';
import { api as userApi } from '../api';
import { UserProfileModel } from '../model';

export const initialState: UserState = {
  profile: null,
  auth: null,
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
    },
  },
  extraReducers(builder) {
    builder.addMatcher(userApi.endpoints.authLogin.matchFulfilled, (state, { payload }) => {
      state.auth = {
        access: payload.accessToken,
        refresh: payload.refreshToken,
      };
    });
  },
});

export const signOut = createAsyncThunk(`${userSlice.name}/signOut`, async (_, { dispatch }) => {
  dispatch(resetStore());
});

export const userReducer = userSlice.reducer;
export const { setAuth, setUser } = userSlice.actions;
