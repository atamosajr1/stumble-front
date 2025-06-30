import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: sv(20),
      borderWidth: 1,
      borderColor: theme.colors.gray[6],
      marginBottom: sv(12),
    },
    cardDetails: {
      flexDirection: 'row',
    },
  }),
);
