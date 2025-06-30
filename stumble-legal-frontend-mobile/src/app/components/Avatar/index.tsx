import React, { FC, memo, ReactElement } from 'react';
import { Image, ImageStyle, View } from 'react-native';

import { getAmazonImageUrl } from '~/shared/utils';

export interface AvatarProps {
  urlKey?: string;
  size: number;
  imageStyle?: ImageStyle;
  deleteIcon?: ReactElement;
  uri?: string;
}

export const Avatar: FC<AvatarProps> = memo(({ size, imageStyle, urlKey, deleteIcon, uri }) => {
  const imageUri = urlKey ? getAmazonImageUrl({ key: urlKey, width: size, height: size }) : uri;

  return (
    <View>
      {imageUri ? (
        <Image
          resizeMode="contain"
          source={{ uri: imageUri }}
          style={[{ height: size, width: size }, imageStyle]}
        />
      ) : (
        <Image
          resizeMode="contain"
          source={require('~/assets/images/avatar.png')}
          style={[{ height: size, width: size }, imageStyle]}
        />
      )}
      {(uri || urlKey) && deleteIcon}
    </View>
  );
});
