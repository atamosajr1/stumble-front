import { Platform } from 'react-native';
import { isLocationEnabled } from 'react-native-device-info';
import Geolocation, { GeoCoordinates, GeoPosition } from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const getCurrentLocation = (): Promise<GeoCoordinates> =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: GeoPosition) => {
        const cords: GeoCoordinates = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          heading: position?.coords?.heading,
          accuracy: position?.coords?.accuracy,
          altitude: position?.coords?.altitude,
          speed: position?.coords?.speed,
        };
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });

const checkIOSLocationPermissions = async () => {
  try {
    const locationServicesEnabled = await isLocationEnabled();

    if (locationServicesEnabled) {
      const checkLocation = await Promise.all([
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
        check(PERMISSIONS.IOS.LOCATION_ALWAYS),
      ]);

      const locationPermissionEnabled = checkLocation.some(
        permission => permission === RESULTS.GRANTED,
      );

      if (locationPermissionEnabled) {
        return true;
      }

      if (!locationPermissionEnabled) {
        const locationPermission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        const isNeverAskAgainOrError =
          locationPermission === RESULTS.BLOCKED ||
          locationPermission === RESULTS.UNAVAILABLE ||
          locationPermission === RESULTS.DENIED;

        if (isNeverAskAgainOrError) {
          return false;
        }

        return true;
      }
    } else {
      return false;
    }
    return false;
  } catch (e: unknown) {
    return false;
  }
};

const checkAndroidLocationPermissions = async () => {
  try {
    const locationServicesEnabled = await isLocationEnabled();

    if (locationServicesEnabled) {
      const finalPermission =
        Number(Platform.Version) >= 29
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
      const locationPermissionEnabled = await check(finalPermission);

      if (
        locationPermissionEnabled === RESULTS.BLOCKED ||
        locationPermissionEnabled === RESULTS.DENIED
      ) {
        const locationPermission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        const isNeverAskAgainOrError =
          locationPermission === RESULTS.BLOCKED ||
          locationPermission === RESULTS.UNAVAILABLE ||
          locationPermission === RESULTS.DENIED;

        if (isNeverAskAgainOrError) {
          return false;
        }

        return true;
      }

      return true;
    }
    return false;

    // return false;
  } catch (e: unknown) {
    return false;
  }
};

export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return checkIOSLocationPermissions();
  }
  return checkAndroidLocationPermissions();
};
