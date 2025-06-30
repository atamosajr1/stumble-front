import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    checkbox: {
      gap: sv(6),
      flexDirection: 'row',
      marginBottom: sv(23),
      marginTop: sv(16),
      alignItems: 'center',
    },
    childrenContainerStyle: {
      marginTop: sv(11),
    },
    field: {
      gap: sv(5),
    },
    inputIOS: {
      backgroundColor: theme.colors.brand.secondaryLight,
      color: theme.colors.white,
    },
    inputPlaceholder: {
      color: theme.colors.white,
    },
    areaText: {
      height: sv(130),
      textAlignVertical: 'top',
    },
    buttonStyle: { marginBottom: 20 },
    aboutInputStyle: {
      backgroundColor: theme.colors.brand.secondaryLight,
      color: theme.colors.white,
    },
  }),
);
