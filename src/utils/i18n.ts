import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { routes } from 'config/config';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: `${routes.api.baseUrl}/api/multilingualtext?language=0`,
      parse: (data: any) => {
        const jsonData = JSON?.parse(data);
        return jsonData?.data || {};
      },
      crossDomain: true,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    },
  });

export default i18n;
