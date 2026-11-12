const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// See src/i18n/gt-react-native.ts.
const gtShim = path.resolve(__dirname, 'src/i18n/gt-react-native.ts');
const resolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'gt-react-native') {
    return { type: 'sourceFile', filePath: gtShim };
  }
  return (resolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
