// eslint-disable-next-line import/no-extraneous-dependencies
import { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: '', // Put the link to your schema file here
  apiFile: './src/app/services/rtkQuery/index.ts',
  apiImport: 'rtkQuery',
  outputFiles: {
    './src/features/auth/api/index.ts': {
      filterEndpoints: [/auth/i],
    },
  },
  exportName: 'api',
  hooks: true,
  useEnumType: true,
};

// eslint-disable-next-line import/no-default-export
export default config;
