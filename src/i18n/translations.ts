import type { Translation } from 'gt-i18n/types';

// Metro can't bundle dynamic imports of JSON, so each locale is listed here.
// `npx gt translate` regenerates these files.
export const translations: Record<string, Record<string, Translation>> = {
  es: require('../_gt/es.json'),
};

export async function loadTranslations(locale: string) {
  return translations[locale] ?? {};
}
