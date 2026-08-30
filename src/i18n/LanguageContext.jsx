import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import translations, {
  DEFAULT_LANGUAGE,
  LANGUAGES,
} from "./translations";

const STORAGE_KEY = "resume-builder-language";

const LanguageContext = createContext(null);

function getNestedValue(obj, path) {
  return path
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
}

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) return stored;
  } catch (error) {
    // localStorage can throw in some restricted/private modes -
    // fall back to the default language rather than crash.
    console.warn("Couldn't read saved language:", error);
  }
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(
    readStoredLanguage
  );

  // Intentionally NOT read from storage: the language screen should
  // be asked again every time the app is opened, so this always
  // starts at false. It only stays true for the lifetime of this
  // in-memory session (i.e. until the page is reloaded or reopened).
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);

  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === language);

    document.documentElement.lang = language;
    document.documentElement.dir = meta ? meta.dir : "ltr";

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.warn("Couldn't save language preference:", error);
    }
  }, [language]);

  const setLanguage = (code) => {
    if (translations[code]) {
      setLanguageState(code);
    }
  };

  // Used by the "select your language" screen: sets the language
  // and marks the choice as made for the rest of this in-memory
  // session, so the screen doesn't reappear on internal navigation -
  // it comes back the next time the app is opened or the page is
  // reloaded, by design.
  const confirmLanguage = (code) => {
    if (!translations[code]) return;

    setLanguageState(code);
    setHasChosenLanguage(true);
  };

  const t = useMemo(() => {
    return (key, fallback) => {
      const dict = translations[language] || translations[DEFAULT_LANGUAGE];
      const value = getNestedValue(dict, key);

      if (value !== undefined) return value;

      const englishValue = getNestedValue(
        translations[DEFAULT_LANGUAGE],
        key
      );

      return englishValue !== undefined
        ? englishValue
        : fallback !== undefined
        ? fallback
        : key;
    };
  }, [language]);

  const value = {
    language,
    setLanguage,
    hasChosenLanguage,
    confirmLanguage,
    t,
    languages: LANGUAGES,
    dir:
      LANGUAGES.find((l) => l.code === language)?.dir || "ltr",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error(
      "useLanguage must be used inside a LanguageProvider"
    );
  }

  return ctx;
}
