import Router from "./router/Router";
import LanguageSelect from "./pages/LanguageSelect";
import { useLanguage } from "./i18n/LanguageContext";
import PrintRoot from "./pdf/PrintRoot";

function App() {
  const { hasChosenLanguage } = useLanguage();

  // Always mounted (regardless of which screen is showing) so the
  // resume is ready to print/export the instant the person hits
  // Save/Share/Print on the Preview page - see src/pdf/PrintRoot.jsx
  // and src/pdf/print.css for how this becomes the actual exported
  // PDF content.
  const printRoot = <PrintRoot />;

  // First launch on this device: ask for a language before showing
  // anything else. Once chosen, this is remembered and the app goes
  // straight to the normal flow on every future visit.
  if (!hasChosenLanguage) {
    return (
      <>
        <LanguageSelect />
        {printRoot}
      </>
    );
  }

  return (
    <>
      <Router />
      {printRoot}
    </>
  );
}

export default App;