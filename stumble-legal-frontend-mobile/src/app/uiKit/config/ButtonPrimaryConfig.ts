import { ComponentsConfig } from '@appello/mobile-ui';
import { StyleSheet } from 'react-native';

import { makeDefaultProps, makeStyles, theme } from '..';

export const ButtonPrimaryConfig: ComponentsConfig['Button.Primary'] = {
  styles: makeStyles(() =>
    StyleSheet.create({
      button: {
        height: 42,
        borderRadius: 0,
        backgroundColor: theme.colors.brand.accent,
      },
      'button--disabled': {
        backgroundColor: theme.colors.gray[5],
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
