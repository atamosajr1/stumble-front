import { AppText, BottomSheet, Button, Popup } from '@appello/mobile-ui';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFocusEffect } from '@react-navigation/native';
import { format, isBefore } from 'date-fns';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { CalendarScreen } from '~/app/components/Calendar/Calendar';
import { Loader } from '~/app/components/Loader';
import { Screen } from '~/app/components/Screen';
import { ProfileStackScreenProps, ScheduleProfile } from '~/app/navigation/Profile';
import {
  useDeleteSchedulesByIdMutation,
  useLazyGetSchedulesQuery,
} from '~/app/services/rtkQuery/user/endpoints';
import { Schedules } from '~/app/services/rtkQuery/user/types';
import { theme } from '~/app/uiKit';
import { DeleteIcon, EdittIcon, MenuIcon } from '~/assets/icons';

import { useStyles } from './useStyles';

export const ScheduleScreen: React.FC<ProfileStackScreenProps<'ScheduleScreen'>> = ({
  navigation,
}) => {
  const styles = useStyles();
  const bottomSheetRef = useRef<BottomSheetModalMethods>(null);
  const [isDeletModal, setIsDeleteModal] = useState(false);
  const [selectDate, setSelectedDate] = useState(new Date());
  const [getScheduleByDate, { data, isLoading }] = useLazyGetSchedulesQuery();

  const [selectSchedule, setSelectSchedule] = useState<Nullable<Schedules>>(null);
  const [deleteUser] = useDeleteSchedulesByIdMutation();

  useFocusEffect(
    useCallback(() => {
      getScheduleByDate({
        date: format(new Date(selectDate), 'yyyy-MM-dd'),
      });
    }, [getScheduleByDate, selectDate]),
  );

  const renderItem = ({ item, index }: { item: Schedules; index: number }) => {
    return (
      <View
        style={[
          styles.scheduleItem,
          index < (data?.data?.length ?? 0) - 1 && { borderBottomWidth: 1 },
        ]}
      >
        <View>
          <AppText color={theme.colors.secondary} variant="p1" weight="medium">
            {item.court.name}
          </AppText>

          <AppText color={theme.colors.secondary} variant="p4">
            {format(new Date(item.startDttm), 'h:mm a')} -{' '}
            {format(new Date(item.endDttm), 'h:mm a')}
          </AppText>
        </View>
        <Pressable
          style={{ width: 26 }}
          onPress={() => {
            bottomSheetRef.current?.present();
            setSelectSchedule(item);
          }}
        >
          <MenuIcon color={theme.colors.gray[3]} />
        </Pressable>
      </View>
    );
  };

  return (
    <Screen
      secondary
      useBottomSafeArea
      useTopSafeArea
      withGoBack
      button={
        <Button
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('ScheduleRecordScreen', {
              title: ScheduleProfile.NEW_SCHEDULE_RECORD,
              date: selectDate,
            });
          }}
        >
          New record
        </Button>
      }
      header={
        <View>
          <AppText color={theme.colors.black[1]} variant="p3">
            My Schedule
          </AppText>
        </View>
      }
    >
      <View style={styles.calendarStyle}>
        <CalendarScreen setSelectedDate={setSelectedDate} />
      </View>

      <FlatList<Schedules>
        ListEmptyComponent={
          <View style={styles.noRecords}>
            {isLoading ? (
              <Loader />
            ) : (
              <AppText color={theme.colors.gray[2]} style={styles.textAlign} variant="p3">
                No availability records added
              </AppText>
            )}
          </View>
        }
        data={data?.data || []}
        keyExtractor={state => state.uuid}
        renderItem={renderItem}
        scrollEnabled={!!data?.data.length}
        style={styles.scheduleLsit}
      />
      <BottomSheet height={254} ref={bottomSheetRef} style={styles.bottomSheet}>
        <AppText color={theme.colors.gray[3]} style={styles.textAlign} variant="p1">
          {selectSchedule?.court?.name}
        </AppText>
        <Pressable
          disabled={isBefore(new Date(selectDate).getDate(), new Date().getDate())}
          style={styles.menuItemStyle}
          onPress={() => {
            navigation.navigate('ScheduleRecordScreen', {
              title: ScheduleProfile.EDIT_SCHEDULE_RECORD,
              uuId: selectSchedule?.uuid,
            });
            bottomSheetRef.current?.close();
          }}
        >
          <View style={styles.iconStyle}>
            <EdittIcon color={theme.colors.black[2]} />
          </View>
          <AppText color={theme.colors.black[2]} variant="p1">
            Edit
          </AppText>
        </Pressable>
        <Pressable
          disabled={isBefore(new Date(selectDate).getDate(), new Date().getDate())}
          style={styles.menuItemStyle}
          onPress={() => {
            setIsDeleteModal(true);
          }}
        >
          <View style={styles.iconStyle}>
            <DeleteIcon color={theme.colors.red} />
          </View>
          <AppText color={theme.colors.red} variant="p1">
            Delete record
          </AppText>
        </Pressable>
      </BottomSheet>
      <Popup
        buttons={useMemo(
          () => [
            {
              variant: 'secondary',
              children: 'Delete',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => {
                if (selectSchedule?.uuid) {
                  deleteUser({ uuid: selectSchedule?.uuid })
                    .unwrap()
                    .then(() => {
                      setIsDeleteModal(false);
                      bottomSheetRef.current?.dismiss();
                    });
                }
              },
              labelProps: {
                color: theme.colors.red,
              },
            },
            {
              variant: 'primary',
              children: 'Cancel',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => {
                setIsDeleteModal(false);
              },
            },
          ],
          [deleteUser, selectSchedule?.uuid],
        )}
        message="Are you sure to delete this public availability record?"
        opened={isDeletModal}
        title={`Delete ‘${selectSchedule?.court?.name}’ Record`}
      />
    </Screen>
  );
};
