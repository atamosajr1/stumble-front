import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(() =>
  StyleSheet.create({
    backgroundStyle: { width: '100%' },
    done: { alignItems: 'flex-end' },
    bottomSheet: {
      paddingHorizontal: s(25),
      paddingTop: sv(10),
      paddingBottom: sv(13),
    },
  }),
);
