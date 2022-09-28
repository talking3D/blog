/* eslint-disable global-require */
/* eslint-disable import/no-duplicates */
import i18next from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// const options = {
//   order: ['localStorage', 'path'],
//   lookupLocalStorage: 'i18nextLng',
//   caches: ['localStorage'],
// };

i18n
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      pl: {
        translations: require('./locales/pl/translations.json'),
      },
      en: {
        translations: require('./locales/en/translations.json'),
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    // detection: options,
  });

i18next.languages = ['pl', 'en'];

export default i18next;
