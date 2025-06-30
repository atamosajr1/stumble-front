import { StyleSheet } from 'react-native';

import { makeStyles } from '~/app/uiKit';

export const useStyles = makeStyles(theme =>
  StyleSheet.create({
    buttonContainer: {
      backgroundColor: theme.colors.white,
      paddingTop: 15,
      paddingHorizontal: theme.layout.padding,
      paddingBottom: 6,
      ...theme.shadow[1],
    },
    scrollView: {
      // paddingTop: 20,
      paddingBottom: 66,
    },
    cardContainerStyle: {
      width: '100%',
      height: 100,
    },
    cardStyle: {
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
      borderColor: '#ddd',
      borderWidth: 1,
      fontSize: 18,
      color: '#000',
      flexDirection: 'column',
    },
    cardField: {
      marginVertical: 12,
    },
    fieldStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardStyles: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
    },
    addCard: {
      width: '100%',
      height: 200,
      marginTop: 20,
    },
    cardForm: {
      width: 200,
      // backgroundColor: 'red',
      // color: '#000000',
      height: 100,
      flex: 1,
    },
    container: {
      padding: 20,
    },
    cardContainer: {
      height: 50,
      marginVertical: 30,
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 8,
      color: '#000000',
      fontSize: 16,
    },
  }),
);
