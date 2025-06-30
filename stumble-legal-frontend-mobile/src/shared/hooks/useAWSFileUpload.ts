import { useCallback } from 'react';
import RNBlobUtil from 'react-native-blob-util';

import { useLazyGetFileUploadUrlQuery } from '~/app/services/rtkQuery/links/endpoints';

export const useAWSFileUpload = () => {
  const [getFileUploadUrlLazyQuery] = useLazyGetFileUploadUrlQuery();

  const uploadFile = useCallback(
    async ({ uri, path }: { uri: Nullable<string>; path: string }) => {
      try {
        const data = await getFileUploadUrlLazyQuery({ path });
        if (data.data?.detail && uri) {
          await RNBlobUtil.fetch(
            'PUT',
            data.data?.detail,
            { 'Content-Type': '' },
            RNBlobUtil.wrap(uri),
          );

          return {
            uploadedFileKey: data.data?.detail.split('?')[0].split('amazonaws.com/')[1],
          };
        }

        return { uploadedFileKey: null };
      } catch (e) {
        return { uploadedFileKey: null };
      }
    },
    [getFileUploadUrlLazyQuery],
  );

  return { uploadFile };
};
