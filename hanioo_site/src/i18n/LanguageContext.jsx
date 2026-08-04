import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

function getInitialLanguage() {
  // Always default to English (the first language option) on every page
  // load / refresh — the button never opens up already showing a
  // previously picked language. The user can still switch languages from
  // the dropdown for the current session.
  return "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
  };

  // t("navbar.home") walks the nested translations object for the
  // current language and falls back to English, then to the key itself.
  const t = useMemo(() => {
    return (path) => {
      const keys = path.split(".");
      const walk = (obj) => keys.reduce((acc, k) => (acc ? acc[k] : undefined), obj);
      return walk(translations[language]) ?? walk(translations.en) ?? path;
    };
  }, [language]);

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
