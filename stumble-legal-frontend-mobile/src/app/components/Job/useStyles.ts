import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    location: {
      gap: s(3),
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 3,
    },
    container: {
      borderBottomWidth: sv(1),
      borderBottomColor: theme.colors.gray[6],
      paddingTop: sv(11),
      paddingBottom: sv(17),
      paddingRight: s(15),
      marginLeft: s(15),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: s(9),
    },
    createdType: {
      marginRight: s(7),
      paddingHorizontal: s(8),
      paddingVertical: sv(4),
      backgroundColor: theme.colors.gray[7],
    },
  }),
);
