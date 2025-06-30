import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    childrenContainerStyle: {},
    scheduleItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: theme.colors.gray[6],
      paddingVertical: sv(16),
      paddingRight: s(15),
    },
    iconStyle: {
      width: s(40),
      height: sv(40),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray[8],
      borderRadius: 50,
    },
    menuItemStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(20),
      marginTop: sv(25),
    },
    bottomSheet: {
      paddingHorizontal: s(25),
      paddingTop: s(26),
      paddingBottom: sv(13),
    },
    textAlign: {
      textAlign: 'center',
    },
    noRecords: {
      marginTop: sv(250),
      alignItems: 'center',
      justifyContent: 'center',
    },
    calendarStyle: { marginHorizontal: 15 },
    buttonStyle: { marginHorizontal: 15 },
    scheduleLsit: { marginLeft: 15 },
  }),
);
