/**
 * What the app uses from gt-react-native, taken from the GT core packages it is
 * built on. metro.config.js points `gt-react-native` imports here.
 *
 * Importing gt-react-native itself loads its native module, which Expo Go does
 * not have, so the app would crash there. Nothing used here needs it: language
 * is chosen in src/i18n/language.tsx. Source files still import
 * `gt-react-native`, because that is what `npx gt translate` looks for.
 */
export { T, Var } from '@generaltranslation/react-core/components';
export { useGT, useMessages } from '@generaltranslation/react-core/hooks';
export { internalInitializeGTSRA as initializeGT, msg } from '@generaltranslation/react-core/pure';
