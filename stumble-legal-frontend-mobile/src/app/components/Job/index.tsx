import { AppText } from '@appello/mobile-ui';
import { format } from 'date-fns';
import React, { FC, memo, ReactElement } from 'react';
import { Pressable, View } from 'react-native';

import { Jobs } from '~/app/services/rtkQuery/jobs/types';
import { theme } from '~/app/uiKit';
import { MapPinIcon } from '~/assets/icons';

import { useStyles } from './useStyles';

export interface JobProps extends Jobs {
  icon?: ReactElement;
  onPress: () => void;
}

export const Job: FC<JobProps> = memo(({ dttm, type, fee, court, icon, isMine, onPress }) => {
  const styles = useStyles();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View>
        <AppText color={theme.colors.black[1]} variant="p1" weight="medium">
          {type}
        </AppText>
        <AppText color={theme.colors.gray[1]} variant="p4">
          {format(dttm, 'MMM dd, h:mm a')} |{' '}
          <AppText color={theme.colors.global.greenDark} variant="p4" weight="medium">
            ${fee.toFixed(2)}
          </AppText>
        </AppText>

        <View style={styles.location}>
          <MapPinIcon color={theme.colors.brand.accent} height={14} width={14} />
          <AppText color={theme.colors.brand.accent} variant="p5">
            {court.name} - {court.types[0]}
            {court.types[0] && court.level && ','}
            {court.level}
          </AppText>
        </View>
      </View>
      <View style={styles.location}>
        {isMine && (
          <View style={styles.createdType}>
            <AppText color={theme.colors.gray[3]} variant="p5" weight="medium">
              Created by you
            </AppText>
          </View>
        )}
        {icon}
      </View>
    </Pressable>
  );
});
