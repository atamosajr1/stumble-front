import { AppText, Button } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';

import { DateTimePickerField } from '~/app/components/Fields/DateTimePickerField';
import { Loader } from '~/app/components/Loader';
import { NavigateField } from '~/app/components/NavigateField';
import { Screen } from '~/app/components/Screen';
import { ProfileStackScreenProps, ScheduleProfile } from '~/app/navigation/Profile';
import {
  useLazyGetSchedulesByIdQuery,
  usePatchSchedulesMutation,
  useSetSchedulesMutation,
} from '~/app/services/rtkQuery/user/endpoints';
import { useAppDispatch } from '~/app/store/hooks';
import { ScheduleRecordFormValues } from '~/app/types/formValues';
import { useUIKitTheme } from '~/app/uiKit';
import { processApiError } from '~/shared/api';
import { sheduleRecordSchema } from '~/shared/utils/formSchemas';
import { s } from '~/shared/utils/scaler';
import { updateDateKeepTime } from '~/shared/utils/timeToDate';

import { useStyles } from './useStyles';

export const ScheduleRecordScreen: React.FC<ProfileStackScreenProps<'ScheduleRecordScreen'>> = ({
  navigation,
  route: { params },
}) => {
  const [setSchedule] = useSetSchedulesMutation();
  const [updateSchedule] = usePatchSchedulesMutation();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const theme = useUIKitTheme();
  const [getSchedule, { data, isLoading }] = useLazyGetSchedulesByIdQuery();
  const [loading, setLoading] = useState(true);
  const [courtName, setCourtName] = useState<string | null>(null);
  const form = useForm<ScheduleRecordFormValues>({
    defaultValues: {
      date: params?.date ? new Date(params.date).toISOString() : new Date().toISOString(),
      courtUuid: '',
      startDttm: '',
      endDttm: '',
    },
    resolver: yupResolver(sheduleRecordSchema),
  });

  useLayoutEffect(() => {
    if (params?.uuId) {
      getSchedule({ uuid: params.uuId }).then(res => {
        const data = res?.data;
        if (data?.startDttm && data?.court?.uuid) {
          form.setValue('date', new Date(data.startDttm).toISOString());
          form.setValue('courtUuid', data.court.uuid);
          form.setValue('startDttm', new Date(data.startDttm).toISOString());
          form.setValue('endDttm', new Date(data?.endDttm).toISOString());
          setCourtName(data.court.name);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch, form, getSchedule, params?.uuId]);

  const onSubmit: SubmitHandler<ScheduleRecordFormValues> = useCallback(
    async values => {
      const startDttm = updateDateKeepTime(new Date(values.startDttm), new Date(values.date));
      const endDttm = updateDateKeepTime(new Date(values.endDttm), new Date(values.date));
      try {
        if (params?.title === ScheduleProfile.NEW_SCHEDULE_RECORD) {
          await setSchedule({
            courtUuid: values.courtUuid,
            startDttm,
            endDttm,
          }).unwrap();

          navigation.goBack();
        } else {
          await updateSchedule({
            courtUuid: values.courtUuid,
            startDttm,
            endDttm,
            uuid: data?.uuid,
          }).unwrap();
          navigation.goBack();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (Object.keys(getErrorData(error)).includes('body')) {
          showMessage({
            type: 'danger',
            message: error.data.body,
          });
        } else {
          processApiError({
            errors: getErrorData(error),
            fields: Object.keys(getErrorData(error)),
            setFieldError: (name, message) => {
              form.setError(name as keyof ScheduleRecordFormValues, { message });
            },
          });
        }
      }
    },
    [data?.uuid, form, navigation, params?.title, setSchedule, updateSchedule],
  );

  const handleSelectStart = useCallback(
    (value: string | Date) => {
      form.setValue('startDttm', value as string);
      form.trigger('startDttm');
    },
    [form],
  );

  const handleSelectEnd = useCallback(
    (value: string | Date) => {
      form.setValue('endDttm', value as string);
      form.trigger('endDttm');
    },
    [form],
  );

  return (
    <Screen
      secondary
      useBottomSafeArea
      useHorizontalPadding
      useTopSafeArea
      withGoBack
      button={
        <Button disabled={!form.formState.isValid} onPress={form.handleSubmit(onSubmit)}>
          {params?.title === ScheduleProfile.NEW_SCHEDULE_RECORD ? 'Add record' : 'Save changes'}
        </Button>
      }
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <View>
          <AppText color={theme.colors.black[1]} variant="p3">
            {params?.title}
          </AppText>
        </View>
      }
    >
      <ScrollView
        contentContainerStyle={isLoading && styles.contentContainerStyle}
        scrollEnabled={false}
      >
        {isLoading || loading ? (
          <Loader />
        ) : (
          <View>
            <Controller
              control={form.control}
              name="date"
              render={({ field: { value, onChange } }) => {
                return (
                  <DateTimePickerField
                    date={value}
                    error={form.formState.errors['date']}
                    label="Date"
                    mode="date"
                    style={styles.fieldStyle}
                    onSelect={onChange}
                  />
                );
              }}
            />

            <Controller
              control={form.control}
              name="courtUuid"
              render={({ field: { onChange } }) => (
                <NavigateField
                  error={form.formState.errors['courtUuid']}
                  label="Court"
                  value={courtName}
                  onPress={() => {
                    navigation.navigate('SearchCourtsScreen', {
                      onSelect: selectedCourt => {
                        onChange(selectedCourt.uuid);
                        setCourtName(selectedCourt.name);
                      },
                    });
                  }}
                />
              )}
            />

            <View style={styles.timeForms}>
              <View style={{ width: s(167) }}>
                <DateTimePickerField
                  date={form.getValues('startDttm')}
                  error={form.formState.errors['startDttm']}
                  label="From"
                  mode="time"
                  onSelect={handleSelectStart}
                />
              </View>
              <View style={{ width: s(167) }}>
                <DateTimePickerField
                  date={form.getValues('endDttm')}
                  error={form.formState.errors['endDttm']}
                  label="To"
                  mode="time"
                  onSelect={handleSelectEnd}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};
