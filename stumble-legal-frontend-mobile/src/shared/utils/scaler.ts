import { Dimensions, PixelRatio } from 'react-native';

export const roundPixel = (size: number) => PixelRatio.roundToNearestPixel(size);

export const { width, height } = Dimensions.get('screen');

const guideline = {
  width: 375,
  height: 812,
};

const scaleByWidth = (size: number) => roundPixel((size / guideline.width) * width);
const scaleByHeight = (size: number) => roundPixel((size / guideline.height) * height);

export { scaleByWidth as s, scaleByHeight as sv };
