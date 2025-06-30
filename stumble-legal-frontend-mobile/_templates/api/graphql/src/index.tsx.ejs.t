---
to: src/index.tsx
force: true
---
import { ApolloProvider } from '@apollo/client';
import { useSwitchValue } from '@appello/common';
import { Button } from '@appello/mobile-ui';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DevMenu } from 'expo-dev-client';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from '~/app/components/App';
import { ENV } from '~/app/constants/env';
import { gqlClient } from '~/app/services/gql';
import { persistor, store } from '~/app/store';
import { componentsConfig, theme, UIKitConfigProvider } from '~/app/uiKit';

const RootApp: React.FC = () => {
  const {
    value: displayStorybook,
    toggle: toggleStorybook,
    off: closeStorybook,
    // on: openStorybook,
  } = useSwitchValue(false);
  const StorybookUI = useRef<Nullable<React.FC>>(null);

  useEffect(() => {
    if ((__DEV__ || ENV === 'dev') && !StorybookUI.current) {
      import('@appello/mobile-ui/.storybook').then(StorybookUIRoot => {
        StorybookUI.current = StorybookUIRoot.default;

        return DevMenu.registerDevMenuItems([
          {
            name: 'Toggle Storybook',
            callback: toggleStorybook,
          },
        ]);
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <KeyboardProvider>
            <UIKitConfigProvider componentsConfig={componentsConfig} theme={theme}>
              <ApolloProvider client={gqlClient}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                  <BottomSheetModalProvider>
                    {displayStorybook && StorybookUI.current ? (
                      <>
                        {/* eslint-disable-next-line react/jsx-pascal-case */}
                        <StorybookUI.current />
                        <SafeAreaView style={styles.storybookCloseButtonContainer}>
                          <Button
                            style={styles.storybookCloseButton}
                            variant="primary"
                            onPress={closeStorybook}
                          >
                            Close storybook
                          </Button>
                        </SafeAreaView>
                      </>
                    ) : (
                      <View style={styles.container}>
                        <App />
                        <FlashMessage position="top" />
                      </View>
                    )}
                  </BottomSheetModalProvider>
                </SafeAreaProvider>
              </ApolloProvider>
            </UIKitConfigProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storybookCloseButtonContainer: {
    position: 'absolute',
    left: '60%',
    right: 15,
  },
  storybookCloseButton: {
    height: 35,
  },
});

// eslint-disable-next-line import/no-default-export
export default RootApp;
