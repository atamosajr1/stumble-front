import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    deleteImage: {
      width: s(26),
      height: sv(26),
      backgroundColor: theme.colors.brand.secondary,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
    },
  }),
);
