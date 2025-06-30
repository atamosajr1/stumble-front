import AsyncStorage from '@react-native-async-storage/async-storage';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Linking, Platform } from 'react-native';

import { useAppSelector } from '~/app/store/hooks';
import { selectIsLoged } from '~/entities/user';

import { AuthNavigator, AuthStackParamList } from './Auth';
import { HomeNavigator } from './Home';
import { HomeTabParamList } from './HomeTab';
import { navigationRef } from './navigator';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home: NavigatorScreenParams<HomeTabParamList>;
};

const AppStack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  onReady: () => void;
}

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
export const AppNavigator: React.FC<AppNavigatorProps> = ({ onReady }) => {
  useReduxDevToolsExtension(navigationRef);

  const isLogedIn = useAppSelector(selectIsLoged);

  const [isReady, setIsReady] = React.useState(!__DEV__);
  const [initialState, setInitialState] = React.useState();

  useEffect(() => {
    if (isReady) {
      onReady();
    }
  }, [isReady, onReady]);

  useEffect(() => {
    const restoreState = async (): Promise<void> => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      ref={navigationRef}
      onStateChange={state => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
    >
      <AppStack.Navigator screenOptions={screenOptions}>
        {!isLogedIn ? (
          <AppStack.Screen component={AuthNavigator} name="Auth" />
        ) : (
          <AppStack.Screen component={HomeNavigator} name="Home" />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
