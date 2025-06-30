import { Unidentifiable } from '@appello/common';
import { AppText, Field, FieldProps } from '@appello/mobile-ui';
import { format, isValid } from 'date-fns';
import React, { FC, ReactElement, useMemo, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { DatePickerProps } from 'react-native-date-picker';

import { theme } from '~/app/uiKit';
import { DropdownIcon } from '~/assets/icons';

import { DatePickerBase } from '../../Pickers/DatePicker';
import { useStyles } from './useStyles';

interface DateTimePickerFieldProps
  extends Pick<FieldProps, 'label' | 'error'>,
    Omit<DatePickerProps, 'date' | 'mode'> {
  onSelect?: (date: string | Date) => void;
  format?: string;
  style?: ViewStyle;
  icon?: ReactElement;
  date?: Nullable<Unidentifiable<string | Date>>;
  mode?: 'date' | 'time' | 'datetime';
}

export const DateTimePickerField: FC<DateTimePickerFieldProps> = ({
  date,
  mode,
  onSelect,
  style,
  icon,
  ...props
}) => {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);

  const handleConfirm = (newDate: Date) => {
    onSelect?.(newDate);
  };
  const handleClose = () => {
    setVisible?.(false);
  };

  const parsedDate = useMemo(() => {
    if (date instanceof Date && isValid(date)) return date;

    if (typeof date === 'string') {
      const maybeDate = new Date(date);
      return isValid(maybeDate) ? maybeDate : undefined;
    }

    return undefined;
  }, [date]);

  const displayText = useMemo(() => {
    if (!parsedDate || !isValid(parsedDate)) return 'Select';

    if (mode === 'date') return format(parsedDate, 'MMM dd');
    if (mode === 'time') return format(parsedDate, 'HH:mm a');
    if (mode === 'datetime') return format(parsedDate, 'MMM dd, h:mm a');

    return 'Select';
  }, [parsedDate, mode]);

  return (
    <Field {...props}>
      <TouchableOpacity style={[styles.pickerStyle, style]} onPress={() => setVisible(true)}>
        <DatePickerBase
          mode={mode}
          setVisible={setVisible}
          value={parsedDate}
          visible={visible}
          onChange={handleConfirm}
          onClose={handleClose}
        />
        <View style={styles.innerStyle}>
          {icon}
          <AppText>{displayText}</AppText>
        </View>
        <DropdownIcon color={theme.colors.black[1]} />
      </TouchableOpacity>
    </Field>
  );
};
