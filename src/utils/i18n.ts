import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { routes } from 'config/config';
import HttpApi from 'i18next-http-backend';
import en from 'translation/en.json';
import kr from 'translation/kr.json';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: en },
      kr: { translation: kr },
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    },
  });

export default i18n;
