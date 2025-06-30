---
to: package.json
inject: true
after: init
skip_if: codegen:rtkq
---
    "codegen:rtkq": "ts-node _scripts/rtk-query-codegen.ts rtkq.config.ts",
