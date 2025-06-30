import { AppText, Checkbox } from '@appello/mobile-ui';
import React from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';

import { Screen } from '~/app/components/Screen';
import { ProfileStackScreenProps } from '~/app/navigation/Profile';
import { theme } from '~/app/uiKit';
import { mmkvStorage } from '~/shared/utils/mmkvStorage';

import { useStyles } from './useStyles';

const ranges = [
  { title: '500m', value: 500 },
  { title: '1km', value: 1000 },
  { title: '2km', value: 2000 },
  { title: '3km', value: 3000 },
];
export const LocationPreferencesScreen: React.FC<
  ProfileStackScreenProps<'LocationPreferencesScreen'>
> = () => {
  const styles = useStyles();
  const [autoCheckinRange, setAutoCheckinRange] = useMMKVNumber('AUTOCHECKIN_RANGE', mmkvStorage);
  const [isChecked, setIsChecked] = useMMKVBoolean('AUTOCHECKIN', mmkvStorage);

  return (
    <Screen
      secondary
      useBottomSafeArea
      useHorizontalPadding
      useTopSafeArea
      withGoBack
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <AppText color={theme.colors.black[1]} variant="p3">
          Location Preferences
        </AppText>
      }
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <AppText color={theme.colors.gray[1]} variant="p5">
          Automatic check in into courts
        </AppText>
        <View style={styles.checkbox}>
          <Checkbox
            checked={!!isChecked}
            style={styles.checkBoxStyle}
            onChange={() => setIsChecked(!isChecked)}
          />
          <AppText color={theme.colors.black[1]} variant="p3">
            Check in automatically
          </AppText>
        </View>
        {isChecked && (
          <View style={styles.range}>
            <AppText color={theme.colors.gray[2]} variant="p4">
              Select range
            </AppText>
            <FlatList
              horizontal
              data={ranges}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.rangeButton,
                    autoCheckinRange === item.value && {
                      backgroundColor: theme.colors.brand.accent,
                    },
                  ]}
                  onPress={() => {
                    setAutoCheckinRange(item.value);
                  }}
                >
                  <AppText
                    color={
                      autoCheckinRange === item.value ? theme.colors.white : theme.colors.gray[1]
                    }
                    variant="p5"
                  >
                    {item.title}
                  </AppText>
                </Pressable>
              )}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};
