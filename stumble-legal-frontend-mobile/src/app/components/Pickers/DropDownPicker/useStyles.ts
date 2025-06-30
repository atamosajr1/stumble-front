import { PickerStyle } from 'react-native-picker-select';

import { theme } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = (): PickerStyle => ({
  inputIOS: {
    height: sv(42),
    fontSize: 12,
    paddingVertical: sv(11),
    paddingHorizontal: s(16),
    color: 'black',
    backgroundColor: theme.colors.gray[7],
  },
  inputAndroid: {
    height: sv(42),
    fontSize: 12,
    paddingVertical: sv(11),
    paddingHorizontal: s(16),
    color: 'black',
    backgroundColor: theme.colors.gray[7],
  },
  iconContainer: {
    paddingVertical: sv(13),
    paddingRight: s(16),
  },
  placeholder: {
    fontSize: 12,
    color: theme.colors.black[1],
  },
});
