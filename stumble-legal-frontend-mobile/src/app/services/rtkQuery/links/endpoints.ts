import { rtkQuery } from '..';
import { LinksRequest, LinksResponse } from './types';

const linksRtk = rtkQuery.injectEndpoints({
  endpoints: builder => ({
    getFileUploadUrl: builder.query<LinksResponse, LinksRequest>({
      query: ({ path }) => ({
        url: `api/v1/file-link/${path}`,
        method: 'GET',
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    }),
  }),
  overrideExisting: true,
});

export { linksRtk };

export const { useLazyGetFileUploadUrlQuery } = linksRtk;
