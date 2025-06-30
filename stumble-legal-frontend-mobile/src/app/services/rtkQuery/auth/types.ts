import { UserProfileModel } from '~/entities/user';

export type LoginRequest = {
  phoneNumber: string;
  otp: string;
};

export type LoginResponse = {
  user: UserProfileModel;
  accessToken: string;
  refreshToken: string;
};

export type OTPRequest = {
  phone: string;
};

export type OTPResponse = {
  detail: string;
};
