import { AppText } from '@appello/mobile-ui';
import React, { FC, memo, ReactElement } from 'react';
import { Pressable, View } from 'react-native';

import { theme } from '~/app/uiKit';
import { UserProfileModel } from '~/entities/user';

import { Avatar } from '../Avatar';
import { useStyles } from './useStyles';

export interface AssociateProps extends UserProfileModel {
  icon?: ReactElement;
  onPress: () => void;
}

export const Associate: FC<AssociateProps> = memo(
  ({ fullName, photoKeys, city, icon, role, practiceArea, onPress }) => {
    const styles = useStyles();

    return (
      <Pressable style={styles.courtsContainer} onPress={onPress}>
        <Avatar imageStyle={styles.imageStyle} size={42} urlKey={photoKeys[0]} />
        <View>
          <AppText color={theme.colors.black[1]} variant="p1" weight="medium">
            {fullName}
          </AppText>
          <View style={styles.row}>
            {city ? (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {city}
              </AppText>
            ) : null}
            {role ? (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {' '}
                •{' '}
              </AppText>
            ) : null}
            <AppText color={theme.colors.gray[1]} variant="p5">
              {role}
            </AppText>
            {practiceArea && (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {' '}
                •{' '}
              </AppText>
            )}
            {practiceArea && (
              <AppText color={theme.colors.gray[1]} variant="p5">
                {practiceArea}
              </AppText>
            )}
          </View>
        </View>
        {icon}
      </Pressable>
    );
  },
);
