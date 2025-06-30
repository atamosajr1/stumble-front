---
to: src/shared/api/processGqlErrorResponse.ts
---
import { createProcessGqlErrorResponse } from '@appello/services/dist/gql';
import { showMessage } from 'react-native-flash-message';

export const processGqlErrorResponse = createProcessGqlErrorResponse({
  onNonFieldError: message => showMessage({ type: 'danger', message }),
  onUnknownError: message => showMessage({ type: 'danger', message, duration: 5000 }),
  onUnhandledFieldErrors: errors =>
    showMessage({ type: 'danger', message: JSON.stringify(errors), duration: 5000 }),
});
