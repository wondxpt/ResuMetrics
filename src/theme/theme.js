import { createTheme } from "@mui/material/styles";

// ============================================================
// DESIGN SYSTEM
// Inspired by the design language of Stripe / Linear: an
// indigo-violet primary, a calm neutral-grey scale, soft
// multi-layer shadows instead of flat MUI elevation, generous
// radii, and a confident but restrained type scale.
//
// Supports light + dark mode. createAppTheme(mode) builds a full
// theme for "light" or "dark" - see src/theme/useColorMode.js for
// how the mode is picked automatically from the OS setting.
// ============================================================

const lightColors = {
  indigo50: "#EEF0FF",
  indigo100: "#E0E3FF",
  indigo400: "#7C7FF2",
  indigo500: "#5A55E0",
  indigo600: "#4338CA",
  indigo700: "#362DB0",

  textPrimary: "#0F1222",
  textSecondary: "#63647A",
  textDisabled: "#D2D2DE",

  bgDefault: "#F8F8FB",
  bgPaper: "#FFFFFF",
  surfaceInput: "#FFFFFF",

  grey50: "#F8F8FB",
  grey100: "#F1F1F6",
  grey200: "#E4E4EC",
  grey300: "#D2D2DE",
  grey500: "#8A8CA0",
  grey600: "#63647A",

  divider: "#E4E4EC",

  success: "#12B76A",
  warning: "#F79009",
  error: "#E5484D",

  tooltipBg: "#0F1222",
  scrollbarThumb: "#D2D2DE",

  shadowColor: "15, 18, 34",
};

const darkColors = {
  indigo50: "#1B1E38",
  indigo100: "#242855",
  indigo400: "#8B8EF5",
  indigo500: "#8184F0",
  indigo600: "#9497F7",
  indigo700: "#AEB1FA",

  textPrimary: "#F2F3F8",
  textSecondary: "#9A9CB8",
  textDisabled: "#4B4E68",

  bgDefault: "#0D0E16",
  bgPaper: "#161826",
  surfaceInput: "#1D2032",

  grey50: "#161826",
  grey100: "#1D2032",
  grey200: "#2B2E45",
  grey300: "#3A3D5C",
  grey500: "#7375A0",
  grey600: "#9A9CB8",

  divider: "#2B2E45",

  success: "#2ED18A",
  warning: "#FBAE3C",
  error: "#F16C71",

  tooltipBg: "#F2F3F8",
  scrollbarThumb: "#3A3D5C",

  shadowColor: "0, 0, 0",
};

function buildShadows(c) {
  const shadows = [
    "none",
    `0 1px 2px rgba(${c.shadowColor}, 0.20)`,
    `0 1px 3px rgba(${c.shadowColor}, 0.24), 0 1px 2px rgba(${c.shadowColor}, 0.16)`,
    `0 2px 6px rgba(${c.shadowColor}, 0.24), 0 1px 2px rgba(${c.shadowColor}, 0.16)`,
    `0 4px 10px rgba(${c.shadowColor}, 0.28), 0 2px 4px rgba(${c.shadowColor}, 0.18)`,
    `0 8px 20px rgba(${c.shadowColor}, 0.32), 0 3px 6px rgba(${c.shadowColor}, 0.20)`,
    `0 12px 28px rgba(${c.shadowColor}, 0.36), 0 4px 8px rgba(${c.shadowColor}, 0.20)`,
  ];
  // Fill the remaining MUI elevation slots (7-24) by repeating the
  // strongest shadow so components that ask for deep elevation don't
  // fall back to MUI's default harsh box-shadows.
  while (shadows.length < 25) shadows.push(shadows[6]);
  return shadows;
}

export function createAppTheme(mode = "light") {
  const c = mode === "dark" ? darkColors : lightColors;
  const shadows = buildShadows(c);
  const tooltipTextColor = mode === "dark" ? "#0D0E16" : "#FFFFFF";

  return createTheme({
    palette: {
      mode,

      background: {
        default: c.bgDefault,
        paper: c.bgPaper,
      },

      primary: {
        main: c.indigo600,
        light: c.indigo400,
        dark: c.indigo700,
        contrastText: mode === "dark" ? "#0D0E16" : "#FFFFFF",
      },

      secondary: {
        main: c.textPrimary,
        contrastText: mode === "dark" ? "#0D0E16" : "#FFFFFF",
      },

      accent: {
        main: c.indigo500,
      },

      success: { main: c.success },
      warning: { main: c.warning },
      error: { main: c.error },

      divider: c.divider,

      text: {
        primary: c.textPrimary,
        secondary: c.textSecondary,
        disabled: c.textDisabled,
      },

      grey: {
        50: c.grey50,
        100: c.grey100,
        200: c.grey200,
        300: c.grey300,
        500: c.grey500,
        600: c.grey600,
      },
    },

    typography: {
      fontFamily:
        '"Inter", "Vazirmatn", "Segoe UI", Arial, sans-serif',

      h1: { fontWeight: 700, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.02em" },
      h3: { fontWeight: 700, letterSpacing: "-0.01em" },
      h4: { fontWeight: 700, letterSpacing: "-0.01em" },
      h5: { fontWeight: 700, letterSpacing: "-0.01em" },
      h6: { fontWeight: 600 },

      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },

      body1: { lineHeight: 1.6 },
      body2: { lineHeight: 1.6, color: c.textSecondary },

      button: {
        fontWeight: 600,
        textTransform: "none",
        letterSpacing: "0.01em",
      },
    },

    shape: {
      borderRadius: 14,
    },

    shadows,

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            backgroundColor: c.bgDefault,
            color: c.textPrimary,
          },
          body: {
            backgroundColor: c.bgDefault,
            color: c.textPrimary,
            scrollbarColor: `${c.scrollbarThumb} transparent`,
            "--app-divider": c.divider,
            "--app-text-primary": c.textPrimary,
            "--app-text-secondary": c.textSecondary,
            "--app-bg-default": c.bgDefault,
            "--app-bg-paper": c.bgPaper,
          },
          "*::selection": {
            backgroundColor: c.indigo100,
          },
          "*::-webkit-scrollbar": {
            width: 10,
            height: 10,
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: c.scrollbarThumb,
            borderRadius: 8,
            border: "2px solid transparent",
            backgroundClip: "content-box",
          },
          "*::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        },
      },

      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
          outlined: {
            borderColor: c.divider,
          },
        },
      },

      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 18,
            border: `1px solid ${c.divider}`,
            boxShadow: shadows[2],
            transition:
              "box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease",
            "&:hover": {
              boxShadow: shadows[4],
              borderColor: c.indigo400,
            },
          },
        },
      },

      MuiCardActionArea: {
        styleOverrides: {
          root: {
            borderRadius: "inherit",
            "&:hover": {
              transform: "translateY(-2px)",
            },
            "& .MuiCardActionArea-focusHighlight": {
              opacity: 0,
            },
          },
        },
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 12,
            paddingInline: 20,
            paddingBlock: 10,
            fontWeight: 600,
            transition:
              "box-shadow 150ms ease, transform 150ms ease, background-color 150ms ease",
          },
          containedPrimary: {
            boxShadow: `0 1px 2px rgba(${c.shadowColor}, 0.30)`,
            "&:hover": {
              boxShadow: `0 4px 12px rgba(${c.shadowColor}, 0.35)`,
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
          outlined: {
            borderColor: c.grey300,
            "&:hover": {
              borderColor: c.indigo500,
              backgroundColor: c.indigo50,
            },
          },
          text: {
            "&:hover": {
              backgroundColor: c.grey100,
            },
          },
          sizeLarge: {
            paddingInline: 26,
            paddingBlock: 13,
            fontSize: "1rem",
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            transition: "background-color 150ms ease",
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
          },
          outlined: {
            borderColor: c.grey300,
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            color: c.textPrimary,
            "& input, & textarea": {
              color: c.textPrimary,
              WebkitTextFillColor: c.textPrimary,
            },
            "& input::placeholder, & textarea::placeholder": {
              color: c.textSecondary,
              opacity: 1,
            },
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          select: {
            color: c.textPrimary,
          },
          icon: {
            color: c.textSecondary,
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: c.textSecondary,
            fontWeight: 500,
            "&.Mui-focused": {
              color: c.indigo600,
            },
          },
        },
      },

      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: c.textSecondary,
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: c.textPrimary,
            "&.Mui-selected": {
              backgroundColor: c.indigo50,
            },
            "&.Mui-selected:hover": {
              backgroundColor: c.indigo100,
            },
          },
        },
      },

      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: c.textSecondary,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: c.surfaceInput,
            transition: "box-shadow 150ms ease, border-color 150ms ease",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: c.grey300,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: c.indigo400,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: c.indigo600,
              borderWidth: 1.5,
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 4px ${c.indigo100}`,
            },
          },
        },
      },

      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: c.divider,
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: c.tooltipBg,
            color: tooltipTextColor,
            borderRadius: 8,
            fontSize: "0.75rem",
            padding: "6px 10px",
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            backgroundColor: c.grey200,
          },
          bar: {
            borderRadius: 999,
          },
        },
      },
    },
  });
}

// Default export kept as the light theme so any legacy `import theme
// from "./theme"` usage keeps working without a mode.
const theme = createAppTheme("light");
export default theme;
