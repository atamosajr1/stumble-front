---
to: src/app/services/gql/fragments/user.graphql
---
fragment AuthorizedUser on ProfileType {
  id
  email
  firstName
  lastName
  phone
}
