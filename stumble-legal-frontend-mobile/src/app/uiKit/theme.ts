import { makeTheme } from '@appello/mobile-ui';

/* Set up theme from the project design here */
const theme = makeTheme({
  colors: {
    brand: {
      secondary: '#06162A',
      secondaryLight: 'rgba(255, 255, 255, 0.05)',
      accent: '#096DC4',
      additional: '#103177',
    },
    global: {
      blueDark: '#1E88E5',
      whiteLight: {
        1: 'rgba(255, 255, 255, 0.1)',
        2: 'rgba(255, 255, 255, 0.2)',
        3: 'rgba(255, 255, 255, 0.3)',
        5: 'rgba(255, 255, 255, 0.5)',
        6: 'rgba(255, 255, 255, 0.5)',
        7: 'rgba(255, 255, 255, 0.7)',
        8: 'rgba(255, 255, 255, 0.5)',
      },
      whiteGrayLight: 'rgba(255, 255, 255, 0.3)',
      greenDark: '#27AE60',
      greenLight: 'rgba(39, 174, 96, 0.1)',
      blue: '#1E88E51A',
      orange: '#F57F17',
    },
    red: '#EF4646',
    gray: {
      1: '#6F6F75',
      2: '#91919E',
      5: '#E8E8F4',
      6: '#F0F0F6',
      7: '#F9F9FB',
      8: '#F6F6F6',
    },
  },
  layout: {
    padding: 20,
  },
  shadow: {
    1: {
      shadowColor: '#656565',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 18,
      elevation: 18,
    },
  },
});

export type ThemeType = typeof theme;

export { theme };
