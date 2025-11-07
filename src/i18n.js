import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import fiCommon from "./locales/fi/common.json";

const resources = {
  en: { common: enCommon },
  fi: { common: fiCommon },
};

// Auto-detect browser language
const getBrowserLanguage = () => {
  const saved = localStorage.getItem("language");
  if (saved) return saved;

  const browserLang = navigator.language.split("-")[0]; // e.g., "en" from "en-US"
  const supportedLangs = ["en", "fi"];

  return supportedLangs.includes(browserLang) ? browserLang : "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getBrowserLanguage(),
  ns: ["common"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  react: {
    useSuspense: false,
    bindI18n: "languageChanged",
    bindI18nStore: "added",
  },
});

export default i18n;
