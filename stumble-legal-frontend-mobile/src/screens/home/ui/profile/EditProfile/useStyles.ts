import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    childrenContainerStyle: {
      // borderTopWidth: 1,
    },
    field: {
      gap: sv(5),
    },
    dropdownFieldStyle: {
      height: sv(42),
      borderRadius: 0,
      paddingLeft: s(16),
      borderWidth: 0,
      backgroundColor: theme.colors.gray[7],
      color: theme.colors.black[2],
    },
    areaText: {
      height: sv(130),
      textAlignVertical: 'top',
      backgroundColor: theme.colors.gray[7],
    },
    profilePicture: {
      marginBottom: 8,
    },
  }),
);
