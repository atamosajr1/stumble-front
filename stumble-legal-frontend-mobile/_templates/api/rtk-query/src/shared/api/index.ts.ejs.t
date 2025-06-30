---
to: src/shared/api/index.ts
inject: true
skip_if: processApiError
append: true
---
export { processApiError } from './processApiError';
