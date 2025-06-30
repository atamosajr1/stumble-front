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
    popupTextContainer: { alignItems: 'flex-start', width: '100%', paddingBottom: sv(14) },
    buttons: { flexDirection: 'row', marginTop: sv(10), gap: s(13) },
    containerInner: {
      gap: 14,
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
  }),
);
