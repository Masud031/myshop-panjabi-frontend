import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ✅ Define your language resources (English + Bengali)
const resources = {
  en: {
    translation: {
      welcome: "Welcome to our website!",
      home: "Home",
      shop: "Shop",
      contact: "Contact",
      language: "Language",
      // categories: "Categories",
      // trending: "Trending Products",
      deals: "Special Deals",
    },
  },
  bn: {
    translation: {
      welcome: "আমাদের ওয়েবসাইটে স্বাগতম!",
      home: "হোম",
      shop: "দোকান",
      contact: "যোগাযোগ",
      language: "ভাষা",
      // categories: "বিভাগসমূহ",
      // trending: "জনপ্রিয় পণ্যসমূহ",
      deals: "বিশেষ অফার",
    },
  },
};

// ✅ Initialize i18next
i18n
  .use(LanguageDetector) // auto detect user language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // default language
    debug: false,
    interpolation: {
      escapeValue: false, // react already escapes
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
