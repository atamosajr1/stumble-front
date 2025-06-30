const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { resolver: defaultResolver } = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = function (baseConfig) {
  const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
  const {
    resolver: { assetExts, sourceExts },
  } = defaultConfig;

  return mergeConfig(defaultConfig, {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      unstable_allowRequireContext: true,
    },

    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'cjs', 'svg'],
      resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],

      unstable_enableSymlinks: true,
    },
  });
};
