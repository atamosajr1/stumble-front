---
to: codegen.yml
---
watch: true
overwrite: true
schema:
  - ${API_URL}
generates:
  ./src/services/gql/__generated__/server.graphql:
    plugins:
      - 'schema-ast'
    config:
      includeDirectives: true
  ./src/services/gql/__generated__/globalTypes.ts:
    plugins:
      - add:
          content:
            - '/* eslint-disable */'
      - 'typescript'
      - 'typescript-operations'
      - 'fragment-matcher'
    config:
      skipTypename: true
      apolloClientVersion: 3
      namingConvention:
        enumValues: 'upper-case#upperCase'
      strictScalars: true
      scalars:
        Date: 'string'
        DateTime: 'string'
        GenericScalar: 'string | boolean | number | unknown[] | Record<string, unknown>'
        Upload: 'File'
        Time: 'string'
        DurationScalar: 'any'
        PhoneNumberScalar: 'any'
        PointScalar: 'any'
        UUID: 'string | number'
        Decimal: 'number'
      nonOptionalTypename: true
  ./src/services/gql/__generated__/fragmentTypes.json:
    plugins:
      - 'fragment-matcher'
    config:
      apolloClientVersion: 3
  ./src/:
    preset: 'near-operation-file'
    documents: './src/**/*.graphql'
    presetConfig:
      folder: __generated__
      extension: .ts
      baseTypesPath: '~~/services/gql/__generated__/globalTypes'
    plugins:
      - add:
          content:
            - '/* eslint-disable */'
      - 'typescript-operations'
      - 'typescript-react-apollo'
    config:
      skipTypename: true
      withHooks: true
      withHOC: false
      withComponent: false
      strictScalars: true
      scalars:
        Date: 'string'
        DateTime: 'string'
        GenericScalar: 'string | boolean | number | unknown[] | Record<string, unknown>'
        Upload: 'File'
        Time: 'string'
        DurationScalar: 'any'
        PhoneNumberScalar: 'any'
        PointScalar: 'any'
        UUID: 'string | number'
        Decimal: 'number'
      preResolveTypes: true
hooks:
  afterAllFileWrite:
    - 'prettier --write ./src/**/__generated__/*'
