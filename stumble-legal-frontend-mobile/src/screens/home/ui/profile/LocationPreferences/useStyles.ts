import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    scrollView: {
      paddingBottom: sv(66),
    },
    range: {
      width: '100%',
      marginBottom: sv(3),
    },
    rangeButton: {
      paddingHorizontal: s(12),
      paddingVertical: sv(5),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray[7],
      borderRadius: 50,
      marginRight: s(5),
    },
    checkbox: {
      flexDirection: 'row',
      gap: s(10),
      padding: s(20),
      borderWidth: 1,
      borderColor: theme.colors.gray[6],
      marginBottom: sv(9),
      marginTop: sv(5),
    },
    childrenContainerStyle: {
      borderTopWidth: sv(1),
      paddingTop: sv(14),
      borderTopColor: theme.colors.gray[6],
    },
    checkBoxStyle: {
      borderColor: theme.colors.global.whiteLight[2],
    },
  }),
);
