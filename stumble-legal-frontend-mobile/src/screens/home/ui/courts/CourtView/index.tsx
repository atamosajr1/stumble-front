import { AppText, Button } from '@appello/mobile-ui';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '~/app/components/Avatar';
import { CalendarScreen } from '~/app/components/Calendar/Calendar';
import { Screen } from '~/app/components/Screen';
import { CourtsStackScreenProps } from '~/app/navigation/Courts';
import {
  useGetCourtByUuidQuery,
  useGetVisitorsByUuidQuery,
} from '~/app/services/rtkQuery/courts/endpoints';
import { Visitors } from '~/app/services/rtkQuery/courts/types';
import {
  useLazyGetUsersByUuidQuery,
  useSetUsersMeCheckInMutation,
  useSetUsersMeCheckOutMutation,
} from '~/app/services/rtkQuery/user/endpoints';
import { useAppSelector } from '~/app/store/hooks';
import { theme } from '~/app/uiKit';
import { ArrowRight, CloseIcon, PhoneIcon } from '~/assets/icons';
import { selectUser } from '~/entities/user';
import { getTimeAgo } from '~/shared/utils/getTimeAgo';
import { sv } from '~/shared/utils/scaler';

import { useStyles } from './useStyles';

export const CourtViewScreen: React.FC<CourtsStackScreenProps<'CourtViewScreen'>> = ({
  navigation,
  route: { params },
}) => {
  const styles = useStyles();
  const courtUuid = params.uuid;
  const [selectDate, setSelectedDate] = useState(new Date());
  const { data, refetch } = useGetVisitorsByUuidQuery({
    uuid: params?.uuid || undefined,
    dttm: format(new Date(selectDate), 'yyyy-MM-dd') || undefined,
  });
  const { data: court, refetch: refetchCourt } = useGetCourtByUuidQuery({ uuid: courtUuid });
  const [setCheckIn] = useSetUsersMeCheckInMutation();
  const [setCheckOut] = useSetUsersMeCheckOutMutation();
  const [getUser, { data: user }] = useLazyGetUsersByUuidQuery();
  const { profile } = useAppSelector(selectUser);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  useFocusEffect(
    useCallback(() => {
      refetchCourt();
      refetch();
    }, [refetch, refetchCourt]),
  );

  const renderItem = ({ item }: { item: Visitors }) => {
    return (
      <Pressable
        style={styles.userItem}
        onPress={() => {
          getUser({ uuid: item.uuid });
          bottomSheetRef.current?.expand();
        }}
      >
        <View style={styles.userItemInner}>
          <Avatar imageStyle={styles.imageStyle} size={42} urlKey={item?.photoKeys[0]} />

          <View>
            <AppText color={theme.colors.black[1]} variant="p1" weight="bold">
              {item.fullName}
            </AppText>
            <AppText color={theme.colors.black[1]} variant="p5">
              {item.checkInDttm
                ? `Checked in ${getTimeAgo(item.checkInDttm)}`
                : `${format(new Date(item.scheduleStartDttm), 'h:mm a')} - ${format(
                    new Date(item.scheduleEndDttm),
                    'h:mm a',
                  )}`}
            </AppText>
          </View>
        </View>
        <View style={styles.userTypes}>
          {item.inCourt && (
            <View style={styles.inCourt}>
              <AppText color={theme.colors.global.greenDark} variant="p5" weight="bold">
                In court
              </AppText>
            </View>
          )}
          <ArrowRight color={theme.colors.gray[3]} />
        </View>
      </Pressable>
    );
  };
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={StyleSheet.absoluteFill}
      />
    ),
    [],
  );

  return (
    <Screen
      useTopSafeArea
      withGoBack
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <View style={styles.header}>
          <AppText color={theme.colors.white} variant="h2">
            {court?.name}
          </AppText>
          <View style={styles.headerTypes}>
            <AppText color={theme.colors.global.whiteLight[7]} variant="p3">
              {court?.level}
            </AppText>
            {court?.types[0] && (
              <AppText color={theme.colors.global.whiteLight[7]} variant="p3">
                {' '}
                •{' '}
              </AppText>
            )}
            <AppText color={theme.colors.global.whiteLight[7]} variant="p3">
              {court?.types[0]}
            </AppText>
          </View>
          <View style={styles.headerButtons}>
            {!court?.isCheckedIn ? (
              <Button
                labelProps={{ color: theme.colors.white, uppercase: true }}
                style={[styles.checkInButton, styles.buttonStyle]}
                variant="plain"
                onPress={() => {
                  setCheckIn({ courtUuid: params.uuid });
                }}
              >
                Check in
              </Button>
            ) : (
              <Button
                labelProps={{ color: theme.colors.white, uppercase: true }}
                style={[styles.checkOutButton, styles.buttonStyle]}
                variant="plain"
                onPress={() => {
                  setCheckOut({ courtUuid: params.uuid });
                }}
              >
                Check out
              </Button>
            )}
            <Button
              style={styles.buttonStyle}
              variant="primary"
              onPress={() =>
                navigation.navigate('RequestServiceScreen', {
                  courtName: court?.name,
                  courtUuid: court?.uuid,
                })
              }
            >
              New request
            </Button>
          </View>
        </View>
      }
    >
      <View style={styles.calendarStyle}>
        <CalendarScreen setSelectedDate={setSelectedDate} />
      </View>
      <FlatList data={data?.data} keyExtractor={state => state.uuid} renderItem={renderItem} />
      <BottomSheet
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        handleComponent={() => null}
        index={-1}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        maxDynamicContentSize={sv(812)}
        ref={bottomSheetRef}
        style={styles.bottomSheet}
      >
        <BottomSheetScrollView scrollEnabled={false}>
          <View style={styles.bottomSheetInner}>
            <Pressable
              hitSlop={15}
              style={styles.closeButton}
              onPress={() => bottomSheetRef.current?.close()}
            >
              <CloseIcon color={theme.colors.black[1]} />
            </Pressable>
            <View style={styles.sheetInner}>
              <Avatar imageStyle={styles.imageStyle} size={92} urlKey={user?.photoKeys[0]} />
              <AppText color={theme.colors.black[1]} variant="h5">
                {user?.fullName}
              </AppText>
              <View style={styles.headerTypes}>
                <AppText color={theme.colors.gray[2]} variant="p5">
                  {user?.city}
                </AppText>
                <AppText color={theme.colors.gray[2]} variant="p5">
                  {' '}
                  |{' '}
                </AppText>
                <AppText color={theme.colors.gray[2]} variant="p5">
                  {user?.role}
                </AppText>
                <AppText color={theme.colors.gray[2]} variant="p5">
                  {' '}
                  |{' '}
                </AppText>
                <AppText color={theme.colors.gray[2]} variant="p5">
                  {user?.practiceArea}
                </AppText>
              </View>
              <View style={styles.phoneStyle}>
                <PhoneIcon color={theme.colors.brand.accent} />
                <AppText color={theme.colors.brand.accent} variant="p5">
                  {user?.phoneNumber}
                </AppText>
              </View>
            </View>

            {user?.about && (
              <AppText color={theme.colors.gray[2]} variant="p5">
                About me
              </AppText>
            )}
            {user?.about && (
              <AppText color={theme.colors.black[1]} variant="p5">
                {user?.about}
              </AppText>
            )}
            {user?.uuid !== profile?.uuid && (
              <Button
                style={styles.requestService}
                variant="primary"
                onPress={() => {
                  navigation.navigate('RequestServiceScreen', {
                    courtName: court?.name,
                    courtUuid: court?.uuid,
                    associateName: user?.fullName,
                    associateUuid: user?.uuid,
                  });
                  bottomSheetRef.current?.close();
                }}
              >
                Request service
              </Button>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </Screen>
  );
};
