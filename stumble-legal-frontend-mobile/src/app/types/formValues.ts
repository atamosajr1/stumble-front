import { InferType } from 'yup';

import {
  confirmPaymentSchema,
  loginFormSchema,
  newJobSchema,
  publicProfileSchema,
  requestServiceSchema,
  setupAccountSchema,
  sheduleRecordSchema,
} from '~/shared/utils/formSchemas';

export type LoginFormValues = InferType<typeof loginFormSchema>;
export type SetupAccountFormValues = InferType<typeof setupAccountSchema>;
export type PublicProfileFormValues = InferType<typeof publicProfileSchema>;
export type ConfirmPaymentFormValues = InferType<typeof confirmPaymentSchema>;
export type ScheduleRecordFormValues = InferType<typeof sheduleRecordSchema>;
export type RequestServiceFormValues = InferType<typeof requestServiceSchema>;
export type NewJobFormValues = InferType<typeof newJobSchema>;
