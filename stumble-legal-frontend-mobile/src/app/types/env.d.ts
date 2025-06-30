declare module 'react-native-config' {
  interface Env {
    STRIPE_PK: string;
    ENV: 'dev' | 'prod' | 'stage';
    API_URL: string;
    IMAGE_AWS_URL: string;
    IMAGE_AWS_BUCKET: string;
  }

  const Config: Env;

  // eslint-disable-next-line import/no-default-export
  export default Config;
}
