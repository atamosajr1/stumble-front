---
to: codegen.download.yml
---
overwrite: true
schema:
  - ${API_URL}
generates:
  ./src/services/gql/__generated__/server.graphql:
    plugins:
      - 'schema-ast'
    config:
      includeDirectives: true
