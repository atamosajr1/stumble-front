import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    container: {
      marginBottom: sv(18),
      paddingTop: sv(23),
      paddingHorizontal: s(15),
    },
    imageStyle: {
      borderRadius: 50,
    },
    line: {
      height: 1,
      backgroundColor: theme.colors.gray[6],
    },
    innerStyle: { flexDirection: 'row', marginBottom: sv(15) },
    dateCourtStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: sv(19),
      gap: s(2),
    },
    userDetail: { flexDirection: 'row', alignItems: 'center', gap: 11 },
    topAccessory: {
      width: s(110),
      height: sv(110),
      backgroundColor: theme.colors.gray[7],
      borderRadius: s(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttons: { flexDirection: 'row', gap: s(13), marginTop: sv(10) },
    containerInner: {
      gap: 14,
    },
  }),
);
