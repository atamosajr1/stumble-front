---
to: src/app/services/gql/schema.graphql
---
mutation RefreshTokens($input: RefreshTokenInput!) {
    tokens: tokenRefresh(data: $input) {
        access: accessToken
        refresh: refreshToken
    }
}
