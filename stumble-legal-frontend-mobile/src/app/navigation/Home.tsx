import { NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';

import { CourtsNavigator, CourtsStackParamList } from './Courts';
import { HomeTabNavigator, HomeTabParamList } from './HomeTab';
import { NoticeboardNavigator, NoticeboardStackParamList } from './Noticeboard';
import { ProfileNavigator, ProfileStackParamList } from './Profile';

type StackNavigationProps<
  T extends ParamListBase,
  K extends keyof T = keyof T,
> = NativeStackScreenProps<T, K>;

export type HomeStackParamList = {
  HomeTabNavigator: NavigatorScreenParams<HomeTabParamList>;
  ProfileNavigator: NavigatorScreenParams<ProfileStackParamList>;
  CourtsNavigator: NavigatorScreenParams<CourtsStackParamList>;
  NoticeboardNavigator: NavigatorScreenParams<NoticeboardStackParamList>;
};

export type HomeStackScreenProps<
  Screen extends keyof HomeStackParamList = keyof HomeStackParamList,
> = StackNavigationProps<HomeStackParamList, Screen>;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen component={HomeTabNavigator} name="HomeTabNavigator" />
      <HomeStack.Screen component={ProfileNavigator} name="ProfileNavigator" />
      <HomeStack.Screen component={CourtsNavigator} name="CourtsNavigator" />
      <HomeStack.Screen component={NoticeboardNavigator} name="NoticeboardNavigator" />
    </HomeStack.Navigator>
  );
};
