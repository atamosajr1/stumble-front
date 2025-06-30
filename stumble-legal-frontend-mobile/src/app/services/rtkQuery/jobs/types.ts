import { UserProfileModel } from '~/entities/user';

import { Courts } from '../courts/types';

export type JobsRequest = {
  dttm: string;
  type: string;
  fee: number;
  instructions: Nullable<string>;
  summary: Nullable<string>;
  inAppPayment: boolean;
  associatedToUuid: Nullable<string>;
  courtUuid: string;
  attachments: Nullable<Attachments[]>;
  paymentMethodUuid: Nullable<string>;
};

export type Attachments = {
  key: string;
  name: string;
  size: number;
};

export type JobsResponse = {
  data: Jobs[];
  total: number;
};

export type Jobs = {
  uuid: string;
  dttm: string;
  type: string;
  fee: number;
  instructions: Nullable<string>;
  summary: Nullable<string>;
  inAppPayment: boolean;
  status: string;
  court: Courts;
  associatedFrom: Nullable<UserProfileModel>;
  associatedTo: Nullable<UserProfileModel>;
  isMine: boolean;
};

export type JobsGetRequest = {
  kind: string;
  statuses?: string;
  latitude?: number;
  longitude?: number;
};
