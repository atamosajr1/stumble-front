import { rtkQuery } from '..';
import { TAGS } from '../utils';
import { Courts, CourtsRequest, CourtsResponse, VisitorsResponse } from './types';

const courtsRtk = rtkQuery.injectEndpoints({
  endpoints: builder => ({
    getCourts: builder.query<CourtsResponse, CourtsRequest | void>({
      query: data => ({
        url: `api/v1/courts`,
        method: 'GET',
        params: {
          types: data?.types ?? undefined,
          levels: data?.levels ?? undefined,
          search: data?.search ?? undefined,
          ...(data?.latitude && data.longitude
            ? {
                'location[0]': data?.latitude,
                'location[1]': data.longitude,
              }
            : {}),
        },
      }),
      providesTags: [TAGS.COURTS],
    }),
    getCourtByUuid: builder.query<Courts, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/courts/${uuid}`,
        method: 'GET',
      }),
      providesTags: [TAGS.COURT],
    }),
    getVisitorsByUuid: builder.query<VisitorsResponse, { uuid?: string; dttm?: string }>({
      query: ({ uuid, dttm }) => ({
        url: `api/v1/courts/${uuid}/visitors?dttm=${dttm}`,
        method: 'GET',
      }),
      providesTags: [TAGS.VISITORS],
    }),
  }),
});

export { courtsRtk };

export const {
  useLazyGetCourtsQuery,
  useGetCourtsQuery,
  useGetVisitorsByUuidQuery,
  useGetCourtByUuidQuery,
} = courtsRtk;
