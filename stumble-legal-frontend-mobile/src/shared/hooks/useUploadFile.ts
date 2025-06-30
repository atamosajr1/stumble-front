/*
TODO:
1. Move TypeSelectFileEnum into `types` directory
2. Remove `any` types
3. Provide ReactNativeFile interface from @appello/common
*/

import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

import { ExtendFileInterface } from '~/app/types/extendFileInterfaces';

import { generateUuid } from '../utils/generateUuid';

export enum TypeSelectFileEnum {
  PICK_SINGLE = 'pickSingle',
  PICK_MULTIPLE = 'pickMultiple',
}

const fileSize = 20000000;

export const useFilesUploaded = (
  typeSelect: TypeSelectFileEnum = TypeSelectFileEnum.PICK_SINGLE,
): {
  singleFile: any;
  uploadAnotherFile: any;
  setSingleFile: any;
  files: ExtendFileInterface[];
  setFiles: any;
} => {
  const [files, setFiles] = useState<ExtendFileInterface[]>([]);
  const [singleFile, setSingleFile] = useState<DocumentPickerResponse | null>(null);

  const uploadAnotherFile = useCallback(async () => {
    try {
      const response: DocumentPickerResponse[] = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });

      const setMultipleFiles = (): void => {
        setFiles(prevState => [
          ...prevState,
          ...response.map(item => ({ ...item, id: generateUuid() })),
        ]);
      };

      if (
        response.find((item: DocumentPickerResponse) => item && item?.size && item.size > fileSize)
      ) {
        Alert.alert('Warning', 'The file must not exceed 20mb', [
          {
            text: 'Cancel',
          },
          { text: 'Ok' },
        ]);
      }

      if (typeSelect === TypeSelectFileEnum.PICK_MULTIPLE) {
        if (response.some(item => files.map(file => file.name).includes(item.name))) {
          Alert.alert('Warning', 'File already exists, should I add it again?', [
            {
              text: 'Cancel',
            },
            {
              text: 'Add',
              onPress: () => setMultipleFiles(),
            },
          ]);

          return;
        }

        setMultipleFiles();

        return;
      }

      setSingleFile(response[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('DocumentPicker', err);
      } else {
        throw err;
      }
    }
  }, [files, typeSelect]);

  return { singleFile, uploadAnotherFile, setSingleFile, files, setFiles };
};
