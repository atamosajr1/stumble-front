---
to: src/features/auth/api/_generated/index.ts
---
import { rtkQuery as api } from '../../../../app/services/rtkQuery/index';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    authSignup: build.mutation<AuthSignupApiResponse, AuthSignupApiArg>({
      query: queryArg => ({
        url: `/api/v1/auth/signup`,
        method: 'POST',
        body: queryArg.signUpInput,
      }),
    }),
    authOtpRequest: build.mutation<AuthOtpRequestApiResponse, AuthOtpRequestApiArg>({
      query: queryArg => ({
        url: `/api/v1/auth/otp-request`,
        method: 'POST',
        body: queryArg.otpRequestInput,
      }),
    }),
    authLogin: build.mutation<AuthLoginApiResponse, AuthLoginApiArg>({
      query: queryArg => ({
        url: `/api/v1/auth/login`,
        method: 'POST',
        body: queryArg.signInInput,
      }),
    }),
    authTokenRefresh: build.mutation<AuthTokenRefreshApiResponse, AuthTokenRefreshApiArg>({
      query: queryArg => ({
        url: `/api/v1/auth/token/refresh`,
        method: 'POST',
        body: queryArg.tokenInput,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type AuthSignupApiResponse = /** status 201 Successful Response */ any;
export type AuthSignupApiArg = {
  signUpInput: SignUpInput;
};
export type AuthOtpRequestApiResponse = /** status 200 Successful Response */ any;
export type AuthOtpRequestApiArg = {
  otpRequestInput: OtpRequestInput;
};
export type AuthLoginApiResponse = /** status 200 Successful Response */ LoginSuccess;
export type AuthLoginApiArg = {
  signInInput: SignInInput;
};
export type AuthTokenRefreshApiResponse = /** status 200 Successful Response */ LoginSuccess;
export type AuthTokenRefreshApiArg = {
  tokenInput: TokenInput;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type UserTestAnswerInput = {
  questionId: string;
  optionId?: string;
  textAnswer?: string;
};
export type SignUpInput = {
  phone: string;
  firstName: string;
  testAnswers: UserTestAnswerInput[];
};
export type OtpRequestInput = {
  phone: string;
};
export type LoginSuccess = {
  accessToken: string;
  refreshToken: string;
};
export type SignInInput = {
  phone: string;
  otp: string;
};
export type TokenInput = {
  token: string;
};
export const {
  useAuthSignupMutation,
  useAuthOtpRequestMutation,
  useAuthLoginMutation,
  useAuthTokenRefreshMutation,
} = injectedRtkApi;
