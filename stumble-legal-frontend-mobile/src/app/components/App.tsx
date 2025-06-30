import { useSwitchValue } from '@appello/common';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { AppNavigator } from '~/app/navigation/App';

export const App: React.FC = () => {
  const { value: isNavigatorReady, on: handleNavigatorReady } = useSwitchValue(false);

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../../assets/fonts/Roboto/static/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto/static/Roboto-Bold.ttf'),
    'Roboto-Condensed-Bold': require('../../assets/fonts/Roboto/static/Roboto_Condensed-Bold.ttf'),
    'Roboto-Medium': require('../../assets/fonts/Roboto/static/Roboto-Medium.ttf'),
    'Roboto-SemiBold': require('../../assets/fonts/Roboto/static/Roboto-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded && isNavigatorReady) {
      RNBootSplash.hide().catch(() => null);
    }
  }, [fontsLoaded, isNavigatorReady]);

  if (!fontsLoaded) {
    return null;
  }

  return <AppNavigator onReady={handleNavigatorReady} />;
};
