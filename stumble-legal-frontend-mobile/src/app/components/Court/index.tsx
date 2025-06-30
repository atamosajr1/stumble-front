import { AppText } from '@appello/mobile-ui';
import React, { FC, memo, ReactElement } from 'react';
import { Pressable, View } from 'react-native';

import { Courts } from '~/app/services/rtkQuery/courts/types';
import { theme } from '~/app/uiKit';
import { formatDistanceToMeters } from '~/shared/utils/formatDistanceToMeter';

import { useStyles } from './useStyles';

export interface CourtProps extends Courts {
  icon?: ReactElement;
  onPress: () => void;
  withDistance?: boolean;
}

export const Court: FC<CourtProps> = memo(
  ({ name, types, distance, withDistance, level, icon, onPress }) => {
    const styles = useStyles();

    return (
      <Pressable style={styles.courtsContainer} onPress={onPress}>
        <View>
          <AppText color={theme.colors.black[1]} variant="p1" weight="medium">
            {name}
          </AppText>
          <View style={styles.row}>
            {withDistance && distance && (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {formatDistanceToMeters(distance)}
              </AppText>
            )}
            {withDistance && distance && level && (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {' '}
                •{' '}
              </AppText>
            )}
            {level && (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {level}
              </AppText>
            )}
            {!!types.length && level && (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {' '}
                •{' '}
              </AppText>
            )}
            {!!types.length && (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {types[0]}
              </AppText>
            )}
          </View>
        </View>
        {icon}
      </Pressable>
    );
  },
);
