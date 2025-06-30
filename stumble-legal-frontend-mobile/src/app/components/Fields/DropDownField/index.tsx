import { Field, FieldProps } from '@appello/mobile-ui';
import React, { FC } from 'react';
import { PickerSelectProps } from 'react-native-picker-select';

import { DropDownPicker } from '../../Pickers/DropDownPicker';

interface DropDownFieldProps extends Pick<FieldProps, 'label' | 'error'>, PickerSelectProps {}

export const DropDownField: FC<DropDownFieldProps> = ({ label, error, ...props }) => {
  return (
    <Field error={error} label={label}>
      <DropDownPicker {...props} />
    </Field>
  );
};
