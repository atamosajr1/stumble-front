---
to: package.json
inject: true
after: init
skip_if: gql
---
    "gql:codegen": "DOTENV_CONFIG_PATH=\"./.app-config/dev/.env\" graphql-codegen --require dotenv/config --config codegen.yml",
    "gql:codegen:download": "DOTENV_CONFIG_PATH=\"./.app-config/dev/.env\" graphql-codegen --require dotenv/config --config codegen.download.yml",
    "gql:codegen:init": "npm run gql:codegen:download && npm run gql:codegen",
