import { StyleSheet } from 'react-native';

import { makeStyles, theme } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(() =>
  StyleSheet.create({
    pickerStyle: {
      width: s(167),
      height: sv(42),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.gray[7],
      paddingHorizontal: s(16),
    },
    innerStyle: {
      gap: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
);
