import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    childrenContainerStyle: {
      borderBottomWidth: 0,
    },
    dropdownFieldStyle: {
      height: sv(35),
      width: s(120),
      backgroundColor: theme.colors.gray[7],
      borderRadius: 5,
    },
    typesStyles: {
      flexDirection: 'row',
      gap: s(10),
      paddingVertical: sv(16),
      borderBottomWidth: 1,
      borderColor: theme.colors.gray[6],
      paddingHorizontal: s(15),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchStyle: {
      width: s(311),
      borderWidth: 1,
      borderColor: theme.colors.gray[6],
      marginLeft: s(50),
    },
    courtsContainer: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray[6],
      paddingVertical: sv(13),
      paddingHorizontal: s(15),
    },
    courtList: {
      marginLeft: 15,
    },
    secondaryTitle: { alignItems: 'flex-start' },
    empatyStyle: { marginTop: sv(250), alignItems: 'center', justifyContent: 'center' },
    dropDownStyle: { width: s(120) },
  }),
);
