import { StyleSheet } from 'react-native';

import { makeStyles, theme } from '~/app/uiKit';
import { sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(() =>
  StyleSheet.create({
    innerStyle: {
      gap: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    fromFieldStyle: {
      height: sv(42),
      backgroundColor: theme.colors.gray[7],
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
  }),
);
