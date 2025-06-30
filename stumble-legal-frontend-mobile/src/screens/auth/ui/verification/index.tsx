import { useCodeTimer } from '@appello/common';
import { AppText } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { showMessage } from 'react-native-flash-message';

import { Loader } from '~/app/components/Loader';
import { Screen } from '~/app/components/Screen';
import { AuthStackScreenProps } from '~/app/navigation/Auth';
import { useLazyGetOtpQuery, useLoginMutation } from '~/app/services/rtkQuery/auth/endpoints';
import { useLazyGetMeQuery } from '~/app/services/rtkQuery/user/endpoints';
import { useAppDispatch } from '~/app/store/hooks';
import { useUIKitTheme } from '~/app/uiKit';
import { setAuth, setUser } from '~/entities/user';
import { processApiError } from '~/shared/api';
import { formatPhoneNumber } from '~/shared/utils';

import { useStyles } from './useStyles';

const CELL_COUNT = 4;

export const VerificationScreen: React.FC<AuthStackScreenProps<'VerificationScreen'>> = ({
  route,
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const theme = useUIKitTheme();
  const [loginMutation, { isLoading: loadingLoginMutation }] = useLoginMutation();
  const [resendOtpMutation, { isLoading: loadingResendOtpMutation }] = useLazyGetOtpQuery();
  const [getUser] = useLazyGetMeQuery();
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const codeTimer = useCodeTimer();

  useEffect(() => {
    codeTimer.sendCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyCode = useCallback(
    async (code: string) => {
      try {
        const data = await loginMutation({
          phoneNumber: route.params.phone,
          otp: code,
        }).unwrap();

        if (data) {
          dispatch(
            setAuth({
              access: data.accessToken,
              refresh: data.refreshToken,
            }),
          );

          const res = await getUser();
          if (res.data) {
            if (!res.data?.role) {
              navigation.navigate(
                !data.user?.fullName ? 'SetupAccountScreen' : 'PublicProfileScreen',
              );
            }

            dispatch(setUser(res?.data));
          }
        }
      } catch (e) {
        processApiError({
          errors: getErrorData(e),
          fields: Object.keys(getErrorData(e)),
          setFieldError: (_, message) => {
            showMessage({ type: 'danger', message });
          },
        });
      }
    },
    [dispatch, getUser, loginMutation, navigation, route.params.phone],
  );

  useEffect(() => {
    if (code.length === CELL_COUNT) {
      verifyCode(code);
    }
  }, [code, verifyCode]);

  const handleResend = useCallback(async () => {
    if (!loadingLoginMutation && !loadingResendOtpMutation && !codeTimer.seconds) {
      try {
        await resendOtpMutation({ phone: route.params.phone });
        codeTimer.sendCode();
      } catch (e) {
        processApiError({
          errors: getErrorData(e),
          fields: Object.keys(getErrorData(e)),
          setFieldError: (_, message) => {
            showMessage({ type: 'danger', message });
          },
        });
      }
    }
  }, [
    codeTimer,
    loadingLoginMutation,
    loadingResendOtpMutation,
    resendOtpMutation,
    route.params.phone,
  ]);

  return (
    <Screen
      useHorizontalPadding
      useTopSafeArea
      withGoBack
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <View>
          <AppText color={theme.colors.white} variant="p3">
            Verification
          </AppText>
        </View>
      }
    >
      <AppText style={styles.text} variant="p3">
        Enter a 4-digit confirmation code we’ve sent to{'\n'}your number{' '}
        {formatPhoneNumber(route.params.phone)}
      </AppText>
      <CodeField
        ref={ref}
        {...props}
        autoFocus
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} style={styles.cell} onLayout={getCellOnLayoutHandler(index)}>
            <AppText color={theme.colors.white} style={styles.cellText} variant="h3">
              {symbol || (isFocused ? <Cursor /> : null)}
            </AppText>
            <View style={[styles.cellBorder, isFocused && styles.cellBorderFocused]} />
          </View>
        )}
        rootStyle={styles.codeField}
        textContentType="oneTimeCode"
        value={code}
        onChangeText={setCode}
      />
      <AppText align="center" color={theme.colors.gray[2]} variant="p4" weight="medium">
        Didn’t get the code?{' '}
        <AppText
          color={!codeTimer.seconds ? theme.colors.primary : theme.colors.gray[2]}
          disabled={!!codeTimer.seconds}
          variant="p4"
          weight="medium"
          onPress={handleResend}
        >
          {codeTimer.seconds ? `Resend OTP in ${codeTimer.seconds} sec` : 'Resend'}
        </AppText>
      </AppText>
      {(loadingLoginMutation || loadingResendOtpMutation) && <Loader style={styles.loader} />}
    </Screen>
  );
};
