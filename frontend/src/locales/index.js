import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './ru.js';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: resources,
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    plurals: {
      ru: {
        numbers: [0, 1, 2, 5],
        plurals: (n) => {
          const lastTwo = n % 100;
          const last = n % 10;
          if (lastTwo >= 11 && lastTwo <= 19) return 'many';
          if (last === 1) return 'one';
          if (last >= 2 && last <= 4) return 'few';
          return 'many';
        },
      },
    },
  });

export default i18n;
