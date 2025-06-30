// eslint-disable-next-line import/no-extraneous-dependencies
import { generateEndpoints, parseConfig } from '@rtk-query/codegen-openapi';
import * as fs from 'fs';
import * as path from 'path';

const GENERATED_SUBFOLDER = '_generated';

const generateTsFileContent = () => `import { api as generatedApi } from './${GENERATED_SUBFOLDER}';

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

export * from './${GENERATED_SUBFOLDER}';
`;

function generateTsFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateTsFileContent());
  }
}

// Entry point
async function main() {
  const configFile = path.resolve(process.argv[2]);

  // eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require
  const configs = parseConfig(require(configFile).default);

  configs.forEach(config => {
    const { outputFile } = config;

    const directory = path.dirname(outputFile);
    const generatedFolder = `${directory}/${GENERATED_SUBFOLDER}`;
    if (!fs.existsSync(generatedFolder)) {
      fs.mkdirSync(generatedFolder);
    }

    config.outputFile = `${generatedFolder}/index.ts`;
    generateEndpoints(config).then(() => generateTsFile(outputFile));
  });
}

main();
