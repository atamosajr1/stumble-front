export type PaymentMethodResponse = {
  data: Payment[];
  total: 0;
};

export type Payment = {
  uuid: string;
  name: string;
  paymentMethodId: string;
};
