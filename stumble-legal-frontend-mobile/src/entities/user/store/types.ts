import { UserAuth } from '@appello/services/dist/types';

import { UserProfileModel } from '~/entities/user/model';

export interface UserState {
  profile: Nullable<UserProfileModel>;
  auth: Nullable<UserAuth>;
  isLogedIn: boolean;
  isFirstLaunch: Nullable<boolean>;
  isShowedModal: Nullable<boolean>;
  range: Nullable<string>;
  hasPermission: Nullable<boolean>;
}
