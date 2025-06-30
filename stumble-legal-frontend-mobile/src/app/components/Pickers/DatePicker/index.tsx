import React, { FC, memo, ReactElement, useState } from 'react';
import { useColorScheme } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export interface DatePickerBaseProps {
  value?: Date;
  mode?: 'date' | 'time' | 'datetime';
  max?: Date;
  min?: Date;
}

interface Props extends DatePickerBaseProps {
  onChange: (date: Date) => void;
  onClose: () => void;
  visible?: boolean;
  setVisible: (visible: boolean) => void;
}

const minuteInterval = 5;

export const DatePickerBase: FC<Props> = memo(
  ({
    visible,
    setVisible,
    max,
    min = new Date(1850, 0, 1),
    value,
    mode = 'date',
    onClose,
    onChange,
  }) => {
    const [date, setDate] = useState(value || new Date());
    const isDarkMode = useColorScheme() === 'dark';

    const handleConfirm = (selectedDate: Date): void => {
      setVisible(false);
      setDate(selectedDate);
      onChange(selectedDate);
      onClose?.();
    };

    const handleCancel = (): void => {
      setVisible(false);
      onClose?.();
    };

    const renderDatePicker = (): ReactElement => {
      return (
        <DateTimePickerModal
          is24Hour
          date={date}
          isVisible={visible}
          maximumDate={max}
          minimumDate={min}
          minuteInterval={minuteInterval}
          mode={mode}
          themeVariant={isDarkMode ? 'dark' : 'light'} // 👈 dynamic mode
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      );
    };

    return <>{renderDatePicker()}</>;
  },
);
