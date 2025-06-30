import { createSelector, Selector } from '@reduxjs/toolkit';

import { RootState } from '~/app/store/types';
import { UserState } from '~/entities/user/store/types';

export const selectUser: Selector<RootState, UserState> = state => state.user;

export const selectIsAuth = createSelector(selectUser, state => !!state.auth);
export const selectIsProfile = createSelector(selectUser, state => !!state.profile);
export const selectIsLoged = createSelector(selectUser, state => state.isLogedIn);
export const selectIsFirstLaunch = createSelector(selectUser, state => state.isFirstLaunch);
export const selectorGetRange = createSelector(selectUser, state => state.range);
export const selectorHasPErmission = createSelector(selectUser, state => state.hasPermission);

export const selectProfile = createSelector(selectUser, state => {
  if (!state.profile) {
    throw new Error('User is not authenticated');
  }

  return state.profile;
});
