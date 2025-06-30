import { AppText } from '@appello/mobile-ui';
import React from 'react';
import { FlatList, Linking, Pressable, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Avatar } from '~/app/components/Avatar';
import { Screen } from '~/app/components/Screen';
import { HomeTabScreenProps } from '~/app/navigation/HomeTab';
import { useDeleteMeMutation } from '~/app/services/rtkQuery/user/endpoints';
import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { theme } from '~/app/uiKit';
import {
  ArrowUptIcon,
  CalendarCheckIcon,
  CreditCardIcon,
  FilesIcon,
  MapPinIcon,
  PencilIcon,
  SignOutIcon,
  TrashIcon,
  WalletIcon,
} from '~/assets/icons';
import { selectUser, signOut } from '~/entities/user';
import { formatPhoneNumber } from '~/shared/utils';

import { useStyles } from './useStyles';

type ProfileOptions = {
  name: string;
  iconName: React.FC<SvgProps>;
  onPress: () => void;
};

export const ProfileScreen: React.FC<HomeTabScreenProps<'PROFILE'>> = ({ navigation }) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [deletUser] = useDeleteMeMutation();
  const { profile } = useAppSelector(selectUser);

  const profileOptions = [
    {
      name: 'My Schedule',
      iconName: CalendarCheckIcon,
      onPress: () => {
        navigation.navigate('ProfileNavigator', { screen: 'ScheduleScreen' });
      },
    },
    {
      name: 'Location Preferences',
      iconName: MapPinIcon,
      onPress: () => {
        navigation.navigate('ProfileNavigator', { screen: 'LocationPreferencesScreen' });
      },
    },
    {
      name: 'Edit Profile',
      iconName: PencilIcon,
      onPress: () => {
        navigation.navigate('ProfileNavigator', { screen: 'EditProfileScreen' });
      },
    },
    {
      name: 'Payout Settings',
      iconName: WalletIcon,
      onPress: () => {
        navigation.navigate('ProfileNavigator', { screen: 'PayoutSettingsScreen' });
      },
    },
    {
      name: 'Payment Methods',
      iconName: CreditCardIcon,
      onPress: () => {
        navigation.navigate('ProfileNavigator', { screen: 'PaymentMethodsScreen' });
      },
    },
    {
      name: 'Terms & Conditions',
      iconName: FilesIcon,
      onPress: () => {
        Linking.openURL('https://topaz-pastel-09948269.figma.site/terms-of-use');
      },
    },
    {
      name: 'Privacy Policy',
      iconName: FilesIcon,
      onPress: () => {
        Linking.openURL('https://topaz-pastel-09948269.figma.site/privacy-policy');
      },
    },
    {
      name: 'Delete Account',
      iconName: TrashIcon,
      onPress: () => {
        deletUser().then(() => {
          dispatch(signOut());
        });
      },
    },
    {
      name: 'Log Out',
      iconName: SignOutIcon,
      onPress: () => {
        dispatch(signOut());
      },
    },
  ];

  const renderItem = ({
    item,
    iconName: IconComponents,
    index,
  }: {
    item: ProfileOptions;
    iconName: React.FC<SvgProps>;
    index: number;
  }) => {
    return (
      <Pressable style={styles.itemStyle} onPress={item.onPress}>
        <View style={styles.itemInner}>
          <IconComponents color={theme.colors.gray[3]} height={18} width={18} />
          <AppText color={theme.colors.black[2]} variant="p3">
            {item.name}
          </AppText>
        </View>
        {index < profileOptions.length - 2 && <ArrowUptIcon color={theme.colors.gray[3]} />}
      </Pressable>
    );
  };

  return (
    <Screen useTopSafeArea childrenContainerStyle={styles.childrenContainerStyle}>
      <View style={styles.container}>
        <Avatar imageStyle={styles.imageStyle} size={72} urlKey={profile?.photoKeys[0]} />
        <AppText color={theme.colors.white} variant="h5">
          {profile?.fullName}
        </AppText>
        {profile?.phoneNumber && (
          <AppText color={theme.colors.global.whiteLight[5]} variant="p3">
            {formatPhoneNumber(profile?.phoneNumber)}
          </AppText>
        )}
      </View>

      <FlatList
        data={profileOptions as ProfileOptions[]}
        keyExtractor={state => state.name}
        renderItem={({ item, index }) => renderItem({ item, iconName: item.iconName, index })}
        scrollEnabled={false}
      />
    </Screen>
  );
};
