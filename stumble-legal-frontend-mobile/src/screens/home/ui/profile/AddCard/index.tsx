import { AppText, Button } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import { CardField, createPaymentMethod, StripeProvider } from '@stripe/stripe-react-native';
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { Screen } from '~/app/components/Screen';
import { STRIPE_PK } from '~/app/constants/env';
import { CourtsStackScreenProps } from '~/app/navigation/Courts';
import { useSetPaymentMethodsMutation } from '~/app/services/rtkQuery/payment/endpoints';
import { theme } from '~/app/uiKit';
import { processApiError } from '~/shared/api';

import { useStyles } from './useStyles';

export const AddCardScreen: React.FC<CourtsStackScreenProps<'AddCardScreen'>> = ({
  navigation,
  route: { params },
}) => {
  const styles = useStyles();
  const [setPaymentMethod] = useSetPaymentMethodsMutation();
  const [cardDetails, setCardDetails] = useState<Nullable<Details>>(null);

  const onSubmit = useCallback(async () => {
    const { paymentMethod } = await createPaymentMethod({ paymentMethodType: 'Card' });

    if (paymentMethod?.id) {
      try {
        await setPaymentMethod({ paymentMethodId: paymentMethod.id })
          .unwrap()
          .then(() => {
            navigation.goBack();
            if (params?.goBack) {
              params?.goBack();
            }
          });
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
    }
  }, [navigation, params, setPaymentMethod]);
  const validCardDetails = useMemo(() => {
    return (
      cardDetails?.validCVC === 'Valid' &&
      cardDetails?.validExpiryDate === 'Valid' &&
      cardDetails?.validNumber === 'Valid'
    );
  }, [cardDetails?.validCVC, cardDetails?.validExpiryDate, cardDetails?.validNumber]);
  return (
    <StripeProvider publishableKey={STRIPE_PK}>
      <Screen
        secondary
        useBottomSafeArea
        useHorizontalPadding
        useTopSafeArea
        withGoBack
        goBackButton={() => {
          if (params.goBack) {
            navigation.goBack();
            params?.goBack();
          } else {
            navigation.goBack();
          }
        }}
        header={
          <View>
            <AppText color={theme.colors.black[1]} variant="p3">
              Add Card
            </AppText>
          </View>
        }
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <CardField
              cardStyle={styles.card}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              postalCodeEnabled={false}
              style={styles.cardContainer}
              onCardChange={card => {
                setCardDetails(card);
              }}
            />
            <Button disabled={!validCardDetails} onPress={onSubmit}>
              Add Card
            </Button>
          </View>
        </ScrollView>
      </Screen>
    </StripeProvider>
  );
};
