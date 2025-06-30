import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    field: {
      gap: sv(5),
    },
    fieldStyle: {
      backgroundColor: theme.colors.brand.secondaryLight,
      color: theme.colors.white,
    },
    nameFieldsStyle: {
      width: s(162),
    },
    buttonContainer: {
      marginVertical: sv(23),
    },
    textStyle: { textAlign: 'center' },
    nameFields: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    childrenContainerStyle: {
      marginTop: sv(11),
    },
    disabledButton: {
      backgroundColor: 'red',
    },
  }),
);
