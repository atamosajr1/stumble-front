import React, { FC } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import RNPickerSelect, { PickerSelectProps, PickerStyle } from 'react-native-picker-select';

import { useStyles } from './useStyles';

interface DropDownPickerProps extends PickerSelectProps {
  Icon?: React.FC;
  style?: PickerStyle;
}

export const DropDownPicker: FC<DropDownPickerProps> = ({
  style,
  Icon,
  items,
  value,
  disabled,
  placeholder,
  onDonePress,
  onValueChange,
}) => {
  const pickerStyles = useStyles();
  const isDarkMode = useColorScheme() === 'dark';

  const mergedStyles: PickerStyle = {
    inputIOS: {
      ...StyleSheet.flatten(pickerStyles.inputIOS),
      ...StyleSheet.flatten(style?.inputIOS),
    },
    inputIOSContainer: {
      ...StyleSheet.flatten(pickerStyles.inputIOSContainer),
      ...StyleSheet.flatten(style?.inputIOSContainer),
    },
    placeholder: {
      ...StyleSheet.flatten(pickerStyles.placeholder),
      ...StyleSheet.flatten(style?.placeholder),
    },
    iconContainer: {
      ...StyleSheet.flatten(pickerStyles.iconContainer),
      ...StyleSheet.flatten(style?.iconContainer),
    },
    inputAndroid: {
      ...StyleSheet.flatten(pickerStyles.inputAndroid),
      ...StyleSheet.flatten(style?.inputAndroid),
    },
    inputAndroidContainer: {
      ...StyleSheet.flatten(pickerStyles.inputAndroidContainer),
      ...StyleSheet.flatten(style?.inputAndroidContainer),
    },
  };
  return (
    <RNPickerSelect
      Icon={Icon}
      darkTheme={isDarkMode}
      disabled={disabled}
      items={items ?? []}
      placeholder={placeholder ?? { label: 'Select', value: null }}
      style={mergedStyles}
      useNativeAndroidPickerStyle={false}
      value={value}
      onDonePress={onDonePress}
      onValueChange={onValueChange}
    />
  );
};
