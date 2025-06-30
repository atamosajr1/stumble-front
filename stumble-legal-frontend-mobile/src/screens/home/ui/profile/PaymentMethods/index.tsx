import { AppText } from '@appello/mobile-ui';
import { getErrorData } from '@appello/services/dist/rtkQuery';
import React from 'react';
import { FlatList, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { Card } from '~/app/components/Card';
import { Screen } from '~/app/components/Screen';
import { ProfileStackScreenProps } from '~/app/navigation/Profile';
import {
  useDeletePaymentMethodsMutation,
  useGetPaymentMethodsQuery,
} from '~/app/services/rtkQuery/payment/endpoints';
import { Payment } from '~/app/services/rtkQuery/payment/types';
import { useUIKitTheme } from '~/app/uiKit';
import { processApiError } from '~/shared/api';

export const PaymentMethodsScreen: React.FC<
  ProfileStackScreenProps<'PaymentMethodsScreen'>
> = () => {
  const theme = useUIKitTheme();
  const { data } = useGetPaymentMethodsQuery();
  const [deletePaymentMethod] = useDeletePaymentMethodsMutation();

  const deleteCard = async (uuid: string) => {
    try {
      await deletePaymentMethod({ uuid });
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
  };

  const renderItem = ({ item }: { item: Payment }) => {
    return <Card name={item.name} onPress={() => deleteCard(item.uuid)} />;
  };

  return (
    <Screen
      secondary
      useBottomSafeArea
      useHorizontalPadding
      useTopSafeArea
      withGoBack
      header={
        <View>
          <AppText color={theme.colors.black[1]} variant="p3">
            Payment Methods
          </AppText>
        </View>
      }
    >
      <FlatList data={data?.data} keyExtractor={state => state.uuid} renderItem={renderItem} />
    </Screen>
  );
};
