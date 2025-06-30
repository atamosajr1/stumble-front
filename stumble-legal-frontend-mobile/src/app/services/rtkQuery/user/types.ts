import { UserProfileModel } from '~/entities/user';

import { Courts } from '../courts/types';

export type UserMeRequest = {
  firstName: string;
  lastName: string;
  email: string;
  lawFirm?: Nullable<string>;
  abn?: Nullable<string>;
};

export type UserMeResponse = UserProfileModel;
export type UsersResponse = {
  data: UserProfileModel[];
  total: number;
};

export type SetUserMeResponse = UserProfileModel;

export type SetUserMeRequest = {
  role: string;
  practiceArea: string;
  city: string;
  about?: Nullable<string>;
  isPhoneVisible?: boolean;
  photoKey?: Nullable<string>;
};

export type UserSchedulesResponse = {
  data: Schedules[];
  total: number;
};

export type Schedules = {
  uuid: string;
  court: Courts;
  startDttm: string;
  endDttm: string;
};

export type UserSchedulesRequest = {
  courtUuid: string;
  startDttm: Date;
  endDttm: Date;
};

export type UserRequest = {
  name?: string | null;
  city?: string | null;
  role?: string | null;
  practiceArea?: string | null;
};
