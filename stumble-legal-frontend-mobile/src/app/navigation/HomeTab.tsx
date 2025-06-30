import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { BankIcon, BellIcon, ChatIcon, UserIcon } from '~/assets/icons';
import { CourtsScreen, NoticeboardScreen, ProfileScreen, RequestsScreen } from '~/screens/home';

import { theme } from '../uiKit';
import { HomeStackScreenProps } from './Home';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
  tabBarActiveTintColor: theme.colors.brand.additional,
  tabBarInactiveTintColor: theme.colors.gray[4],
  tabBarItemStyle: {
    paddingTop: 10,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    lineHeight: 18,
    fontFamily: 'Roboto',
  },
};

export type HomeTabParamList = {
  COURTS: undefined;
  NOTICEBOARD: undefined;
  REQUESTS: undefined;
  PROFILE: undefined;
};

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, Screen>,
  HomeStackScreenProps<'HomeTabNavigator'>
>;

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

const tabConfig: {
  name: keyof HomeTabParamList;
  // TODO: remove
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  icon: React.FC<SvgProps>;
}[] = [
  {
    name: 'COURTS',
    component: CourtsScreen,
    icon: BankIcon,
  },
  {
    name: 'NOTICEBOARD',
    component: NoticeboardScreen,
    icon: BellIcon,
  },
  {
    name: 'REQUESTS',
    component: RequestsScreen,
    icon: ChatIcon,
  },
  {
    name: 'PROFILE',
    component: ProfileScreen,
    icon: UserIcon,
  },
];

export const HomeTabNavigator: React.FC = () => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <HomeTab.Navigator
      initialRouteName="COURTS"
      screenOptions={{
        ...screenOptions,
        tabBarStyle: {
          paddingHorizontal: 17,
          paddingBottom: safeAreaInsets.bottom + 10,
          height: 70 + safeAreaInsets.bottom,
          ...theme.shadow[1],
        },
      }}
    >
      {tabConfig.map(({ name, component, icon: IconComponents }) => {
        return (
          <HomeTab.Screen
            component={component}
            key={name}
            name={name}
            options={{
              tabBarIcon: ({ color }) => <IconComponents color={color} height={24} width={24} />,
            }}
          />
        );
      })}
    </HomeTab.Navigator>
  );
};
