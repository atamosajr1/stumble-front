import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';

export const useStyles = makeStyles(() =>
  StyleSheet.create({
    view: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewFull: {
      flex: 1,
    },
  }),
);
