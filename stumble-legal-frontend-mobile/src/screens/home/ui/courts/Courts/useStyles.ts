import { StyleSheet } from 'react-native';

import { makeStyles, theme } from '~/app/uiKit';
import { s, sv } from '~/shared/utils/scaler';

export const useStyles = makeStyles(() =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      paddingTop: sv(0),
    },
    mapRoot: {
      height: sv(375),
      zIndex: 0,
    },
    sheetBackground: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: '#fff',
    },
    handleContainer: {
      alignItems: 'center',
      paddingVertical: sv(10),
      backgroundColor: '#fff',
    },
    indicator: {
      width: s(60),
      height: sv(5),
      borderRadius: 3,
      backgroundColor: '#ddd',
    },
    searchStyle: {
      width: '100%',
      borderWidth: s(1),
      borderColor: theme.colors.gray[6],
    },
    typesStyles: {
      flexDirection: 'row',
      gap: s(10),
      paddingVertical: sv(16),
      borderColor: theme.colors.gray[6],
    },
    dropdownFieldStyle: {
      height: sv(35),
      width: s(120),
      backgroundColor: theme.colors.gray[7],
      borderRadius: 5,
    },
    markerContainer: {
      alignItems: 'center',
    },
    userBubble: {
      backgroundColor: '#28a745',
      borderRadius: 5,
      paddingVertical: sv(5),
      paddingHorizontal: s(8),
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: sv(10),
    },

    pin: {
      width: s(14),
      height: sv(14),
      backgroundColor: '#007AFF',
      borderRadius: 7,
    },
    trangle: {
      position: 'absolute',
      bottom: -3,
      left: s(15),
      width: s(7),
      height: sv(7),
      backgroundColor: '#28a745',
      transform: [{ rotate: '45deg' }],
      marginTop: sv(10),
    },
    bottomSheet: {
      flex: 1,
      paddingLeft: s(15),
    },
    courtList: { marginRight: s(-15), flex: 1 },
    topAccessory: {
      width: s(110),
      height: sv(110),
      backgroundColor: theme.colors.gray[7],
      borderRadius: s(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    accessoryStyle: {
      alignItems: 'center',
      width: '100%',
      marginBottom: sv(-40),
    },
    checkIn: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(10),
      marginTop: sv(20),
      paddingHorizontal: s(20),
      paddingVertical: sv(21),
      borderWidth: s(1),
      borderColor: theme.colors.gray[6],
      borderRadius: 6,
    },
    checkbox: {
      borderWidth: s(1),
      borderColor: theme.colors.gray[6],
    },
    range: {
      width: '100%',
      marginTop: sv(9),
      marginBottom: sv(3),
    },
    rangeButton: {
      paddingHorizontal: 12,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray[7],
      borderRadius: 50,
      marginRight: 5,
    },
    locationStyle: {
      width: 64,
      height: 64,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.global.whiteLight[1],
    },
    blurContainer: {
      flex: 1,
      zIndex: 999,
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 112,
    },
    textStyle: { textAlign: 'center', marginBottom: 16, marginTop: 13 },
    blurStyle: { ...StyleSheet.absoluteFillObject },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(5, 15, 22, 0.7)', // Dark transparent layer
    },
    absolute: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 999,
    },
    animatedBlur: {
      position: 'absolute',
      height: sv(390),
      width: '100%',
      elevation: 0.5,
      zIndex: 0.5,
      opacity: 0.5,
    },
    empatyStyle: { marginTop: sv(80), alignItems: 'center', justifyContent: 'center' },
  }),
);
