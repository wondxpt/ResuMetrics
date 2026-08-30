import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";
import AppThemeProvider from "./theme/AppThemeProvider";
import { LanguageProvider } from "./i18n/LanguageContext";

import "./theme/fonts.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <AppThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AppThemeProvider>

  </React.StrictMode>

);
