import { ComponentsConfig } from '@appello/mobile-ui';
import { StyleSheet } from 'react-native';

import { makeDefaultProps, makeStyles, theme } from '..';

export const ButtonSecondaryConfig: ComponentsConfig['Button.Secondary'] = {
  styles: makeStyles(() =>
    StyleSheet.create({
      button: {
        height: 42,
        borderRadius: 0,
      },
      'button--disabled': {
        backgroundColor: theme.colors.global.whiteLight[1],
        color: theme.colors.global.whiteLight[3],
      },
      button__label: {
        textTransform: 'uppercase',
        fontWeight: '500',
      },
    }),
  ),
  // Set up default props here
  defaultProps: makeDefaultProps(theme => ({
    labelProps: {
      color: theme.colors.white,
      variant: 'p3',
      weight: 'medium',
    },

    loaderColor: theme.colors.white,
  })),
};
