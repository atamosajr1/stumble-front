---
to: src/app/services/rtkQuery/index.ts
---
import '~/app/services/api';

import { axiosBaseQuery } from '@appello/services/dist/rtkQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const rtkQuery = createApi({
  reducerPath: 'rtkReducer',
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  endpoints: () => ({}),
});
