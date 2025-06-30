import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    dropdownFieldStyle: {
      height: sv(42),
      borderRadius: 0,
      paddingLeft: s(16),
      borderWidth: 0,
      backgroundColor: theme.colors.gray[7],
      color: theme.colors.black[1],
    },
    fieldStyle: {
      backgroundColor: theme.colors.gray[7],
      color: theme.colors.black[2],
      // height: sv(42),
      // paddingLeft: 25,
    },
    feeStyle: {
      width: s(167),
    },
    payFieldStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
    },
    checkBoxStyle: {
      borderColor: theme.colors.global.whiteLight[2],
    },
    checkBoxField: {
      gap: s(6),
      marginTop: sv(25),
      flexDirection: 'row',
      alignItems: 'center',
    },
    areaText: {
      height: sv(110),
      textAlignVertical: 'top',
      backgroundColor: theme.colors.gray[7],
    },
    documentStyle: {
      width: s(36),
      height: sv(36),
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.global.blue,
    },
    uploadFile: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray[6],
      paddingHorizontal: 15,
      paddingVertical: 14,
    },
    file: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
    },
    bottomSheet: {
      paddingHorizontal: s(15),
    },
    closeButton: {
      position: 'absolute',
      right: 0,
      top: sv(12),
      width: 34,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray[7],
      borderRadius: 50,
      zIndex: 9999,
    },
    sheetInner: {
      // alignItems: 'center',
      marginBottom: sv(18),
      paddingTop: sv(28),
    },
    addNew: { position: 'absolute', right: 0 },
    paymentStyle: { gap: 12, marginBottom: 28 },
    paymentItem: { flexDirection: 'row', justifyContent: 'space-between' },
    textStyle: { textAlign: 'center', marginTop: 8 },
    borderStyle: { height: 1, backgroundColor: theme.colors.gray[6] },
    paymentField: { marginTop: 17, marginBottom: 23 },
    attachmentList: { gap: 8 },
    fromFieldStyle: {
      height: sv(42),
      backgroundColor: theme.colors.gray[7],
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    dateStyle: { width: '100%' },
    topAccessory: {
      width: s(110),
      height: sv(110),
      backgroundColor: theme.colors.gray[7],
      borderRadius: s(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: { zIndex: -1 },
  }),
);
