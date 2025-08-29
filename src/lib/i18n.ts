import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '@/locales/en.json';
import jpTranslations from '@/locales/jp.json';

const resources = {
  en: {
    translation: enTranslations
  },
  jp: {
    translation: jpTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Add language change listener
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;