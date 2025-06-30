import '~/app/services/api';

import { axiosBaseQuery } from '@appello/services/dist/rtkQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

import { TAGS } from './utils';

export const rtkQuery = createApi({
  reducerPath: 'rtkReducer',
  baseQuery: axiosBaseQuery(),
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});
