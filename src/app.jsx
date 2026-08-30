import Router from "./router/Router";
import LanguageSelect from "./pages/LanguageSelect";
import { useLanguage } from "./i18n/LanguageContext";

function App() {
  const { hasChosenLanguage } = useLanguage();

  // First launch on this device: ask for a language before showing
  // anything else. Once chosen, this is remembered and the app goes
  // straight to the normal flow on every future visit.
  if (!hasChosenLanguage) {
    return <LanguageSelect />;
  }

  return <Router />;
}

export default App;