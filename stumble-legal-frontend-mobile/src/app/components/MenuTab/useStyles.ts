import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';

export const useStyles = makeStyles(() =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 28,
    },
    border: {
      borderBottomWidth: 2,
      borderColor: 'white',
    },
  }),
);
