import { Buffer } from 'buffer';
import { PixelRatio } from 'react-native';

import { IMAGE_AWS_BUCKET, IMAGE_AWS_URL } from '~/app/constants/env';

interface Params {
  width: number;
  height: number;
  key?: string;
}

export const getAmazonImageUrl = ({ key, height, width }: Params) => {
  if (!key) {
    return undefined;
  }
  const pixelRatio = PixelRatio.get(); // usually 2 or 3

  const imageRequest = JSON.stringify({
    bucket: IMAGE_AWS_BUCKET,
    key,
    edits: {
      resize: {
        width: width * pixelRatio,
        height: height * pixelRatio,
        fit: 'cover',
      },
    },
  });

  const encoded = Buffer.from(imageRequest).toString('base64');

  return `${IMAGE_AWS_URL}/${encoded}`;
};
