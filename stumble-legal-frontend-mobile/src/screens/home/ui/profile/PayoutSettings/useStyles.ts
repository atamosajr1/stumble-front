import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    childrenContainerStyle: {
      borderTopWidth: sv(1),
      paddingTop: sv(14),
      borderTopColor: theme.colors.gray[6],
    },
    stripeContainer: {
      width: '100%',
      paddingLeft: s(17),
      paddingRight: s(22),
      paddingVertical: sv(12),
      marginTop: sv(4),
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: theme.colors.gray[6],
    },
    stripeImage: {
      width: 52,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray[7],
    },
    buttonStyle: {
      width: 32,
      height: 32,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray[7],
    },
    containerInner: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },
  }),
);
