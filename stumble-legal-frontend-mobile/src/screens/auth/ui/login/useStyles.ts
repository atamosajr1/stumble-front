import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    textField: {
      marginTop: sv(21),
      marginBottom: sv(27),
    },
    textInput: {
      color: theme.colors.white,
      backgroundColor: theme.colors.brand.secondaryLight,
    },
    button: {
      marginBottom: sv(26),
    },
    childrenContainerStyle: {
      marginTop: sv(7),
    },
  }),
);
