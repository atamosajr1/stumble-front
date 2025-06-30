import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import RootApp from './src';

AppRegistry.registerComponent(appName, () => RootApp);
if (__DEV__) {
  import('./src/ReactotronConfig').then(() => {});
}
