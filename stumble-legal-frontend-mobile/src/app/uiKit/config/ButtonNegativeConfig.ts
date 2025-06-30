import { ComponentsConfig } from '@appello/mobile-ui';
import { StyleSheet } from 'react-native';

import { makeDefaultProps, makeStyles } from '..';

export const ButtonNegativeConfig: ComponentsConfig['Button.Negative'] = {
  styles: makeStyles(() =>
    StyleSheet.create({
      button: {
        height: 42,
        borderRadius: 0,
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
      color: theme.colors.red,
      variant: 'p3',
      weight: 'medium',
    },
    loaderColor: theme.colors.red,
  })),
};
