import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    container: {
      width: 72,
      gap: sv(5),
    },
    imageStyle: {
      borderRadius: 50,
    },
    uploadImage: {
      width: 120,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.global.whiteLight[1],
    },
    editUploadImage: {
      backgroundColor: theme.colors.brand.secondary,
    },

    deleteImage: {
      width: 26,
      height: 26,
      backgroundColor: theme.colors.brand.secondary,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
    },
    editDeletImage: {
      backgroundColor: theme.colors.white,
    },
  }),
);
