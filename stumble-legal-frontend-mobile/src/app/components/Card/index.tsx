import { AppText } from '@appello/mobile-ui';
import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { theme } from '~/app/uiKit';
import { DeleteIcon } from '~/assets/icons';

import { useStyles } from './useStyles';

export interface CardProps {
  onPress: () => void;
  name: string;
}

export const Card: FC<CardProps> = memo(({ name, onPress }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.cardDetails}>
        <AppText color={theme.colors.black[1]} variant="p3" weight="medium">
          {name.replace(/(\d+)/, '**$1')}
        </AppText>
      </View>
      <DeleteIcon color={theme.colors.gray[3]} height={22} width={22} onPress={onPress} />
    </View>
  );
});
