---
to: src/features/auth/api/index.ts
force: true
---
import { api as generatedApi } from './_generated';

// Uncomment if actually need any tags
/*
enum Tags {}
*/

/* eslint-disable import/export */
export const api = generatedApi.enhanceEndpoints({
  addTagTypes: [],
  endpoints: {},
});

// Uncomment if actually enhance any API and export enhanced hook
/*
export const {} = api;
*/

export * from './_generated';
