import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    childrenContainerStyle: { flex: 1, backgroundColor: theme.colors.white },
    container: {
      paddingTop: sv(24),
      paddingBottom: sv(35),
      alignItems: 'center',
      backgroundColor: theme.colors.brand.secondary,
    },
    itemStyle: {
      gap: s(10),
      marginLeft: s(15),
      paddingRight: s(20),
      paddingVertical: sv(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray[7],
    },
    itemInner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(9),
    },
    imageStyle: {
      borderRadius: 50,
      marginBottom: sv(10),
    },
  }),
);
