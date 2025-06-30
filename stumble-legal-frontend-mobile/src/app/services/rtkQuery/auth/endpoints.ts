import { rtkQuery } from '..';
import { TAGS } from '../utils';
import { LoginRequest, OTPRequest, OTPResponse } from './types';
import { LoginResponse } from './types';

const authRtk = rtkQuery.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: data => ({
        url: `api/v1/auth/login`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [TAGS.GET_ME],
    }),
    getOtp: builder.query<OTPResponse, OTPRequest>({
      query: data => ({
        url: `api/v1/auth/login`,
        method: 'GET',
        params: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useLazyGetOtpQuery } = authRtk;
