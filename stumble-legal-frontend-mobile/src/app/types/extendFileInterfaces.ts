import { DocumentPickerResponse } from 'react-native-document-picker';

export interface ExtendFileInterface extends DocumentPickerResponse {
  id: string;
  file?: string;
}

export type ExtendFileInterfaceSignUp = Omit<DocumentPickerResponse, 'name'> & {
  fileName: string;
};
