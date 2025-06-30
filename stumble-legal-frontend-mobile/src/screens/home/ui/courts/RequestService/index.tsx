import { AppText, Button, Checkbox, Popup, TextField } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FlatList, Keyboard, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { DateTimePickerField } from '~/app/components/Fields/DateTimePickerField';
import { DropDownField } from '~/app/components/Fields/DropDownField';
import { NavigateField } from '~/app/components/NavigateField';
import { Screen } from '~/app/components/Screen';
import { REQUEST_TYPES } from '~/app/constants/data';
import { DOLAR } from '~/app/constants/mask';
import { CourtsStackScreenProps } from '~/app/navigation/Courts';
import { useSetJobsMutation } from '~/app/services/rtkQuery/jobs/endpoints';
import { useGetPaymentMethodsQuery } from '~/app/services/rtkQuery/payment/endpoints';
import { ExtendFileInterface } from '~/app/types/extendFileInterfaces';
import { RequestServiceFormValues } from '~/app/types/formValues';
import { useUIKitTheme } from '~/app/uiKit';
import {
  CalendarIcon,
  CloseDeletetIcon,
  CloseIcon,
  DocumentIcon,
  DropdownIcon,
  FilesIcon,
  PluseIcon,
} from '~/assets/icons';
import { processApiError } from '~/shared/api';
import { useAWSFileUpload } from '~/shared/hooks';
import { TypeSelectFileEnum, useFilesUploaded } from '~/shared/hooks/useUploadFile';
import { formatFileSize } from '~/shared/utils/formatFileSize';
import { requestServiceSchema } from '~/shared/utils/formSchemas';
import { sv } from '~/shared/utils/scaler';

import { useStyles } from './useStyles';

export const RequestServiceScreen: React.FC<CourtsStackScreenProps<'RequestServiceScreen'>> = ({
  navigation,
  route: { params },
}) => {
  const styles = useStyles();
  const theme = useUIKitTheme();
  const { files, uploadAnotherFile, setFiles } = useFilesUploaded(TypeSelectFileEnum.PICK_MULTIPLE);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [associate, setAssociate] = useState<string | null>(null);
  const [courtName, setCourtName] = useState<string | null>(null);
  const { data } = useGetPaymentMethodsQuery();
  const { uploadFile } = useAWSFileUpload();
  const [setJobs, { isLoading }] = useSetJobsMutation();

  const form = useForm<RequestServiceFormValues>({
    defaultValues: {
      dttm: '',
      type: '',
      fee: '',
      instructions: null,
      summary: null,
      inAppPayment: false,
      associatedToUuid: '',
      courtUuid: '',
      attachments: null,
      paymentMethodUuid: null,
    },
    resolver: yupResolver(requestServiceSchema),
    mode: 'onChange',
  });

  const cardsOptions = useMemo(() => {
    return data?.data.length
      ? data?.data.map(item => ({
          value: item.uuid,
          label: item.name,
        }))
      : [];
  }, [data]);

  useEffect(() => {
    setCourtName(params?.courtName || '');
    form.setValue('courtUuid', params?.courtUuid || '');
    setAssociate(params?.associateName || '');
    form.setValue('associatedToUuid', params?.associateUuid || '');
    form.setValue('dttm', params?.dttm || '');
    form.setValue('type', params?.type || '');
    form.setValue('fee', params?.fee?.toString() || '');
    form.setValue('inAppPayment', params?.inAppPayment || false);
    form.setValue('summary', params?.summary || null);
    form.setValue('instructions', params?.instructions || null);
  }, [
    form,
    params?.associateName,
    params?.associateUuid,
    params?.courtName,
    params?.courtUuid,
    params?.dttm,
    params?.fee,
    params?.inAppPayment,
    params?.instructions,
    params?.summary,
    params?.type,
  ]);

  const fee = form.watch('fee');

  const onSubmit: SubmitHandler<RequestServiceFormValues> = useCallback(
    async values => {
      Keyboard.dismiss();

      try {
        const uploadedResults = await Promise.all(
          (values?.attachments ?? []).map(async file => {
            const { uploadedFileKey } = await uploadFile({
              uri: file.uri,
              path: `requestdoc`,
            });
            if (uploadedFileKey) {
              return {
                key: uploadedFileKey,
                name: file.name,
                size: file.size,
              };
            }
            return null;
          }),
        );

        await setJobs({
          ...values,
          attachments: uploadedResults.filter(Boolean),
          summary: values.summary || null,
          instructions: values.instructions || null,
          dttm: new Date(values.dttm).toISOString(),
          paymentMethodUuid: values.inAppPayment ? (values.paymentMethodUuid as string) : null,
        })
          .unwrap()
          .then(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'HomeTabNavigator',
                    state: {
                      index: 0,
                      routes: [{ name: 'REQUESTS' }],
                    },
                  },
                ],
              }),
            );
          });
      } catch (error) {
        processApiError({
          errors: getErrorData(error),
          fields: Object.keys(getErrorData(error)),
          setFieldError: (name, message) => {
            form.setError(name as keyof RequestServiceFormValues, { message });
          },
        });
      }
    },
    [form, navigation, setJobs, uploadFile],
  );

  useEffect(() => {
    if (files) {
      form.setValue('attachments', files);
      form.trigger('attachments');
    }
  }, [files, form]);

  const renderItem = ({ item }: { item: ExtendFileInterface }) => {
    return (
      <View style={styles.uploadFile}>
        <View style={styles.file}>
          <View style={styles.documentStyle}>
            <DocumentIcon color={theme.colors.global.blueDark} />
          </View>
          <View style={{ width: '80%' }}>
            <AppText color={theme.colors.black[1]} variant="p5">
              {item.name}
            </AppText>
            <AppText color={theme.colors.gray[2]} variant="p5">
              {formatFileSize(item.size as number)}
            </AppText>
          </View>
        </View>
        <Pressable hitSlop={15} onPress={() => setFiles(files.filter(file => file.id !== item.id))}>
          <CloseDeletetIcon color={theme.colors.gray[3]} />
        </Pressable>
      </View>
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

  const calculateAmounts = useMemo(() => {
    const ourFee = Number(fee) * 0.1;
    const total = Number(fee) + ourFee;

    return {
      fee,
      total,
      ourFee,
    };
  }, [fee]);

  return (
    <Screen
      secondary
      useBottomSafeArea
      useHorizontalPadding
      useTopSafeArea
      withGoBack
      button={
        <Button
          disabled={!form.formState.isValid || isLoading}
          isLoading={isLoading}
          style={styles.buttonStyle}
          variant="primary"
          onPress={() => {
            if (form.getValues('inAppPayment')) {
              bottomSheetRef.current?.expand();
            } else {
              form.handleSubmit(onSubmit)();
            }
          }}
        >
          Proceed
        </Button>
      }
      header={
        <AppText color={theme.colors.black[1]} variant="p3">
          Request Service
        </AppText>
      }
    >
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Controller
          control={form.control}
          name="associatedToUuid"
          render={({ field: { onChange } }) => (
            <NavigateField
              error={form.formState.errors['associatedToUuid']}
              label="Associate *"
              value={associate}
              onPress={() => {
                navigation.navigate('SearchAssociateScreen', {
                  onSelect: selectedAssociate => {
                    onChange(selectedAssociate.uuid);
                    setAssociate(selectedAssociate.fullName);
                  },
                });
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="courtUuid"
          render={({ field: { onChange } }) => (
            <NavigateField
              error={form.formState.errors['courtUuid']}
              label="Court *"
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

        <Controller
          control={form.control}
          name="dttm"
          render={({ field: { value, onChange } }) => (
            <DateTimePickerField
              date={value}
              error={form.formState.errors['dttm']}
              icon={<CalendarIcon color={theme.colors.gray[3]} />}
              label="Date & Time *"
              mode="datetime"
              style={styles.dateStyle}
              onSelect={onChange}
            />
          )}
        />

        <Controller
          control={form.control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <DropDownField
              Icon={DropdownIcon}
              error={form.formState.errors['type']}
              items={REQUEST_TYPES}
              label="Request Type *"
              value={value}
              onDonePress={() => form.trigger('type')}
              onValueChange={onChange}
            />
          )}
        />

        <View style={styles.payFieldStyle}>
          <TextField
            control={form.control}
            inputStyle={styles.fieldStyle}
            keyboardType="numeric"
            label="Fee *"
            mask={DOLAR}
            name="fee"
            style={styles.feeStyle}
          />

          <View style={styles.checkBoxField}>
            <Controller
              control={form.control}
              name="inAppPayment"
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  checked={value}
                  style={styles.checkBoxStyle}
                  onChange={() => onChange(!value)}
                />
              )}
            />
            <AppText>Pay in app</AppText>
          </View>
        </View>
        <TextField
          multiline
          control={form.control}
          inputStyle={[styles.dropdownFieldStyle, styles.areaText]}
          label="Summary"
          name="summary"
          placeholder=""
          onBlur={() => Keyboard.dismiss()}
        />
        <TextField
          multiline
          control={form.control}
          inputStyle={[styles.dropdownFieldStyle, styles.areaText]}
          label="Instructions"
          name="instructions"
          placeholder=""
          onBlur={() => Keyboard.dismiss()}
        />

        <AppText color={theme.colors.gray[1]} variant="p5">
          Attachments
        </AppText>
        <FlatList
          contentContainerStyle={styles.attachmentList}
          data={form.getValues('attachments') || []}
          keyExtractor={state => state.id}
          renderItem={renderItem}
        />

        <Button
          Icon={PluseIcon}
          iconPosition="center-left"
          labelProps={{ color: theme.colors.black[2], weight: 'medium' }}
          variant="secondary"
          onPress={async () => {
            uploadAnotherFile();
          }}
        >
          Add File
        </Button>
      </ScrollView>
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
          <Pressable
            hitSlop={15}
            style={styles.closeButton}
            onPress={() => bottomSheetRef.current?.close()}
          >
            <CloseIcon color={theme.colors.black[1]} />
          </Pressable>
          <View style={styles.sheetInner}>
            <AppText color={theme.colors.black[1]} variant="h5">
              Confirm Payment
            </AppText>
            <View style={styles.paymentField}>
              {cardsOptions.length ? (
                <View>
                  <Controller
                    control={form.control}
                    name="paymentMethodUuid"
                    render={({ field: { value, onChange } }) => (
                      <DropDownField
                        Icon={DropdownIcon}
                        error={form.formState.errors['paymentMethodUuid']}
                        items={cardsOptions}
                        label="Payment Methods"
                        value={value}
                        onDonePress={() => form.trigger('paymentMethodUuid')}
                        onValueChange={onChange}
                      />
                    )}
                  />

                  <Pressable
                    style={styles.addNew}
                    onPress={() => {
                      navigation.navigate('AddCardScreen', {
                        goBack: () => {
                          bottomSheetRef.current?.expand();
                        },
                      });
                      bottomSheetRef.current?.close();
                    }}
                  >
                    <AppText color={theme.colors.brand.accent} variant="p5">
                      Add new
                    </AppText>
                  </Pressable>
                </View>
              ) : (
                <Button
                  Icon={PluseIcon}
                  iconPosition="center-left"
                  labelProps={{ color: theme.colors.black[2], weight: 'medium' }}
                  variant="secondary"
                  onPress={() => {
                    navigation.navigate('AddCardScreen', {
                      goBack: () => bottomSheetRef.current?.expand(),
                    });
                    bottomSheetRef.current?.close();
                  }}
                >
                  Add new card
                </Button>
              )}
            </View>

            <View style={styles.paymentStyle}>
              <View style={styles.paymentItem}>
                <AppText color={theme.colors.gray[1]} variant="p4">
                  Associate will receive
                </AppText>
                <AppText color={theme.colors.black[1]} variant="p4">
                  ${calculateAmounts.fee}
                </AppText>
              </View>
              <View style={styles.paymentItem}>
                <AppText color={theme.colors.gray[1]} variant="p4">
                  Our fee (10%)
                </AppText>
                <AppText color={theme.colors.black[1]} variant="p4">
                  ${calculateAmounts.ourFee}
                </AppText>
              </View>
              <View style={styles.borderStyle} />
              <View style={styles.paymentItem}>
                <AppText color={theme.colors.black[1]} variant="p4" weight="medium">
                  Total to be charged
                </AppText>
                <AppText color={theme.colors.black[1]} variant="p4" weight="medium">
                  ${calculateAmounts.total}
                </AppText>
              </View>
            </View>
            <Button
              disabled={!form.getValues('paymentMethodUuid')}
              variant="primary"
              onPress={form.handleSubmit(onSubmit)}
            >
              Pay and send request
            </Button>
            <AppText color={theme.colors.gray[2]} style={styles.textStyle} variant="p5">
              Funds will be on hold until they complete a task
            </AppText>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
      <Popup
        buttons={useMemo(
          () => [
            {
              variant: 'primary',
              children: 'Close',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => {
                setIsVisibleModal(false);
              },
            },
          ],
          [],
        )}
        message={`Selected associate has not specified their ABN. You ${'\n'} can use offline payment only.`}
        opened={isVisibleModal}
        title="Associate is Unable to get Payments"
        topAccessory={
          <View style={styles.topAccessory}>
            <FilesIcon color={theme.colors.primary} height={38} width={38} />
          </View>
        }
      />
    </Screen>
  );
};
