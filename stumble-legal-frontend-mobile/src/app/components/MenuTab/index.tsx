import { AppText } from '@appello/mobile-ui';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { theme } from '~/app/uiKit';

import { useStyles } from './useStyles';

type MenuTabProps = {
  title?: string;
  index: number;
  selectedId?: number;
  onPressTab: (id: number) => void;
};

export const MenuTab: FC<MenuTabProps> = ({ index, title, selectedId, onPressTab }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={1}
      key={index}
      style={[styles.container, selectedId === index && styles.border]}
      onPress={() => onPressTab(index)}
    >
      <AppText color={theme.colors.global.whiteLight[7]} variant="p3">
        {title}
      </AppText>
    </TouchableOpacity>
  );
};
