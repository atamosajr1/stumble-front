import { Api } from '@appello/services/dist/api';

import { API_URL, REFRESH_TOKEN_URL } from '~/app/constants/env';
import { store } from '~/app/store';
import { setAuth, signOut } from '~/entities/user';

Api.initialize({
  apiUrl: API_URL,
  refreshTokenUrl: REFRESH_TOKEN_URL,
  getToken: () => store.getState().user.auth?.access,
  getRefreshToken: () => store.getState().user.auth?.refresh,
  onTokenRefreshSuccess: data =>
    store.dispatch(setAuth({ access: data.accessToken, refresh: data.refreshToken })),
  onTokenRefreshError: () => store.dispatch(signOut()),
});
