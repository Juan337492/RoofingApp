import { I18nStore, InternalGTProvider } from '@generaltranslation/react-core/components';
import { initializeGT } from 'gt-react-native';
import { createContext, startTransition, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

import gtConfig from '../../gt.config.json';
import { loadTranslations, translations } from './translations';

initializeGT({ defaultLocale: gtConfig.defaultLocale, locales: gtConfig.locales, loadTranslations });

const noop = () => {};

export type Language = 'en' | 'es';
export const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const STORAGE_KEY = 'language';

function toLanguage(tag: string | null | undefined): Language | null {
  if (!tag) return null;
  return tag.toLowerCase().startsWith('es') ? 'es' : tag.toLowerCase().startsWith('en') ? 'en' : null;
}

function savedLanguage(): Language | null {
  if (Platform.OS !== 'web') return null;
  try {
    return toLanguage(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function deviceLanguage(): Language {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
    for (const tag of navigator.languages ?? [navigator.language]) {
      const language = toLanguage(tag);
      if (language) return language;
    }
    return 'en';
  }
  return toLanguage(Intl.DateTimeFormat().resolvedOptions().locale) ?? 'en';
}

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({
  language: 'en',
  setLanguage: () => {},
});

export function useLanguage() {
  return use(LanguageContext);
}

/**
 * Picks the language and provides translations. The exported HTML is English, so
 * web starts in English to match it and switches after hydration.
 *
 * gt-react-native's GTProvider loads translations behind a Suspense boundary,
 * which static rendering can't finish, so React would throw away the exported
 * HTML and render the page again (error #419). Translations are bundled, so this
 * hands them to GT's core provider directly and nothing suspends.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() =>
    Platform.OS === 'web' ? 'en' : deviceLanguage()
  );

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const preferred = savedLanguage() ?? deviceLanguage();
    if (preferred !== 'en') startTransition(() => setLanguageState(preferred));
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
    }
    startTransition(() => setLanguageState(next));
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
  const snapshot = useMemo(() => ({ [language]: translations[language] ?? {} }), [language]);
  const [i18nStore] = useState(() => new I18nStore());
  const setLocale = useCallback((locale: string) => setLanguage(locale === 'es' ? 'es' : 'en'), [setLanguage]);

  return (
    <LanguageContext value={value}>
      <InternalGTProvider
        translations={snapshot}
        locale={language}
        region={undefined}
        enableI18n
        setLocale={setLocale}
        setRegion={noop}
        setEnableI18n={noop}
        i18nStore={i18nStore}>
        {children}
      </InternalGTProvider>
    </LanguageContext>
  );
}
