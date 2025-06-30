import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    childrenContainerStyle: {
      borderBottomWidth: sv(0),
      backgroundColor: theme.colors.white,
      paddingVertical: sv(15),
      paddingLeft: s(15),
    },
    userItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray[6],
      paddingVertical: sv(15),
      paddingRight: s(15),
    },
    bottomSheet: {
      paddingHorizontal: s(15),
    },
    header: {
      width: '100%',
      backgroundColor: theme.colors.brand.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: sv(50),
      paddingBottom: sv(55),
    },
    headerTypes: {
      flexDirection: 'row',
    },
    headerButtons: {
      flexDirection: 'row',
      gap: s(11),
      marginTop: sv(22),
    },
    checkInButton: {
      backgroundColor: theme.colors.global.whiteLight[1],
    },
    checkOutButton: {
      backgroundColor: theme.colors.red,
    },
    buttonStyle: {
      width: s(130),
    },
    calendarStyle: {
      paddingRight: s(15),
    },
    closeButton: {
      position: 'absolute',
      right: 0,
      top: sv(12),
      width: 34,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray[7],
      borderRadius: 50,
      zIndex: 9999,
    },
    sheetInner: {
      alignItems: 'center',
      marginBottom: sv(18),
      paddingTop: sv(28),
    },
    phoneStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(3),
      marginTop: sv(5),
    },
    requestService: {
      marginTop: sv(24),
    },
    userItemInner: {
      flexDirection: 'row',
      gap: s(9),
      alignItems: 'center',
    },
    userTypes: {
      flexDirection: 'row',
      gap: s(7),
    },
    inCourt: {
      width: s(50),
      height: sv(21),
      borderRadius: 3,
      backgroundColor: theme.colors.global.greenLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStyle: {
      borderRadius: 50,
    },
    bottomSheetInner: { marginBottom: 30 },
  }),
);
