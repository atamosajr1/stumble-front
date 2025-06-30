import { AwsImageService, useSwitchValue } from '@appello/common';
import { AppText, Button } from '@appello/mobile-ui';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DevMenu } from 'expo-dev-client';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import { KeyboardProvider } from 'react-native-keyboard-controller';
import { runOnJS } from 'react-native-reanimated';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from '~/app/components/App';
import { componentsConfig, theme, UIKitConfigProvider } from '~/app/uiKit';

import { ENV, IMAGE_AWS_BUCKET, IMAGE_AWS_URL } from './app/constants/env';
import { persistor, store } from './app/store';

AwsImageService.initialize(IMAGE_AWS_URL, IMAGE_AWS_BUCKET);

const RootApp: React.FC = () => {
  const {
    value: displayStorybook,
    toggle: toggleStorybook,
    off: closeStorybook,
    on: openStorybook,
  } = useSwitchValue(false);
  const StorybookUI = useRef<Nullable<React.FC>>(null);
  const longPressGesture = Gesture.LongPress().onEnd(() => {
    if (ENV === 'dev') {
      runOnJS(openStorybook)();
    }
  });

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
          {/* <KeyboardProvider> */}
          <UIKitConfigProvider componentsConfig={componentsConfig} theme={theme}>
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
                      <AppText>ashdgas</AppText>
                    </SafeAreaView>
                  </>
                ) : (
                  <GestureDetector gesture={longPressGesture}>
                    <View style={styles.container}>
                      <App />
                      <FlashMessage position="top" />
                    </View>
                  </GestureDetector>
                )}
              </BottomSheetModalProvider>
            </SafeAreaProvider>
          </UIKitConfigProvider>
          {/* </KeyboardProvider> */}
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
