import { rtkQuery } from '..';
import { TAGS } from '../utils';
import { JobsGetRequest, JobsRequest, JobsResponse } from './types';

const jobsRtk = rtkQuery.injectEndpoints({
  endpoints: builder => ({
    setJobs: builder.mutation<void, JobsRequest>({
      query: data => ({
        url: `api/v1/jobs`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [TAGS.JOBS],
    }),
    deleteJobs: builder.mutation<void, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/jobs/${uuid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.JOBS],
    }),
    getJobs: builder.query<JobsResponse, JobsGetRequest>({
      query: data => ({
        url: `api/v1/jobs`,
        method: 'GET',
        params: data,
      }),
      providesTags: [TAGS.JOBS],
    }),
    updateJobStatus: builder.mutation<
      void,
      { data: { action: string; outcomes?: Nullable<string> }; uuid: string }
    >({
      query: ({ data, uuid }) => ({
        url: `api/v1/jobs/${uuid}/status`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: [TAGS.JOBS],
    }),
  }),
});

export { jobsRtk };

export const {
  useSetJobsMutation,
  useGetJobsQuery,
  useUpdateJobStatusMutation,
  useDeleteJobsMutation,
} = jobsRtk;
