import { rtkQuery } from '..';
import { TAGS } from '../utils';
import { PaymentMethodResponse } from './types';

const paymentRtk = rtkQuery.injectEndpoints({
  endpoints: builder => ({
    getPaymentMethods: builder.query<PaymentMethodResponse, void>({
      query: data => ({
        url: `api/v1/users/me/payment-methods`,
        method: 'GET',
        params: data,
      }),
      providesTags: [TAGS.PAYMENT_METHOD],
    }),
    setPaymentMethods: builder.mutation<void, { paymentMethodId: string }>({
      query: data => ({
        url: `api/v1/users/me/payment-methods`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [TAGS.PAYMENT_METHOD],
    }),
    deletePaymentMethods: builder.mutation<void, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/users/me/payment-methods/${uuid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.PAYMENT_METHOD],
    }),
  }),
});

export { paymentRtk };

export const {
  useSetPaymentMethodsMutation,
  useGetPaymentMethodsQuery,
  useDeletePaymentMethodsMutation,
} = paymentRtk;
