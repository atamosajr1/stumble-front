import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { UserProfileModel } from '~/entities/user';
import { SearchCourtsScreen } from '~/screens/home';
import { CourtViewScreen } from '~/screens/home/ui/courts/CourtView';
import { RequestServiceScreen } from '~/screens/home/ui/courts/RequestService';
import { SearchAssociateScreen } from '~/screens/home/ui/courts/SearchAssociate';
import { AddCardScreen } from '~/screens/home/ui/profile/AddCard';

import { Courts } from '../services/rtkQuery/courts/types';
import { Attachments } from '../services/rtkQuery/jobs/types';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export type CourtsStackParamList = {
  CourtViewScreen: { uuid: string };
  RequestServiceScreen: {
    courtName?: string;
    courtUuid?: string;
    associateName?: string;
    associateUuid?: string;
    type?: string;
    fee?: string;
    dttm?: string;
    summary?: string;
    instructions?: string;
    inAppPayment?: boolean;
    attachments?: Nullable<Attachments[]>;
  };
  SearchCourtsScreen: { onSelect: (item: Courts) => void };
  SearchAssociateScreen: { onSelect: (item: UserProfileModel) => void };
  AddCardScreen: { goBack?: () => void };
};

export type CourtsStackScreenProps<Screen extends keyof CourtsStackParamList> =
  NativeStackScreenProps<CourtsStackParamList, Screen>;

const CourtStack = createNativeStackNavigator<CourtsStackParamList>();

export const CourtsNavigator: React.FC = () => {
  return (
    <CourtStack.Navigator screenOptions={screenOptions}>
      <CourtStack.Screen component={CourtViewScreen} name="CourtViewScreen" />
      <CourtStack.Screen component={RequestServiceScreen} name="RequestServiceScreen" />
      <CourtStack.Screen component={SearchCourtsScreen} name="SearchCourtsScreen" />
      <CourtStack.Screen component={SearchAssociateScreen} name="SearchAssociateScreen" />
      <CourtStack.Screen component={AddCardScreen} name="AddCardScreen" />
    </CourtStack.Navigator>
  );
};
