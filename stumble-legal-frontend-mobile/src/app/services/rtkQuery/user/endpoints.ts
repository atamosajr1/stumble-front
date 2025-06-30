import { UserProfileModel } from '~/entities/user';

import { rtkQuery } from '..';
import { TAGS } from '../utils';
import {
  Schedules,
  SetUserMeRequest,
  SetUserMeResponse,
  UserMeRequest,
  UserMeResponse,
  UserRequest,
  UserSchedulesRequest,
  UserSchedulesResponse,
  UsersResponse,
} from './types';

const userRtk = rtkQuery.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<UsersResponse, UserRequest | void>({
      query: data => ({
        url: `api/v1/users`,
        method: 'GET',
        params: data,
      }),
      providesTags: [TAGS.USERS],
    }),
    getUsersByUuid: builder.query<UserProfileModel, { uuid: string }>({
      query: data => ({
        url: `api/v1/users/${data.uuid}`,
        method: 'GET',
      }),
    }),
    getMe: builder.query<UserMeResponse, void>({
      query: data => ({
        url: `api/v1/users/me`,
        method: 'GET',
        data,
      }),
      providesTags: [TAGS.CREATE_ME],
    }),
    createMe: builder.mutation<UserMeResponse, UserMeRequest>({
      query: data => ({
        url: `api/v1/users/me`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [TAGS.CREATE_ME],
    }),
    updateMe: builder.mutation<SetUserMeResponse, SetUserMeRequest>({
      query: data => ({
        url: `api/v1/users/me`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: [TAGS.CREATE_ME],
    }),
    deleteMe: builder.mutation<void, void>({
      query: data => ({
        url: `api/v1/users/me`,
        method: 'DELETE',
        data,
      }),
      invalidatesTags: [TAGS.CREATE_ME],
    }),
    getSchedules: builder.query<UserSchedulesResponse, { date?: string }>({
      query: data => ({
        url: `api/v1/users/me/schedules`,
        method: 'GET',
        params: data,
      }),
      providesTags: [TAGS.SCHEDULES],
    }),
    getSchedulesById: builder.query<Schedules, { uuid?: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/users/me/schedules/${uuid}`,
        method: 'GET',
      }),
    }),
    setSchedules: builder.mutation<void, UserSchedulesRequest>({
      query: data => ({
        url: `api/v1/users/me/schedules`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [TAGS.SCHEDULES],
    }),
    patchSchedules: builder.mutation<void, UserSchedulesRequest & { uuid?: string }>({
      query: ({ uuid, ...data }) => ({
        url: `api/v1/users/me/schedules/${uuid}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [TAGS.SCHEDULES],
    }),
    deleteSchedulesById: builder.mutation<void, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/users/me/schedules/${uuid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.SCHEDULES],
    }),
    setUsersMeCheckIn: builder.mutation<
      void,
      { courtUuid: string; location?: [Nullable<number>, Nullable<number>] }
    >({
      query: data => ({
        url: `api/v1/users/me/check-in`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [TAGS.VISITORS, TAGS.COURT],
    }),
    setUsersMeCheckOut: builder.mutation<void, { courtUuid: string }>({
      query: data => ({
        url: `api/v1/users/me/check-out`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [TAGS.VISITORS, TAGS.COURT],
    }),
    getStripeLink: builder.query<{ detail: string }, void>({
      query: () => ({
        url: `api/v1/users/me/stripe-link`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export { userRtk };

export const {
  useCreateMeMutation,
  useUpdateMeMutation,
  useDeleteMeMutation,
  useLazyGetMeQuery,
  useGetSchedulesQuery,
  useSetSchedulesMutation,
  useGetSchedulesByIdQuery,
  useLazyGetSchedulesByIdQuery,
  useDeleteSchedulesByIdMutation,
  usePatchSchedulesMutation,
  useLazyGetSchedulesQuery,
  useSetUsersMeCheckInMutation,
  useGetUsersQuery,
  useSetUsersMeCheckOutMutation,
  useLazyGetUsersByUuidQuery,
  useGetStripeLinkQuery,
} = userRtk;
