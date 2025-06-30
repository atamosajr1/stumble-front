import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';

import { selectIsProfile } from '~/entities/user';
import {
  LoginScreen,
  PublicProfileScreen,
  SetupAccountScreen,
  VerificationScreen,
} from '~/screens/auth';

import { useAppSelector } from '../store/hooks';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  SetupAccountScreen: undefined;
  VerificationScreen: { phone: string };
  PublicProfileScreen: undefined;
};
const verificationScreenOptions: NativeStackNavigationOptions = {
  title: 'Verification',
};
const setupAccountScreenOptions: NativeStackNavigationOptions = {
  title: 'Setup Account',
};
const publicProfileScreenOptions: NativeStackNavigationOptions = {
  title: 'Public profile',
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  const isProfile = useAppSelector(selectIsProfile);

  return (
    <AuthStack.Navigator screenOptions={screenOptions}>
      {!isProfile ? (
        <>
          <AuthStack.Screen component={LoginScreen} name="LoginScreen" />
          <AuthStack.Screen
            component={VerificationScreen}
            name="VerificationScreen"
            options={verificationScreenOptions}
          />
        </>
      ) : (
        <>
          <AuthStack.Screen
            component={SetupAccountScreen}
            name="SetupAccountScreen"
            options={setupAccountScreenOptions}
          />
          <AuthStack.Screen
            component={PublicProfileScreen}
            name="PublicProfileScreen"
            options={publicProfileScreenOptions}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};
