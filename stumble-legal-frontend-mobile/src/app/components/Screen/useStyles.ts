import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.brand.secondary,
      paddingTop: sv(6),
    },
    containerSecondary: {
      backgroundColor: theme.colors.white,
    },
    containerwithoutGoBack: {
      paddingTop: sv(5),
    },
    graphics: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: -1,
      width: '100%',
      height: sv(221),
      resizeMode: 'cover',
    },
    header: {
      marginLeft: s(20),
      marginTop: sv(27),
    },
    secondaryTitle: {
      alignItems: 'center',
    },
    secondaryheader: {
      justifyContent: 'center',
      marginTop: sv(10),
      marginBottom: sv(10),
    },
    childrenContainerStyle: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: theme.colors.gray[6],
      borderBottomColor: theme.colors.gray[6],
      marginTop: sv(10),
      paddingTop: sv(12),
    },
    childrenContainerWithHorizontalPadding: {
      paddingHorizontal: sv(15),
    },
    childrenContainerWithAdditionalBottomPadding: {
      paddingBottom: sv(10),
      borderTopWidth: 1,
      borderTopColor: theme.colors.gray[6],
      paddingTop: sv(10),
    },
    goBack: {
      position: 'absolute',
      left: 15,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    buttonsWrapper: {
      paddingHorizontal: s(15),
      paddingTop: sv(10),
      paddingBottom: sv(2),
      backgroundColor: theme.colors.white,
      borderTopColor: theme.colors.gray[6],
      borderTopWidth: 1,
    },
    buttenBorder: {
      marginBottom: 10,
      marginHorizontal: -20,
      height: 1,
      backgroundColor: theme.colors.gray[6],
      zIndex: -1,
    },
  }),
);
