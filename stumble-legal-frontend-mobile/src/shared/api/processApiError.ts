import { createProcessApiError } from '@appello/services/dist/api';
import { showMessage } from 'react-native-flash-message';

export const processApiError = createProcessApiError({
  onGlobalError: message => showMessage({ type: 'danger', message }),
  onUnknownErrors: message => showMessage({ type: 'danger', message, duration: 5000 }),
});
