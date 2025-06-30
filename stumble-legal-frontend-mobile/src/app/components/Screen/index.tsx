import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  View,
  ViewProps,
} from 'react-native';
import { Edge, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '~/app/uiKit';
import BackIcon from '~/assets/icons/go-back.svg';

import { useStyles } from './useStyles';

interface ScreenProps {
  children: React.ReactNode;
  button?: React.ReactNode;
  secondary?: boolean;
  withGoBack?: boolean;
  header?: React.ReactNode;
  style?: ViewProps['style'];
  secondaryheaderStyle?: ViewProps['style'];
  childrenContainerStyle?: ViewProps['style'];
  secondaryTitle?: ViewProps['style'];
  useTopSafeArea?: boolean;
  useBottomSafeArea?: boolean;
  useHorizontalPadding?: boolean;
  withButtonBorder?: boolean;
  goBackButton?: () => void;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  secondary,
  header,
  style,
  button,
  withGoBack,
  childrenContainerStyle,
  useTopSafeArea,
  useBottomSafeArea,
  useHorizontalPadding,
  secondaryheaderStyle,
  secondaryTitle,
  withButtonBorder = true,
  goBackButton,
}) => {
  const styles = useStyles();
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const containerSafeAreaEdges = useMemo(() => {
    const edges: Edge[] = [];

    if (useTopSafeArea) {
      edges.push('top');
    }

    return edges;
  }, [useTopSafeArea]);

  const childrenContainerSafeAreaEdges = useMemo(() => {
    const edges: Edge[] = [];

    if (useBottomSafeArea) {
      edges.push('bottom');
    }

    return edges;
  }, [useBottomSafeArea]);

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 34) {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  const goBack = () => {
    if (goBackButton) {
      goBackButton();
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView
        edges={containerSafeAreaEdges}
        style={[styles.container, secondary && styles.containerSecondary, style]}
      >
        <StatusBar
          animated
          translucent
          backgroundColor="transparent"
          barStyle={secondary ? 'dark-content' : 'light-content'}
        />
        {!withGoBack && <>{header && <View style={styles.header}>{header}</View>}</>}
        {withGoBack && (
          <View style={[styles.secondaryheader, secondaryheaderStyle]}>
            <Pressable
              hitSlop={15}
              style={[styles.goBack, !secondary && { top: 0 }]}
              onPress={goBack}
            >
              <BackIcon color={secondary ? theme.colors.black[2] : theme.colors.white} />
            </Pressable>
            {header && <View style={[styles.secondaryTitle, secondaryTitle]}>{header}</View>}
          </View>
        )}
        <SafeAreaView
          edges={childrenContainerSafeAreaEdges}
          style={[
            { flex: 1 },
            secondary && !!button && styles.childrenContainerStyle,
            useHorizontalPadding && styles.childrenContainerWithHorizontalPadding,
            useBottomSafeArea &&
              safeAreaInsets.bottom === 0 &&
              styles.childrenContainerWithAdditionalBottomPadding,
            childrenContainerStyle,
          ]}
        >
          {children}
          {withButtonBorder && button && <View style={styles.buttenBorder} />}
          {button && button}
        </SafeAreaView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
