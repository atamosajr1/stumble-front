import { AppText, Field, FieldProps } from '@appello/mobile-ui';
import React, { FC } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { theme } from '~/app/uiKit';
import { DropdownIcon } from '~/assets/icons';

import { useStyles } from './useStyles';

interface NavigateFieldProps extends Pick<FieldProps, 'label' | 'error'> {
  style?: ViewStyle;
  value: Nullable<string>;
  onPress: () => void;
}

export const NavigateField: FC<NavigateFieldProps> = ({ onPress, style, value, ...props }) => {
  const styles = useStyles();

  return (
    <Field {...props}>
      <TouchableOpacity style={[styles.fromFieldStyle, style]} onPress={onPress}>
        <AppText color={theme.colors.black[1]} variant="p3">
          {value || 'Select'}
        </AppText>
        <DropdownIcon color={theme.colors.black[1]} />
      </TouchableOpacity>
    </Field>
  );
};
