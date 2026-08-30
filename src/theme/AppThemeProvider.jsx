import { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { createAppTheme } from "./theme";
import { ColorModeProvider, useColorMode } from "./useColorMode";

function ThemedApp({ children }) {
  const { mode } = useColorMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function AppThemeProvider({ children }) {
  return (
    <ColorModeProvider>
      <ThemedApp>{children}</ThemedApp>
    </ColorModeProvider>
  );
}

export default AppThemeProvider;
