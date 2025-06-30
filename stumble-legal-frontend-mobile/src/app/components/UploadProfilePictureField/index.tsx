import { AppText } from '@appello/mobile-ui';
import React, { FC } from 'react';
import { ImageStyle, Pressable, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { theme } from '~/app/uiKit';
import { CloseIcon } from '~/assets/icons';

import { Avatar } from '../Avatar';
import { useStyles } from './useStyles';

export interface ImageProps {
  uri: string;
  name: string;
  type: string;
}

interface UploadProfilePictureFieldProps {
  urlKey?: Nullable<string>;
  uri?: Nullable<string>;
  height?: number;
  width?: number;
  size: number;
  edit?: boolean;
  onPress?: () => void;
  imageStyle?: ImageStyle;
  setPhoto: (uri: Nullable<string>) => void;
}

export const UploadProfilePictureField: FC<UploadProfilePictureFieldProps> = ({
  urlKey,
  uri,
  onPress,
  setPhoto,
  imageStyle,
  height,
  width,
  size,
  edit,
  ...props
}) => {
  const styles = useStyles();

  const uploadPhotoHandler = (): void => {
    ImagePicker.openPicker({
      width: 350,
      height: 350,
      cropping: true,
    }).then(image => {
      setPhoto(image.path);
    });
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  return (
    <View style={styles.container} {...props}>
      <AppText color={edit ? theme.colors.gray[1] : theme.colors.white} variant="p5">
        Profile Picture
      </AppText>
      {!uri && !urlKey ? (
        <View style={[styles.uploadImage, edit && styles.editUploadImage]}>
          <AppText
            color={theme.colors.white}
            variant="p3"
            weight="medium"
            onPress={uploadPhotoHandler}
          >
            UPLOAD
          </AppText>
        </View>
      ) : (
        <Avatar
          deleteIcon={
            <Pressable
              style={[styles.deleteImage, edit && styles.editDeletImage]}
              onPress={deletePhoto}
            >
              <CloseIcon color={edit ? theme.colors.gray[2] : theme.colors.white} />
            </Pressable>
          }
          imageStyle={styles.imageStyle}
          size={size}
          uri={uri || undefined}
          urlKey={urlKey || undefined}
        />
      )}
    </View>
  );
};
