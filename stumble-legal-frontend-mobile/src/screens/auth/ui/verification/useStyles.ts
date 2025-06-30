import { chroma } from '@appello/mobile-ui';
import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    text: {
      color: theme.colors.white,
      marginBottom: sv(18),
      paddingHorizontal: s(20),
      textAlign: 'center',
    },
    cellText: {
      fontSize: 38,
      lineHeight: sv(53),
    },
    codeField: {
      marginBottom: sv(27),
      marginHorizontal: s(20),
    },
    cell: {
      width: s(63),
      height: sv(83),
      backgroundColor: theme.colors.brand.secondaryLight,
      justifyContent: 'center',
      alignItems: 'center',
    },

    cellBorder: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      height: 1,
      borderRadius: 2,
      backgroundColor: chroma(theme.colors.black[1]).alpha(0.3).hex(),
    },
    cellBorderFocused: {
      backgroundColor: theme.colors.primary,
    },
    loader: {
      marginTop: sv(20),
    },
    childrenContainerStyle: {
      borderBottomWidth: 0,
      marginTop: sv(30),
    },
  }),
);
