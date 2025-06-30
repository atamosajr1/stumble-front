import { AppText, Button, Popup, TextField } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useMemo, useState } from 'react';
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
import { ProfileStackScreenProps } from '~/app/navigation/Profile';
import { useUpdateMeMutation } from '~/app/services/rtkQuery/user/endpoints';
import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { PublicProfileFormValues } from '~/app/types/formValues';
import { useUIKitTheme } from '~/app/uiKit';
import { DropdownIcon } from '~/assets/icons';
import { selectUser, setUser } from '~/entities/user';
import { processApiError } from '~/shared/api';
import { useAWSFileUpload } from '~/shared/hooks';
import { publicProfileSchema } from '~/shared/utils/formSchemas';

import { useStyles } from './useStyles';

export const EditProfileScreen: React.FC<ProfileStackScreenProps<'EditProfileScreen'>> = ({
  navigation,
}) => {
  const styles = useStyles();
  const theme = useUIKitTheme();
  const { profile } = useAppSelector(selectUser);
  const { uploadFile } = useAWSFileUpload();
  const [setCreateMe, { isLoading }] = useUpdateMeMutation();
  const dispatch = useAppDispatch();
  const [isSuccessModalOpened, setIsSuccessModalOpened] = useState(false);
  const [isChangesModalOpened, setIsChangesModalOpened] = useState(false);

  const form = useForm<PublicProfileFormValues>({
    defaultValues: {
      role: profile?.role,
      practiceArea: profile?.practiceArea,
      city: profile?.city,
      about: profile?.about,
      photoKey: profile?.photoKeys[0],
    },
    resolver: yupResolver(publicProfileSchema),
    mode: 'onChange',
  });
  const photoKey = form.watch('photoKey');

  const onSubmit: SubmitHandler<PublicProfileFormValues> = useCallback(
    async values => {
      try {
        let uploadedKey;
        if (form.getFieldState('photoKey').isDirty && values.photoKey) {
          const { uploadedFileKey } = await uploadFile({
            uri: values.photoKey,
            path: 'users',
          });
          uploadedKey = uploadedFileKey;
        }

        await setCreateMe({
          ...values,
          about: values.about || null,
          photoKey: values.photoKey
            ? form.getFieldState('photoKey').isDirty
              ? uploadedKey
              : values.photoKey
            : null,
        })
          .unwrap()
          .then(data => {
            if (data) {
              dispatch(
                setUser({
                  ...data,
                }),
              );
              setIsSuccessModalOpened(true);
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
    [dispatch, form, setCreateMe, uploadFile],
  );

  const goBackButton = () => {
    if (form.formState.isDirty) {
      setIsChangesModalOpened(true);
    } else {
      navigation.goBack();
    }
  };

  const discardForm = useCallback(() => {
    form.reset();
    setIsChangesModalOpened(false);
    navigation.goBack();
  }, [form, navigation]);

  return (
    <Screen
      secondary
      useBottomSafeArea
      useHorizontalPadding
      useTopSafeArea
      withGoBack
      button={
        <Button
          disabled={!form.formState.isValid || !form.formState.isDirty || isLoading}
          onPress={form.handleSubmit(onSubmit)}
        >
          Save changes
        </Button>
      }
      childrenContainerStyle={styles.childrenContainerStyle}
      goBackButton={goBackButton}
      header={
        <View>
          <AppText color={theme.colors.black[1]} variant="p3">
            Edit Profile
          </AppText>
        </View>
      }
    >
      <ScrollView style={styles.field}>
        <View style={styles.profilePicture}>
          <UploadProfilePictureField
            edit
            setPhoto={uri => {
              form.setValue('photoKey', uri, { shouldDirty: true });
              form.trigger('photoKey');
            }}
            size={72}
            uri={form.getFieldState('photoKey').isDirty ? photoKey : ''}
            urlKey={!form.getFieldState('photoKey').isDirty ? photoKey : ''}
          />
        </View>

        <Controller
          control={form.control}
          name="role"
          render={({ field: { value, onChange } }) => (
            <DropDownField
              Icon={DropdownIcon}
              error={form.formState.errors['role']}
              items={PUBLIC_PROFILE_ROLE_OPTIONS}
              label="Role *"
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
              Icon={DropdownIcon}
              error={form.formState.errors['practiceArea']}
              items={PUBLIC_PROFILE_AREA_OPTIONS}
              label="Main Practice Area *"
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
              Icon={DropdownIcon}
              error={form.formState.errors['city']}
              items={PUBLIC_PROFILE_CITY_OPTIONS}
              label="City *"
              value={value}
              onDonePress={() => form.trigger('city')}
              onValueChange={onChange}
            />
          )}
        />

        <TextField
          multiline
          control={form.control}
          inputStyle={[styles.dropdownFieldStyle, styles.areaText]}
          label="About me"
          name="about"
          placeholder="Describe your expertise and what you can help with"
        />
      </ScrollView>
      <Popup
        message="Profile updated successfully."
        opened={isSuccessModalOpened}
        title="Save Changes"
        onClose={() => {
          setIsSuccessModalOpened(false);
          navigation.goBack();
        }}
      />
      <Popup
        buttons={useMemo(
          () => [
            {
              variant: 'secondary',
              children: 'Discard',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: discardForm,
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
                setIsChangesModalOpened(false);
              },
            },
          ],
          [discardForm, theme.colors.red],
        )}
        message="You have unsaved changes. Do you want to discard them?"
        opened={isChangesModalOpened}
        title="Unsaved Changes"
      />
    </Screen>
  );
};
