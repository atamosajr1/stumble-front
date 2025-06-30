import { ComponentsConfig } from '@appello/mobile-ui';
import { StyleSheet } from 'react-native';

import { makeDefaultProps, makeStyles } from '~/app/uiKit';

export const AppTextConfig: ComponentsConfig['AppText'] = {
  styles: makeStyles(() =>
    StyleSheet.create({
      'app-text': {},
      // Put font-sizes, line-height and font-families if needed here
      'app-text--h1': {},
      'app-text--h2': {
        fontFamily: 'Roboto-Bold',
        fontSize: 29,
        lineHeight: 42,
      },
      'app-text--h3': {
        fontFamily: 'Roboto-Bold',
        fontSize: 29,
        lineHeight: 42,
      },
      'app-text--h4': {},
      'app-text--h5': {
        fontFamily: 'Roboto-Bold',
        fontSize: 19,
        lineHeight: 30,
      },
      'app-text--h6': {},
      'app-text--p1': {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        lineHeight: 27,
      },
      'app-text--p2': {},
      'app-text--p3': {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        lineHeight: 23,
      },
      'app-text--p4': {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        lineHeight: 21,
      },
      'app-text--p5': {
        fontFamily: 'Roboto-Regular',
        fontSize: 11,
        lineHeight: 19,
      },
      'app-text--p6': {},

      // Put font-families here
      'app-text--light': {
        fontFamily: 'Roboto-Light',
      },
      'app-text--regular': {
        fontFamily: 'Roboto-Regular',
      },
      'app-text--medium': {
        fontFamily: 'Roboto-Medium',
      },
      'app-text--bold': {
        fontFamily: 'Roboto-Bold',
      },
    }),
  ),
  // Set up default props here
  defaultProps: makeDefaultProps(theme => ({
    color: theme.colors.black[1],
  })),
};
