import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { Circle } from 'react-native-animated-spinkit';

import { useUIKitTheme } from '~/app/uiKit';

import { useStyles } from './useStyles';

interface LoaderComponentProps {
  full?: boolean;
  style?: ViewProps['style'];
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({ full, style }) => {
  const theme = useUIKitTheme();
  const styles = useStyles();

  return (
    <View style={[styles.view, full && styles.viewFull, style]}>
      <Circle color={theme.colors.primary} size={40} />
    </View>
  );
};

export const Loader = memo(LoaderComponent);
