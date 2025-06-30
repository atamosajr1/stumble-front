import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  EditProfileScreen,
  ScheduleRecordScreen,
  ScheduleScreen,
  SearchCourtsScreen,
} from '~/screens/home';
import { AddCardScreen } from '~/screens/home/ui/profile/AddCard';
import { LocationPreferencesScreen } from '~/screens/home/ui/profile/LocationPreferences';
import { PaymentMethodsScreen } from '~/screens/home/ui/profile/PaymentMethods';
import { PayoutSettingsScreen } from '~/screens/home/ui/profile/PayoutSettings';

import { Courts } from '../services/rtkQuery/courts/types';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export enum ScheduleProfile {
  NEW_SCHEDULE_RECORD = 'New Schedule Record',
  EDIT_SCHEDULE_RECORD = 'Edit Schedule Record',
}

export type ProfileStackParamList = {
  EditProfileScreen: undefined;
  ScheduleScreen: undefined;
  ScheduleRecordScreen: { title?: string; uuId?: string; date?: Date } | undefined;
  SearchCourtsScreen: { onSelect: (item: Courts) => void };
  PaymentMethodsScreen: undefined;
  LocationPreferencesScreen: undefined;
  AddCardScreen: { goBack?: () => void };
  PayoutSettingsScreen: undefined;
};

export type ProfileStackScreenProps<Screen extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, Screen>;

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen component={EditProfileScreen} name="EditProfileScreen" />
      <ProfileStack.Screen component={ScheduleScreen} name="ScheduleScreen" />
      <ProfileStack.Screen component={ScheduleRecordScreen} name="ScheduleRecordScreen" />
      <ProfileStack.Screen component={SearchCourtsScreen} name="SearchCourtsScreen" />
      <ProfileStack.Screen component={PaymentMethodsScreen} name="PaymentMethodsScreen" />
      <ProfileStack.Screen component={AddCardScreen} name="AddCardScreen" />
      <ProfileStack.Screen component={LocationPreferencesScreen} name="LocationPreferencesScreen" />
      <ProfileStack.Screen component={PayoutSettingsScreen} name="PayoutSettingsScreen" />
    </ProfileStack.Navigator>
  );
};
