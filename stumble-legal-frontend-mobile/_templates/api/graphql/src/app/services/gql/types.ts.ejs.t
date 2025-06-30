---
to: src/app/services/gql/types.ts
---
export type PaginationItem<T extends { results: unknown[] }> = T['results'][number];

export type Sorting<T> = {
  field: T;
  direction: 'asc' | 'desc';
}[];
