---
to: src/app/store/rootReducer.ts
force: true
---
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { createTransform, persistReducer } from 'redux-persist';

import { rtkQuery } from '~/app/services/rtkQuery';
import { userReducer } from '~/entities/user';

import { resetStore } from './actions';

const transforms = [
  createTransform(
    state => JSON.stringify(state),
    state =>
      JSON.parse(state, (key, value) =>
        typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
          ? new Date(value)
          : value,
      ),
  ),
];

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  transforms,
};

const appReducer = combineReducers({
  user: userReducer,
  [rtkQuery.reducerPath]: rtkQuery.reducer,
});

const reducer: typeof appReducer = (state, action) => {
  if (action.type === resetStore.toString()) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const rootReducer = persistReducer<ReturnType<typeof reducer>>(rootPersistConfig, reducer);
