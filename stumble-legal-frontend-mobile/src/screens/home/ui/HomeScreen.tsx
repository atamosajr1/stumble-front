import { AppText, ScreenContainer } from '@appello/mobile-ui';
import React from 'react';

import ExampleIcon from '~/assets/icons/example.svg';

export const HomeScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <AppText variant="h1">Home Screen</AppText>
      <AppText>Icon usage:</AppText>
      <ExampleIcon color="red" height={50} width={50} onPress={() => {}} />
    </ScreenContainer>
  );
};
