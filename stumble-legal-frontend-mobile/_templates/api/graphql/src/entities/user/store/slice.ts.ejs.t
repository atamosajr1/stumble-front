---
to: src/entities/user/store/slice.ts
force: true
---
import { UserAuth } from '@appello/services/dist/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { gqlClient } from '~/app/services/gql';
import { resetStore } from '~/app/store';

import { UserProfileModel } from '../model';
import { UserState } from './types';

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
});

export const signOut = createAsyncThunk(`${userSlice.name}/signOut`, async (_, { dispatch }) => {
  dispatch(resetStore());
  await gqlClient.resetStore();
});

export const userReducer = userSlice.reducer;
export const { setAuth, setUser } = userSlice.actions;
