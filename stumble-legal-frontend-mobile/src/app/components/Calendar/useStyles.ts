import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    calendar: {
      height: sv(80),
      width: '100%',
      marginBottom: sv(8),
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: s(10),
      marginBottom: sv(10),
    },
    dayName: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    dateHeader: {
      color: 'blue',
    },
    highlightDateNumberStyle: {
      color: 'white',
      fontSize: 13,
      lineHeight: 23,
    },
    highlightDateNumberContainerStyle: {
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      width: s(24),
      height: sv(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateNumberStyle: {
      color: theme.colors.black[1],
      fontSize: 13,
      lineHeight: sv(23),
      fontWeight: '400',
    },
    dateNameStyle: {
      fontSize: 12,
      lineHeight: sv(21),
      color: 'rgba(15, 16, 16, 0.4)',
    },
    sundayDateName: {
      color: theme.colors.black[1],
      fontSize: 12,
      lineHeight: sv(21),
      opacity: 0.4,
    },
    sundayDateNumber: {
      color: theme.colors.black[1],
      opacity: 0.5,
      fontSize: 13,
      lineHeight: sv(23),
    },
  }),
);
