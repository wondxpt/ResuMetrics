import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "resume-builder-color-mode";
const VALID_PREFERENCES = new Set(["auto", "light", "dark"]);

const ColorModeContext = createContext(null);

function getSystemMode() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    ? "dark"
    : "light";
}

function readStoredPreference() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return VALID_PREFERENCES.has(stored) ? stored : "auto";
  } catch (error) {
    console.warn("Couldn't read saved color mode preference:", error);
    return "auto";
  }
}

function resolveMode(preference, systemMode) {
  return preference === "auto" ? systemMode : preference;
}

function useColorModeState() {
  const [preference, setPreferenceState] = useState(readStoredPreference);
  const [systemMode, setSystemMode] = useState(getSystemMode);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) => {
      setSystemMode(event.matches ? "dark" : "light");
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const setPreference = (nextPreference) => {
    if (!VALID_PREFERENCES.has(nextPreference)) return;

    setPreferenceState(nextPreference);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextPreference);
    } catch (error) {
      console.warn("Couldn't save color mode preference:", error);
    }
  };

  return useMemo(
    () => ({
      mode: resolveMode(preference, systemMode),
      preference,
      setPreference,
    }),
    [preference, systemMode]
  );
}

export function ColorModeProvider({ children }) {
  const value = useColorModeState();

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("useColorMode must be used inside ColorModeProvider");
  }

  return context;
}
