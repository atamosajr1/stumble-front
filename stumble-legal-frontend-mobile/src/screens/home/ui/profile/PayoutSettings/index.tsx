import { AppText } from '@appello/mobile-ui';
import React, { useCallback } from 'react';
import { Image, Linking, Pressable, View } from 'react-native';

import { Screen } from '~/app/components/Screen';
import { ProfileStackScreenProps } from '~/app/navigation/Profile';
import { useGetStripeLinkQuery } from '~/app/services/rtkQuery/user/endpoints';
import { useUIKitTheme } from '~/app/uiKit';
import { FillArrowRightIcon } from '~/assets/icons';

import { useStyles } from './useStyles';

export const PayoutSettingsScreen: React.FC<
  ProfileStackScreenProps<'PayoutSettingsScreen'>
> = () => {
  const styles = useStyles();
  const theme = useUIKitTheme();
  const { data } = useGetStripeLinkQuery();
  const handlePress = useCallback(() => {
    if (data?.detail) {
      Linking.openURL(data?.detail);
    }
  }, [data]);

  return (
    <Screen
      secondary
      useBottomSafeArea
      useHorizontalPadding
      useTopSafeArea
      withGoBack
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <AppText color={theme.colors.black[1]} variant="p3">
          Payout Settings
        </AppText>
      }
    >
      <AppText color={theme.colors.gray[1]} variant="p5">
        Stripe Account for Payouts
      </AppText>
      <View style={styles.stripeContainer}>
        <View style={styles.containerInner}>
          <View style={styles.stripeImage}>
            <Image
              resizeMode="contain"
              source={require('~/assets/images/stripe.png')}
              style={[{ height: 32 }]}
            />
          </View>
          <View>
            <AppText color={theme.colors.black[1]} variant="p2">
              Amelia Willson
            </AppText>
            <AppText
              color={
                data?.detail.includes('express') ? theme.colors.global.greenDark : theme.colors.red
              }
              variant="p4"
            >
              {data?.detail.includes('express') ? 'Connected' : 'Not Connected'}
            </AppText>
          </View>
        </View>
        <Pressable style={styles.buttonStyle} onPress={handlePress}>
          <FillArrowRightIcon />
        </Pressable>
      </View>
    </Screen>
  );
};
