import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const HEADER_HEIGHT = 62;

export const IS_TABLET = DeviceInfo.isTablet();
