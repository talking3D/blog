import i18next from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      'pl': {
        translations: require('./locales/pl/translations.json')
      },
      en: {
        translations: require('./locales/en/translations.json')
      }
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

  i18next.languages = ['pl', 'en'];

  export default i18next;