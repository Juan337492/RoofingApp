const { plugin: gtPlugin } = require('gt-react-native/plugin');
const gtConfig = require('./gt.config.json');

module.exports = function (api) {
  // The plugin adds Intl polyfills for Hermes. Browsers have Intl, so web skips it.
  const isWeb = api.caller((caller) => caller?.platform === 'web');
  return {
    presets: ['babel-preset-expo'],
    plugins: isWeb
      ? []
      : [
          [
            gtPlugin,
            {
              locales: [gtConfig.defaultLocale, ...gtConfig.locales],
              entryPointFilePath: require.resolve('expo-router/entry'),
            },
          ],
        ],
  };
};
