---
to: src/entities/user/model/index.ts
force: true
---
import { AuthorizedUserFragment } from '~/services/gql/fragments/__generated__/user';

export interface UserProfileModel extends AuthorizedUserFragment {}
