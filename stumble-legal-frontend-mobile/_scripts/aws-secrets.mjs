import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import fs from 'fs';
import path from 'path';

const LOCAL = 'LOCAL';

const ENV = process.env.ENV;
const AWS_SECRET_NAME = process.env.AWS_SECRET_NAME;
const AWS_SECRET_ARN = process.env.AWS_SECRET_ARN;
const AWS_SECRET_REGION_NAME = process.env.AWS_SECRET_REGION_NAME;
const OUTPUT_ENV_FILE = process.env.OUTPUT_ENV_FILE || '.env';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ?? 'LOCAL';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? 'LOCAL';

const successLog = str => {
  console.log(`✅  -  ${str}`);
};

const errorLog = str => {
  console.error(`❌  -  ${str}`);
};

if (!ENV) {
  errorLog('Please setup ENV variable in you env folder (ex: env/.env.dev)');
  process.exit(1);
}

if (!AWS_SECRET_NAME) {
  errorLog('Please setup AWS_SECRET_NAME variable in you env folder (ex: env/.env.dev)');
  process.exit(1);
}

if (!AWS_SECRET_ARN) {
  errorLog('Please setup AWS_SECRET_ARN variable in you env folder (ex: env/.env.dev)');
  process.exit(1);
}

if (!AWS_SECRET_REGION_NAME) {
  errorLog('Please setup AWS_SECRET_REGION_NAME variable in you env folder (ex: env/.env.dev)');
  process.exit(1);
}

console.log(`✨  -  Start downloading and generating .env file...`);
console.log(`Output path ${OUTPUT_ENV_FILE}`);

const client = new SecretsManagerClient({
  region: AWS_SECRET_REGION_NAME,
  // fromEnv()
  credentials:
    AWS_ACCESS_KEY_ID !== LOCAL && AWS_SECRET_ACCESS_KEY !== LOCAL
      ? {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: AWS_SECRET_NAME,
      VersionStage: 'AWSCURRENT',
    }),
  );
} catch (error) {
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  errorLog(`Error when get secrets from aws: ${JSON.stringify(error)}`);
  process.exit(1);
}

const secrets = JSON.parse(response.SecretString);

try {
  const serializedSecrets = Object.entries(secrets)
    .map(([key, value]) => {
      return `${key}="${value}"`;
    })
    .join('\n');
  const finalEnvContent = `ENV=${ENV}\n\n`.concat(serializedSecrets);
  const outputEnvFile = path.resolve(OUTPUT_ENV_FILE);
  fs.writeFileSync(outputEnvFile, finalEnvContent, 'utf-8');
  successLog(`Excellent! File .env has been saved to: ${outputEnvFile}`);
} catch (error) {
  errorLog(`Error handling env file: ${error.message}`);
  process.exit(1);
}
