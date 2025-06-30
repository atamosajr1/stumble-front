import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    childrenContainerStyle: {
      borderBottomWidth: sv(0),
      backgroundColor: theme.colors.white,
      // paddingLeft: s(15),
    },
    header: {
      width: '100%',
      backgroundColor: theme.colors.brand.secondary,
      paddingBottom: sv(28),
    },
    closeButton: {
      position: 'absolute',
      right: 15,
      top: sv(12),
      width: 34,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray[7],
      borderRadius: 50,
      zIndex: 9999,
    },
    noRecords: {
      marginTop: sv(250),
      alignItems: 'center',
      justifyContent: 'center',
    },
    topAccessory: {
      width: s(110),
      height: sv(110),
      backgroundColor: theme.colors.gray[7],
      borderRadius: s(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textAlign: {
      textAlign: 'center',
    },
    flatList: { marginBottom: 50 },
    buttonStyle: { position: 'absolute', left: 16, right: 16, bottom: 16 },
  }),
);
