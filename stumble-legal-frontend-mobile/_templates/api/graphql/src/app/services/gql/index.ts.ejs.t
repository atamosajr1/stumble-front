---
to: src/app/services/gql/index.ts
---
import { createGqlClient, GqlClientContext } from '@appello/services/dist/gql';
import { showMessage } from 'react-native-flash-message';

import { API_URL } from '~/app/constants/env';
import { store } from '~/app/store';
import { setAuth, signOut } from '~/entities/user';

import fragmentTypes from './__generated__/fragmentTypes.json';
import {
  RefreshTokensDocument,
  RefreshTokensMutation,
  RefreshTokensMutationVariables,
} from './__generated__/schema';

export const gqlClient = createGqlClient({
  serverUrl: API_URL,
  cache: {
    possibleTypes: fragmentTypes.possibleTypes,
  },
  getRefreshToken: () => store.getState().user.auth?.refresh,
  getAccessToken: () => store.getState().user.auth?.access,
  refreshTokens: async (client, context) => {
    const refreshToken = store.getState().user.auth?.refresh;
    if (!refreshToken) {
      return null;
    }

    const { data } = await client.mutate<
      RefreshTokensMutation,
      RefreshTokensMutationVariables,
      GqlClientContext
    >({
      mutation: RefreshTokensDocument,
      variables: {
        input: { refreshToken },
      },
      context,
    });

    return data?.tokens ?? null;
  },
  onTokenRefreshSuccess: data => store.dispatch(setAuth(data)),
  onTokenRefreshError: () => store.dispatch(signOut()),
  onUnknownError: message => showMessage({ type: 'danger', message }),
});

export * from './__generated__/globalTypes';
export * from './__generated__/schema';
