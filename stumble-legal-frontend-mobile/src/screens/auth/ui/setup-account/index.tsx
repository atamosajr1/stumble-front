import { AppText, Button, TextField } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Linking, ScrollView, View } from 'react-native';

import { Screen } from '~/app/components/Screen';
import { AuthStackScreenProps } from '~/app/navigation/Auth';
import { useCreateMeMutation } from '~/app/services/rtkQuery/user/endpoints';
import { useAppDispatch } from '~/app/store/hooks';
import { SetupAccountFormValues } from '~/app/types/formValues';
import { useUIKitTheme } from '~/app/uiKit';
import { setUser } from '~/entities/user';
import { processApiError } from '~/shared/api';
import { setupAccountSchema } from '~/shared/utils/formSchemas';

import { useStyles } from './useStyles';

export const SetupAccountScreen: React.FC<AuthStackScreenProps<'SetupAccountScreen'>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const theme = useUIKitTheme();
  const [createMe, { isLoading }] = useCreateMeMutation();
  const form = useForm<SetupAccountFormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      lawFirm: null,
      abn: null,
    },
    resolver: yupResolver(setupAccountSchema),
  });

  const onSubmit: SubmitHandler<SetupAccountFormValues> = useCallback(
    async values => {
      try {
        await createMe({
          ...values,
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
            navigation.navigate('PublicProfileScreen');
          });
      } catch (e) {
        processApiError({
          errors: getErrorData(e),
          fields: Object.keys(getErrorData(e)),
          setFieldError: (name, message) => {
            form.setError(name as keyof SetupAccountFormValues, { message });
          },
        });
      }
    },
    [createMe, dispatch, form, navigation],
  );

  const handleTermsPress = useCallback(() => {
    Linking.openURL('https://topaz-pastel-09948269.figma.site/terms-of-use');
  }, []);

  return (
    <Screen
      useHorizontalPadding
      useTopSafeArea
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <View>
          <AppText color={theme.colors.white} variant="h2">
            Setup Account
          </AppText>
        </View>
      }
    >
      <ScrollView scrollEnabled={false}>
        <View style={styles.field}>
          <View style={styles.nameFields}>
            <TextField
              control={form.control}
              inputStyle={[styles.fieldStyle, styles.nameFieldsStyle]}
              label="First Name *"
              name="firstName"
              placeholder="First Name"
            />
            <TextField
              control={form.control}
              inputStyle={[styles.fieldStyle, styles.nameFieldsStyle]}
              label="Last Name *"
              name="lastName"
              placeholder="Last Name"
            />
          </View>
          <TextField
            control={form.control}
            error={!!form.formState.errors.email}
            inputStyle={styles.fieldStyle}
            keyboardType="email-address"
            label="E-mail for Invoices *"
            name="email"
            placeholder="example@mail.com"
          />
          <TextField
            control={form.control}
            inputStyle={styles.fieldStyle}
            label="Law Firm"
            name="lawFirm"
            placeholder="Firm name"
          />
          <TextField
            control={form.control}
            error={!!form.formState.errors.abn}
            inputStyle={styles.fieldStyle}
            keyboardType="number-pad"
            label="ABN"
            name="abn"
            placeholder="ABN"
          />
          <AppText color={theme.colors.global.whiteLight[3]} variant="p5">
            Required for receiving in-app payments
          </AppText>
        </View>
        <Button
          disabled={!form.formState.isValid || isLoading}
          isLoading={isLoading}
          style={[styles.buttonContainer]}
          onPress={form.handleSubmit(onSubmit)}
        >
          CREATE ACCOUNT
        </Button>
        <AppText color={theme.colors.global.whiteLight[3]} style={styles.textStyle} variant="p4">
          By creating account I confirm I have read and accept Stumble{'\n'}Legal{' '}
          <AppText color={theme.colors.primary} variant="p4" onPress={handleTermsPress}>
            Terms & Conditions
          </AppText>
        </AppText>
      </ScrollView>
    </Screen>
  );
};
