/**
 * @file form schemas
 */

import { isValidPhoneNumber } from 'libphonenumber-js';
import { parsePhoneNumber } from 'libphonenumber-js/max';
import * as Yup from 'yup';

import { formErrors } from '~/app/constants/form';

const phoneNumberSchema = Yup.string().test({
  message: formErrors.INVALID_PHONE_NUMBER,
  test: value => {
    if (!value) return true;
    return isValidPhoneNumber(value, { defaultCountry: 'AU' });
  },
});

const withPhoneNumberSchema = (schema: Yup.StringSchema) => {
  return schema.concat(phoneNumberSchema).transform(value => {
    try {
      const phoneNumber = parsePhoneNumber(value, 'AU');
      return phoneNumber.number.toString();
    } catch (e) {
      return value;
    }
  });
};

export const loginFormSchema = Yup.object({
  phone: withPhoneNumberSchema(Yup.string().required(formErrors.REQUIRED)).required(
    formErrors.REQUIRED,
  ),
});

export const setupAccountSchema = Yup.object({
  firstName: Yup.string().required(formErrors.REQUIRED),
  lastName: Yup.string().required(formErrors.REQUIRED),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, formErrors.INVALID_EMAIL)
    .required(formErrors.REQUIRED),
  lawFirm: Yup.string().nullable(),
  abn: Yup.string()
    .test('min-length', formErrors.MIN_LENGTH, value => {
      if (!value) return true; // Allow empty value (not required)
      return value.length >= 9; // Validate only if input is not empty
    })
    .nullable(),
});

export const publicProfileSchema = Yup.object({
  role: Yup.string().required(formErrors.REQUIRED),
  practiceArea: Yup.string().required(formErrors.REQUIRED),
  city: Yup.string().required(formErrors.REQUIRED),
  about: Yup.string()
    .nullable()
    .max(512, 'The "About me" field must be no more than 512 characters.'),
  photoKey: Yup.string().nullable(),
});

export const requestServiceSchema = Yup.object({
  dttm: Yup.string().required(formErrors.REQUIRED),
  type: Yup.string().required(formErrors.REQUIRED),
  fee: Yup.string().required(formErrors.REQUIRED),
  instructions: Yup.string().nullable(),
  summary: Yup.string().nullable(),
  inAppPayment: Yup.boolean().required(formErrors.REQUIRED),
  courtUuid: Yup.string().required(formErrors.REQUIRED),
  associatedToUuid: Yup.string().required(formErrors.REQUIRED),
  attachments: Yup.array().nullable(),
  paymentMethodUuid: Yup.string().nullable(),
});
export const newJobSchema = Yup.object({
  dttm: Yup.string().required(formErrors.REQUIRED),
  type: Yup.string().required(formErrors.REQUIRED),
  fee: Yup.string().required(formErrors.REQUIRED),
  instructions: Yup.string().nullable(),
  summary: Yup.string().nullable(),
  inAppPayment: Yup.boolean().required(formErrors.REQUIRED),
  courtUuid: Yup.string().required(formErrors.REQUIRED),
  attachments: Yup.array().nullable(),
  paymentMethodUuid: Yup.string().nullable(),
});

export const confirmPaymentSchema = Yup.object({
  confirmPayment: Yup.string().required(formErrors.REQUIRED),
});

export const sheduleRecordSchema = Yup.object({
  date: Yup.string().required(formErrors.REQUIRED),
  courtUuid: Yup.string().required(formErrors.REQUIRED),
  startDttm: Yup.string().required(formErrors.REQUIRED),
  endDttm: Yup.string().required(formErrors.REQUIRED),
});
