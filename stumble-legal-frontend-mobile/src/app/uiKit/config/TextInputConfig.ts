import { ComponentsConfig } from '@appello/mobile-ui';
import { StyleSheet } from 'react-native';

import { makeDefaultProps, makeStyles } from '..';

export const TextInputConfig: ComponentsConfig['TextInput'] = {
  styles: makeStyles(() =>
    StyleSheet.create({
      'text-input': {
        height: 42,
        borderRadius: 0,
        paddingLeft: 16,
        borderWidth: 0,
        fontFamily: 'Roboto',
        fontSize: 12,
      },
    }),
  ),
  defaultProps: makeDefaultProps(theme => ({
    placeholderTextColor: theme.colors.global.whiteLight[3],
  })),
};
