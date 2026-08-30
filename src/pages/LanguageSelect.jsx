import { useState } from "react";
import { Box, Typography, Button, Fade } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Logo from "../components/common/Logo";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { UsFlagIcon, CaFlagIcon } from "../components/common/FlagIcons";

import { useLanguage } from "../i18n/LanguageContext";

// One-letter/glyph "flag" shown per language card - kept purely
// typographic (no emoji flags) so it renders identically everywhere
// and stays on-brand with the rest of the app's icon language.
const LANGUAGE_GLYPH = {
  en: "A",
  fa: "ف",
  ar: "ع",
  es: "Ñ",
  fr: "Fr",
  zh: "中",
};

// Shown every time the app is opened. Picking a language here only
// changes the app's own menus and forms - it has no effect on the
// resume content or the selected template, which are rendered
// independently of this setting.
function LanguageSelect() {
  const { t, language, setLanguage, confirmLanguage, languages } =
    useLanguage();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleContinue = () => {
    if (selected) confirmLanguage(selected);
  };

  // Preview the pick immediately: title/tagline/subtitle re-render in
  // the tapped language right away, before "Continue" is pressed.
  const handleSelect = (code) => {
    setSelected(code);
    setLanguage(code);
  };

  return (
    <Fade in timeout={420}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          px: 3,
          py: 6,
          backgroundColor: "background.default",
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(90,85,224,0.09) 0%, rgba(90,85,224,0) 42%)," +
            "radial-gradient(circle at 88% 92%, rgba(90,85,224,0.07) 0%, rgba(90,85,224,0) 42%)",
        }}
      >
        {/* Decorative, purely ambient - not read by users */}
        <Box
          aria-hidden="true"
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            backgroundImage:
              theme.palette.mode === "dark"
                ? "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"
                : "radial-gradient(circle, rgba(15,18,34,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, black 0%, transparent 75%)",
            pointerEvents: "none",
          })}
        />

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 640,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Brand mark. Just the icon file directly - no wrapper
             box-shadow. A large blurred box-shadow rendered as a
             solid dark block on the reported device's WebView
             instead of a soft glow, so it's removed entirely rather
             than chasing that per-device quirk. */}
          <Box sx={{ mb: 2 }}>
            <Logo size={260} />
          </Box>

          <Typography
            sx={{
              fontFamily:
                '"Inter", "Vazirmatn", "Segoe UI", Arial, sans-serif',
              fontSize: { xs: "2rem", sm: "2.3rem" },
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textAlign: "center",
              color: "text.primary",
              mb: 2.5,
            }}
          >
            ResuMetrics
          </Typography>

          {/* Value-prop banner - previews in the tapped language, live.
             Deliberately large/bold per request, with the two flags
             the product actually targets (US + Canada ATS formats). */}
          <Box
            sx={(theme) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              rowGap: 0.75,
              columnGap: 1,
              width: "100%",
              px: 2.5,
              py: 1.5,
              borderRadius: "16px",
              mb: 2.5,
              textAlign: "center",
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.22),
            })}
          >
            <AutoAwesomeIcon sx={{ fontSize: 22, color: "primary.main", flexShrink: 0 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
              <UsFlagIcon size={22} />
              <CaFlagIcon size={22} />
            </Box>
            <Typography
              dir={languages.find((l) => l.code === language)?.dir || "ltr"}
              sx={{
                fontFamily:
                  '"Inter", "Vazirmatn", "Segoe UI", Arial, sans-serif',
                fontSize: { xs: "1.05rem", sm: "1.2rem" },
                fontWeight: 800,
                lineHeight: 1.35,
                color: "primary.main",
              }}
            >
              {t("languageSelect.tagline")}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily:
                '"Inter", "Vazirmatn", "Segoe UI", Arial, sans-serif',
              fontSize: "1.95rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textAlign: "center",
              mb: 1.25,
              backgroundImage:
                "linear-gradient(135deg, #5A55E0 0%, #4338CA 60%, #362DB0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "text.primary",
            }}
          >
            {t("languageSelect.title")}
          </Typography>

          <Typography
            sx={{
              fontFamily:
                '"Inter", "Vazirmatn", "Segoe UI", Arial, sans-serif',
              color: "text.secondary",
              textAlign: "center",
              maxWidth: 420,
              mb: 5,
              fontSize: "0.98rem",
              lineHeight: 1.65,
            }}
          >
            {t("languageSelect.subtitle")}
          </Typography>

          {/* Language grid - every card keeps the same internal layout
             order (glyph, label, radio) regardless of the language's
             own reading direction, so the grid stays visually even
             instead of mirroring per-row. Only the label text itself
             switches direction. */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
              },
              gap: 1.5,
              width: "100%",
            }}
          >
            {languages.map((lang) => {
              const isSelected = selected === lang.code;
              const isHovered = hovered === lang.code;

              return (
                  <Box
                    key={lang.code}
                    component="button"
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    onMouseEnter={() => setHovered(lang.code)}
                    onMouseLeave={() => setHovered(null)}
                    sx={(theme) => ({
                      appearance: "none",
                      width: "100%",
                      minWidth: 0,
                      boxSizing: "border-box",
                      height: 66,
                      cursor: "pointer",
                      textAlign: "start",
                      fontFamily: "inherit",
                      borderRadius: "14px",
                      border: "1px solid",
                      borderColor: isSelected
                        ? "primary.main"
                        : isHovered
                        ? "primary.light"
                        : "divider",
                      backgroundColor: isSelected
                        ? alpha(theme.palette.primary.main, 0.12)
                        : "background.paper",
                      px: 2,
                      py: 1.75,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      position: "relative",
                      boxShadow: isSelected
                        ? "0 1px 3px rgba(67,56,202,0.14), 0 4px 10px rgba(67,56,202,0.10)"
                        : isHovered
                        ? "0 2px 6px rgba(15,18,34,0.08)"
                        : "0 1px 2px rgba(15,18,34,0.05)",
                      transform:
                        isHovered && !isSelected
                          ? "translateY(-1px)"
                          : "translateY(0)",
                      transition:
                        "border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
                      outline: "none",
                      "&:focus-visible": {
                        boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.16)}, 0 1px 2px rgba(67,56,202,0.20)`,
                      },
                    })}
                  >
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        backgroundColor: isSelected
                          ? "primary.main"
                          : "grey.100",
                        color: isSelected
                          ? "primary.contrastText"
                          : "text.secondary",
                        transition:
                          "background-color 160ms ease, color 160ms ease",
                      }}
                    >
                      {LANGUAGE_GLYPH[lang.code] || lang.code.toUpperCase()}
                    </Box>

                    <Typography
                      dir={lang.dir}
                      sx={{
                        flex: "1 1 auto",
                        minWidth: 0,
                        fontFamily:
                          '"Inter", "Vazirmatn", "Segoe UI", Arial, sans-serif',
                        fontWeight: 600,
                        fontSize: "0.98rem",
                        textAlign: "start",
                        color: isSelected ? "primary.dark" : "text.primary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lang.label}
                    </Typography>

                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isSelected
                          ? "primary.main"
                          : "transparent",
                        border: isSelected ? "none" : "1.5px solid",
                        borderColor: "grey.300",
                        transition:
                          "background-color 160ms ease, border-color 160ms ease",
                      }}
                    >
                      {isSelected && (
                        <CheckIcon
                          sx={{ fontSize: 13, color: "#fff" }}
                        />
                      )}
                    </Box>
                  </Box>
              );
            })}
          </Box>

          <Button
            variant="contained"
            size="large"
            disabled={!selected}
            onClick={handleContinue}
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 4.5,
              px: 4.5,
              minWidth: 200,
              background: selected
                ? "linear-gradient(135deg, #5A55E0 0%, #4338CA 100%)"
                : undefined,
              "&:hover": {
                background: selected
                  ? "linear-gradient(135deg, #4F4AD1 0%, #362DB0 100%)"
                  : undefined,
              },
              "&.Mui-disabled": {
                backgroundColor: "grey.100",
                color: "text.disabled",
              },
            }}
          >
            {t("languageSelect.continueButton")}
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}

export default LanguageSelect;
