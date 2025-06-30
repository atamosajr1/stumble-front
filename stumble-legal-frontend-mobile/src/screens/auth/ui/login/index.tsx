import { AppText, Button, TextField } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { Screen } from '~/app/components/Screen';
import { PHONE_NUMBER_MASK } from '~/app/constants/mask';
import { AuthStackScreenProps } from '~/app/navigation/Auth';
import { useLazyGetOtpQuery } from '~/app/services/rtkQuery/auth/endpoints';
import { LoginFormValues } from '~/app/types/formValues';
import { useUIKitTheme } from '~/app/uiKit';
import { processApiError } from '~/shared/api';
import { loginFormSchema } from '~/shared/utils/formSchemas';

import { useStyles } from './useStyles';

export const LoginScreen: React.FC<AuthStackScreenProps<'LoginScreen'>> = ({ navigation }) => {
  const theme = useUIKitTheme();
  const styles = useStyles();
  const [getOtp, { isLoading }] = useLazyGetOtpQuery();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      phone: '',
    },
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
    async values => {
      try {
        const res = await getOtp({ phone: values.phone });
        if (res.data?.detail) {
          navigation.navigate('VerificationScreen', { phone: values.phone });
        }
      } catch (error) {
        processApiError({
          errors: getErrorData(error),
          onGlobalError: message => {
            showMessage({
              type: 'danger',
              message,
            });
          },
        });
      }
    },
    [getOtp, navigation],
  );

  return (
    <Screen
      useHorizontalPadding
      useTopSafeArea
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <View>
          <AppText color={theme.colors.white} variant="h2">
            Log in
          </AppText>
        </View>
      }
    >
      <AppText color={theme.colors.global.whiteLight[5]} variant="p3">
        Whether you’re creating an account or signing{'\n'}back in, let’s start with your number
      </AppText>
      <TextField
        autoFocus
        control={form.control}
        inputStyle={styles.textInput}
        keyboardType="phone-pad"
        mask={PHONE_NUMBER_MASK}
        name="phone"
        placeholder="0000 000 000"
        style={styles.textField}
      />
      <Button
        disabled={!form.formState.isValid}
        isLoading={isLoading}
        style={styles.button}
        onPress={form.handleSubmit(onSubmit)}
      >
        LOG IN
      </Button>
    </Screen>
  );
};
