import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    childrenContainerStyle: {
      // borderTopWidth: 1,
    },
    field: {
      gap: sv(8),
    },
    fieldStyle: {
      width: '100%',
      height: sv(42),
      backgroundColor: theme.colors.gray[7],
    },
    areaText: {
      height: sv(130),
      textAlignVertical: 'top',
      backgroundColor: theme.colors.gray[7],
    },
    fromToStyle: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    fromFieldStyle: {
      width: s(167),
      height: sv(42),
      backgroundColor: theme.colors.gray[7],
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomSheet: {
      paddingHorizontal: 25,
      paddingTop: 10,
      paddingBottom: 13,
    },
    timeForms: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    courtFieldStyle: { marginVertical: 8 },
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  }),
);
