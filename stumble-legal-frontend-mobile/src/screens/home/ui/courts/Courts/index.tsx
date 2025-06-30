import { AppText, Button, Checkbox, Popup } from '@appello/mobile-ui';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, Pressable, View } from 'react-native';
import { Linking } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import { useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';

import { Court } from '~/app/components/Court';
import { DropDownField } from '~/app/components/Fields/DropDownField';
import { Loader } from '~/app/components/Loader';
import { Screen } from '~/app/components/Screen';
import { SearchInputComponent } from '~/app/components/SearchInput/SearchInput';
import { SCHEDULE_LEVELS, SCHEDULE_TYPES } from '~/app/constants/data';
import { HomeTabScreenProps } from '~/app/navigation/HomeTab';
import { useLazyGetCourtsQuery } from '~/app/services/rtkQuery/courts/endpoints';
import { Courts } from '~/app/services/rtkQuery/courts/types';
import { useSetUsersMeCheckInMutation } from '~/app/services/rtkQuery/user/endpoints';
import { theme } from '~/app/uiKit';
import { ArrowRight, DropdownIcon, MapPinIcon, UserLocationIcon } from '~/assets/icons';
import { usePermissionOnAppReturn } from '~/shared/hooks/usePermissionOnAppReturn';
import { getNearestCourtInRange } from '~/shared/utils/getNearestCourtInRange';
import { GlobalIntervalManager } from '~/shared/utils/globalInterval';
import { getCurrentLocation, requestLocationPermission } from '~/shared/utils/map';
import { mmkvStorage } from '~/shared/utils/mmkvStorage';
import { s, sv } from '~/shared/utils/scaler';

import mapstyle from '../../../../../../mapstyle.json';
import { useStyles } from './useStyles';

export const CourtsScreen: React.FC<HomeTabScreenProps<'COURTS'>> = ({ navigation }) => {
  const ranges = [
    { title: '500m', value: 500 },
    { title: '1km', value: 1000 },
    { title: '2km', value: 2000 },
    { title: '3km', value: 3000 },
  ];
  const styles = useStyles();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchValue, setSearchValue] = useState('');
  const [types, setType] = useState('');
  const [level, setLevel] = useState('');
  const [fetchCourts, { data, isLoading }] = useLazyGetCourtsQuery();
  const [setCheckIn] = useSetUsersMeCheckInMutation();
  const [checkinModalVisible, setCheckinModalVisible] = useState(false);
  const [autoCheckInModal, setAutoCheckinModal] = useState(false);
  const [nearestCourt, setNearestCourt] = useState<Nullable<Courts>>(null);
  const [autoCheckinRange, setAutoCheckinRange] = useMMKVNumber('AUTOCHECKIN_RANGE', mmkvStorage);
  const [isChecked, setIsChecked] = useMMKVBoolean('AUTOCHECKIN', mmkvStorage);
  const [showPermissionSettings, setShowPermissionSettings] = useState<boolean>(false);
  const appState = usePermissionOnAppReturn();
  const focused = useIsFocused();

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const [coordinates] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.77550262305559,
    longitude: -122.41940002888441,
  });
  const [region, setRegion] = useState<
    Nullable<{
      latitude: number;
      longitude: number;
    }>
  >(null);

  useFocusEffect(
    useCallback(() => {
      if (region) {
        fetchCourts({
          search: searchValue || undefined,
          levels: level ? [level] : undefined,
          types: types ? [types] : undefined,
          latitude: region?.latitude,
          longitude: region?.longitude,
        });
      }
    }, [fetchCourts, level, region, searchValue, types]),
  );

  const dataTransferProcess = useCallback(async () => {
    const permission = await requestLocationPermission();

    setShowPermissionSettings(!permission);
    if (permission) {
      const coordinates = await getCurrentLocation();

      const { data: nearestCourts } = await fetchCourts({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });

      const nearestCourt = getNearestCourtInRange({
        courts: nearestCourts?.data || [],
        range: autoCheckinRange === 0 ? autoCheckinRange : 250,
        userCoords: coordinates,
      });

      if (nearestCourt) {
        if (isChecked) {
          setNearestCourt(nearestCourt);
          setCheckIn({ courtUuid: nearestCourt.uuid, location: nearestCourt.location });
        } else {
          GlobalIntervalManager.stop();
          setCheckinModalVisible(true);
        }
      }
    }
  }, [autoCheckinRange, fetchCourts, isChecked, setCheckIn]);

  useEffect(() => {
    if (autoCheckinRange === undefined) {
      GlobalIntervalManager.stop();
      setAutoCheckinModal(true);
    }
    if (appState === 'active' && !autoCheckInModal) {
      GlobalIntervalManager.start(() => dataTransferProcess());
    }
  }, [appState, autoCheckInModal, autoCheckinRange, dataTransferProcess, focused]);

  const handleCheckIn = useCallback(() => {
    if (nearestCourt?.uuid && nearestCourt?.location) {
      setCheckIn({ courtUuid: nearestCourt.uuid, location: nearestCourt.location });
    }
    setCheckinModalVisible(false);
  }, [nearestCourt?.location, nearestCourt?.uuid, setCheckIn]);

  const openLocationSettings = () => {
    Linking.openSettings();
  };

  const renderItem = useCallback(
    ({ item }: { item: Courts }) => {
      return (
        <Court
          withDistance
          onPress={() => {
            navigation.navigate('CourtsNavigator', {
              screen: 'CourtViewScreen',
              params: { uuid: item.uuid },
            });
          }}
          {...item}
          icon={<ArrowRight />}
        />
      );
    },
    [navigation],
  );
  const CustomHandle = () => (
    <View style={styles.handleContainer}>
      <View style={styles.indicator} />
    </View>
  );

  return (
    <Screen style={styles.container}>
      <View>
        <MapView
          followsUserLocation
          pitchEnabled
          rotateEnabled
          scrollEnabled
          showsBuildings
          showsCompass
          showsMyLocationButton
          showsUserLocation
          zoomEnabled
          clusterColor={theme.colors.primary}
          customMapStyle={mapstyle}
          provider="google"
          ref={mapRef}
          region={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.mapRoot}
          onRegionChangeComplete={region => {
            setRegion({ latitude: region.latitude, longitude: region.longitude });
          }}
        >
          {data?.data.map(item => (
            <Marker
              coordinate={{
                latitude: item.location?.[0] ?? 0,
                longitude: item.location?.[1] ?? 0,
              }}
              key={item.uuid}
              onPress={() => {
                navigation.navigate('CourtsNavigator', {
                  screen: 'CourtViewScreen',
                  params: { uuid: item.uuid },
                });
              }}
            >
              <View style={styles.markerContainer}>
                {item.visitorsQt >= 1 && (
                  <View style={styles.userBubble}>
                    <UserLocationIcon color={theme.colors.white} />
                    <AppText color={theme.colors.white} variant="p5">
                      {item.visitorsQt}
                    </AppText>
                    {item.visitorsQt > 1 && <View style={styles.trangle} />}
                  </View>
                )}
                <MapPinIcon color={theme.colors.primary} height={28} width={28} />
              </View>
            </Marker>
          ))}
        </MapView>

        {showPermissionSettings && (
          <>
            <AnimatedBlurView
              blurAmount={10}
              blurType="ultraThinMaterialLight"
              style={styles.animatedBlur}
            />
            <View style={styles.blurContainer}>
              <View style={styles.locationStyle}>
                <MapPinIcon color={theme.colors.white} height={24} width={24} />
              </View>
              <AppText color={theme.colors.white} style={styles.textStyle} variant="p4">
                Allow location access to see nearby courts on the map
              </AppText>
              <Button variant="primary" onPress={openLocationSettings}>
                Open settings
              </Button>
            </View>
          </>
        )}
      </View>
      <BottomSheet
        // enableDynamicSizing
        handleComponent={CustomHandle}
        index={0}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        maxDynamicContentSize={sv(600)}
        overDragResistanceFactor={0}
        ref={bottomSheetRef}
        snapPoints={[sv(350), sv(600)]}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <SearchInputComponent
            placeholder="Search Court"
            style={styles.searchStyle}
            onChange={setSearchValue}
          />
          <View style={styles.typesStyles}>
            <View style={{ width: s(130) }}>
              <DropDownField
                Icon={DropdownIcon}
                items={SCHEDULE_TYPES}
                placeholder={{ label: 'Type', value: null }}
                value={types}
                onValueChange={val => setType(val as string)}
              />
            </View>
            <View style={{ width: s(120) }}>
              <DropDownField
                Icon={DropdownIcon}
                items={SCHEDULE_LEVELS}
                placeholder={{ label: 'Level', value: null }}
                value={level}
                onValueChange={val => setLevel(val as string)}
              />
            </View>
          </View>

          <BottomSheetFlatList
            removeClippedSubviews
            scrollToOverflowEnabled
            ListEmptyComponent={<View style={styles.empatyStyle}>{isLoading && <Loader />}</View>}
            data={data?.data || []}
            initialNumToRender={10}
            keyExtractor={item => item.uuid}
            keyboardShouldPersistTaps="handled"
            maxToRenderPerBatch={10}
            renderItem={renderItem}
            windowSize={7}
          />
        </BottomSheetView>
      </BottomSheet>
      <Popup
        buttons={useMemo(
          () => [
            {
              variant: 'secondary',
              children: 'Check in',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => handleCheckIn(),
              labelProps: {
                color: theme.colors.black[1],
              },
            },
            {
              variant: 'secondary',
              children: 'Edit schedule',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => {
                setCheckinModalVisible(false);
                navigation.navigate('ProfileNavigator', {
                  screen: 'ScheduleScreen',
                });
              },
              labelProps: {
                color: theme.colors.black[1],
              },
            },
            {
              variant: 'primary',
              children: 'Close',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => {
                setCheckinModalVisible(false);
              },
            },
          ],
          [handleCheckIn, navigation],
        )}
        message="Would you like to check in or set availability record here?"
        opened={checkinModalVisible}
        title="Parramatta Court"
        topAccessory={
          <View style={styles.topAccessory}>
            <MapPinIcon color={theme.colors.primary} height={38} width={38} />
          </View>
        }
      />
      <Popup
        buttons={useMemo(
          () => [
            {
              variant: 'primary',
              children: 'Save',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => setAutoCheckinModal(false),
            },
          ],
          [],
        )}
        message=""
        opened={autoCheckInModal}
        title=""
        topAccessory={
          <View style={styles.accessoryStyle}>
            <View style={styles.topAccessory}>
              <MapPinIcon color={theme.colors.primary} height={38} width={38} />
            </View>
            <AppText color={theme.colors.black[1]} variant="h5">
              Setup Automatic Check in?
            </AppText>
            <AppText color={theme.colors.gray[1]} variant="p3">
              You can make yourself visible in courts{'\n'} automatically within selected distance
            </AppText>
            <View style={styles.checkIn}>
              <Checkbox
                activeColor={theme.colors.global.greenDark}
                checked={!!isChecked}
                size={20}
                style={styles.checkbox}
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
                      onPress={() => setAutoCheckinRange(item.value)}
                    >
                      <AppText
                        color={
                          autoCheckinRange === item.value
                            ? theme.colors.white
                            : theme.colors.gray[1]
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
          </View>
        }
      />
    </Screen>
  );
};
