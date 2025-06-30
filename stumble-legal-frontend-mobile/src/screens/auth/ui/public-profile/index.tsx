import { AppText, Button, Checkbox, TextField } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { DropDownField } from '~/app/components/Fields/DropDownField';
import { Screen } from '~/app/components/Screen';
import { UploadProfilePictureField } from '~/app/components/UploadProfilePictureField';
import {
  PUBLIC_PROFILE_AREA_OPTIONS,
  PUBLIC_PROFILE_CITY_OPTIONS,
  PUBLIC_PROFILE_ROLE_OPTIONS,
} from '~/app/constants/data';
import { AuthStackScreenProps } from '~/app/navigation/Auth';
import { useUpdateMeMutation } from '~/app/services/rtkQuery/user/endpoints';
import { useAppDispatch } from '~/app/store/hooks';
import { PublicProfileFormValues } from '~/app/types/formValues';
import { useUIKitTheme } from '~/app/uiKit';
import { DropdownIcon } from '~/assets/icons';
import { setUser } from '~/entities/user';
import { processApiError } from '~/shared/api';
import { useAWSFileUpload } from '~/shared/hooks';
import { publicProfileSchema } from '~/shared/utils/formSchemas';

import { useStyles } from './useStyles';

export const PublicProfileScreen: React.FC<AuthStackScreenProps<'PublicProfileScreen'>> = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const theme = useUIKitTheme();
  const [setCreateMe, { isLoading }] = useUpdateMeMutation();
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const { uploadFile } = useAWSFileUpload();

  const form = useForm<PublicProfileFormValues>({
    defaultValues: {
      photoKey: null,
      role: '',
      practiceArea: '',
      city: '',
      about: null,
    },
    resolver: yupResolver(publicProfileSchema),
    mode: 'onChange',
  });
  const photoKey = form.watch('photoKey');

  const onSubmit: SubmitHandler<PublicProfileFormValues> = useCallback(
    async values => {
      try {
        const { uploadedFileKey } = await uploadFile({
          uri: values.photoKey || null,
          path: 'users',
        });

        await setCreateMe({
          ...values,
          isPhoneVisible,
          about: values.about || null,
          photoKey: uploadedFileKey,
        })
          .unwrap()
          .then(data => {
            if (data) {
              dispatch(
                setUser({
                  ...data,
                }),
              );
            }
          });
      } catch (error) {
        processApiError({
          errors: getErrorData(error),
          fields: Object.keys(getErrorData(error)),
          setFieldError: (name, message) => {
            form.setError(name as keyof PublicProfileFormValues, { message });
          },
        });
      }
    },
    [dispatch, form, isPhoneVisible, setCreateMe, uploadFile],
  );

  return (
    <Screen
      useHorizontalPadding
      useTopSafeArea
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <View>
          <AppText color={theme.colors.white} variant="h2">
            Public Profile
          </AppText>
        </View>
      }
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.field}>
          <UploadProfilePictureField
            setPhoto={uri => {
              form.setValue('photoKey', uri || '');
              form.trigger('photoKey');
            }}
            size={72}
            uri={photoKey}
          />

          <Controller
            control={form.control}
            name="role"
            render={({ field: { value, onChange } }) => (
              <DropDownField
                Icon={() => <DropdownIcon color={theme.colors.white} />}
                error={form.formState.errors['role']}
                items={PUBLIC_PROFILE_ROLE_OPTIONS}
                label="Role *"
                style={{
                  inputIOS: styles.inputIOS,
                  inputAndroid: styles.inputIOS,
                  placeholder: styles.inputPlaceholder,
                }}
                value={value}
                onDonePress={() => form.trigger('role')}
                onValueChange={onChange}
              />
            )}
          />

          <Controller
            control={form.control}
            name="practiceArea"
            render={({ field: { value, onChange } }) => (
              <DropDownField
                Icon={() => <DropdownIcon color={theme.colors.white} />}
                error={form.formState.errors['practiceArea']}
                items={PUBLIC_PROFILE_AREA_OPTIONS}
                label="Main Practice Area *"
                style={{
                  inputIOS: styles.inputIOS,
                  inputAndroid: styles.inputIOS,
                  placeholder: styles.inputPlaceholder,
                }}
                value={value}
                onDonePress={() => form.trigger('practiceArea')}
                onValueChange={onChange}
              />
            )}
          />

          <Controller
            control={form.control}
            name="city"
            render={({ field: { value, onChange } }) => (
              <DropDownField
                Icon={() => <DropdownIcon color={theme.colors.white} />}
                error={form.formState.errors['city']}
                items={PUBLIC_PROFILE_CITY_OPTIONS}
                label="City *"
                style={{
                  inputIOS: styles.inputIOS,
                  inputAndroid: styles.inputIOS,
                  placeholder: styles.inputPlaceholder,
                }}
                value={value}
                onDonePress={() => form.trigger('city')}
                onValueChange={onChange}
              />
            )}
          />

          <TextField
            multiline
            control={form.control}
            inputStyle={[styles.aboutInputStyle, styles.areaText]}
            label="About me"
            name="about"
            placeholder="Describe your expertise and what you can help with"
          />
        </View>
        <View style={styles.checkbox}>
          <Checkbox
            checked={isPhoneVisible}
            style={{
              borderColor: theme.colors.global.whiteLight[2],
            }}
            onChange={() => setIsPhoneVisible(!isPhoneVisible)}
          />
          <AppText color={theme.colors.white} variant="p4">
            Display my phone number
          </AppText>
        </View>
        <Button
          disabled={!form.formState.isValid}
          isLoading={isLoading}
          onPress={form.handleSubmit(onSubmit)}
        >
          CONTINUE
        </Button>
      </ScrollView>
    </Screen>
  );
};
