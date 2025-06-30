---
to: src/shared/api/index.ts
inject: true
skip_if: processGqlErrorResponse
append: true
---
export { processGqlErrorResponse } from './processGqlErrorResponse';
