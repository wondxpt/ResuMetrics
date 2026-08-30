import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Box,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PreviewIcon from "@mui/icons-material/Preview";
import TranslateIcon from "@mui/icons-material/Translate";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "../i18n/LanguageContext";
import Logo from "./common/Logo";
import { useColorMode } from "../theme/useColorMode";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage, languages } = useLanguage();
  const { mode, preference, setPreference } = useColorMode();

  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  const [langMenuAnchor, setLangMenuAnchor] = useState(null);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);

  const paths = [
    "/",
    "/personal",
    "/experience",
    "/education",
    "/skills",
    "/certifications",
    "/preview",
  ];

  const getValue = () => {
    const index = paths.indexOf(location.pathname);
    return index === -1 ? 0 : index;
  };

  const [value, setValue] = useState(getValue());

  useEffect(() => {
    setValue(getValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    // Whenever the active step changes (including on first load), make
    // sure it's actually scrolled into view - this is what keeps the
    // first ("Templates") and last ("Preview") steps reachable on
    // narrow phones instead of sitting off-screen.
    const activeEl = itemRefs.current[value];
    if (activeEl && activeEl.scrollIntoView) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(paths[newValue]);
  };

  const stepProgress = ((getValue() + 1) / paths.length) * 100;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={(theme) => ({
          background: alpha(theme.palette.background.paper, 0.85),
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        })}
      >
        <Toolbar
        sx={{
          gap: { xs: 0.5, sm: 1.5 },
          minHeight: { xs: 56, sm: 84 },
          width: "100%",
          minWidth: 0,
          px: { xs: 1, sm: 2 },
          overflow: "hidden",
        }}
      >
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Logo size={68} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: "-0.01em",
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
          >
            {t("appTitle")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.25, sm: 0.7 },
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
              }}
            >
              {t("nav.theme")}
            </Typography>

            <IconButton
              size="small"
              aria-label={t("nav.theme")}
              title={t("nav.theme")}
              onClick={(e) => setThemeMenuAnchor(e.currentTarget)}
              sx={{
                flexShrink: 0,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
            {preference === "auto" ? (
              <BrightnessAutoIcon fontSize="small" />
            ) : preference === "dark" ? (
              <DarkModeIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
            </IconButton>
          </Box>

          <Menu
            anchorEl={themeMenuAnchor}
            open={Boolean(themeMenuAnchor)}
            onClose={() => setThemeMenuAnchor(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              selected={preference === "auto"}
              onClick={() => {
                setPreference("auto");
                setThemeMenuAnchor(null);
              }}
            >
              <BrightnessAutoIcon fontSize="small" sx={{ marginInlineEnd: 1.2 }} />
              <ListItemText primary={t("nav.themeAuto")} secondary={mode === "dark" ? t("nav.themeDarkActive") : t("nav.themeLightActive")} />
            </MenuItem>
            <MenuItem
              selected={preference === "light"}
              onClick={() => {
                setPreference("light");
                setThemeMenuAnchor(null);
              }}
            >
              <LightModeIcon fontSize="small" sx={{ marginInlineEnd: 1.2 }} />
              <ListItemText primary={t("nav.themeLight")} />
            </MenuItem>
            <MenuItem
              selected={preference === "dark"}
              onClick={() => {
                setPreference("dark");
                setThemeMenuAnchor(null);
              }}
            >
              <DarkModeIcon fontSize="small" sx={{ marginInlineEnd: 1.2 }} />
              <ListItemText primary={t("nav.themeDark")} />
            </MenuItem>
          </Menu>

          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              whiteSpace: "nowrap",
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
            }}
          >
            {t("nav.language")}
          </Typography>

          <IconButton
            size="small"
            aria-label={t("nav.language")}
            title={t("nav.language")}
            onClick={(e) => setLangMenuAnchor(e.currentTarget)}
            sx={{
              flexShrink: 0,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <TranslateIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={langMenuAnchor}
            open={Boolean(langMenuAnchor)}
            onClose={() => setLangMenuAnchor(null)}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                selected={lang.code === language}
                onClick={() => {
                  setLanguage(lang.code);
                  setLangMenuAnchor(null);
                }}
              >
                <ListItemText>{lang.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>

        <LinearProgress
          variant="determinate"
          value={stepProgress}
          sx={{
            height: 3,
            borderRadius: 0,
            backgroundColor: "transparent",
            "& .MuiLinearProgress-bar": {
              background:
                "linear-gradient(90deg, #5A55E0 0%, #7C7FF2 100%)",
            },
          }}
        />
      </AppBar>

      <Toolbar sx={{ minHeight: "84px !important" }} />

      <Paper
        elevation={0}
        sx={(theme) => ({
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderTop: "1px solid",
          borderColor: "divider",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 -4px 16px rgba(0, 0, 0, 0.35)"
              : "0 -4px 16px rgba(15, 18, 34, 0.06)",
        })}
      >
        {/* Horizontally scrollable on narrow screens so every step
           (including the first and last) stays reachable, instead of
           being silently cut off by the viewport edge. */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x proximity",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            backgroundColor: "background.paper",
          }}
        >
          {[
            {
              label: t("nav.templates"),
              icon: <DescriptionIcon />,
            },
            {
              label: t("nav.personal"),
              icon: <PersonIcon />,
            },
            {
              label: t("nav.experience"),
              icon: <WorkIcon />,
            },
            {
              label: t("nav.education"),
              icon: <SchoolIcon />,
            },
            { label: t("nav.skills"), icon: <StarIcon /> },
            {
              label: t("nav.certifications"),
              icon: <WorkspacePremiumIcon />,
            },
            {
              label: t("nav.preview"),
              icon: <PreviewIcon />,
            },
          ].map((step, index) => {
            const selected = value === index;

            return (
              <Box
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleChange(null, index)}
                sx={(theme) => ({
                  flex: "0 0 auto",
                  scrollSnapAlign: "center",
                  minWidth: 76,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.4,
                  py: 1,
                  px: 1,
                  mx: 0.5,
                  my: 1,
                  borderRadius: 3,
                  cursor: "pointer",
                  color: selected ? "primary.main" : "grey.500",
                  backgroundColor: selected
                    ? alpha(theme.palette.primary.main, 0.14)
                    : "transparent",
                  transition:
                    "color 150ms ease, background-color 150ms ease",
                  WebkitTapHighlightColor: "transparent",
                })}
              >
                {step.icon}

                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>
    </>
  );
}

export default Navbar;