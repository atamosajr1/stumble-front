import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SearchCourtsScreen } from '~/screens/home';
import { NewJobScreen } from '~/screens/home/ui/noticeboard/NewJob';
import { AddCardScreen } from '~/screens/home/ui/profile/AddCard';

import { Courts } from '../services/rtkQuery/courts/types';
import { Attachments } from '../services/rtkQuery/jobs/types';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export type NoticeboardStackParamList = {
  NewJobScreen:
    | {
        courtName?: string;
        courtUuid?: string;
        type?: string;
        fee?: string;
        dttm?: string;
        summary?: string;
        instructions?: string;
        inAppPayment?: boolean;
        attachments?: Nullable<Attachments[]>;
      }
    | undefined;
  SearchCourtsScreen: { onSelect: (item: Courts) => void };
  AddCardScreen: { goBack?: () => void };
};

export type NoticeboardStackScreenProps<Screen extends keyof NoticeboardStackParamList> =
  NativeStackScreenProps<NoticeboardStackParamList, Screen>;

const NoticeboardStack = createNativeStackNavigator<NoticeboardStackParamList>();

export const NoticeboardNavigator: React.FC = () => {
  return (
    <NoticeboardStack.Navigator screenOptions={screenOptions}>
      <NoticeboardStack.Screen component={NewJobScreen} name="NewJobScreen" />
      <NoticeboardStack.Screen component={SearchCourtsScreen} name="SearchCourtsScreen" />
      <NoticeboardStack.Screen component={AddCardScreen} name="AddCardScreen" />
    </NoticeboardStack.Navigator>
  );
};
