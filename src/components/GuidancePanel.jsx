import { Box, Paper, Typography, IconButton, Collapse, Stack } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import { useLanguage } from "../i18n/LanguageContext";

const STORAGE_PREFIX = "resume-builder-guidance-dismissed:";

function readDismissed(sectionKey) {
  try {
    return window.localStorage.getItem(STORAGE_PREFIX + sectionKey) === "1";
  } catch (error) {
    return false;
  }
}

function writeDismissed(sectionKey, value) {
  try {
    window.localStorage.setItem(
      STORAGE_PREFIX + sectionKey,
      value ? "1" : "0"
    );
  } catch (error) {
    // localStorage can throw in restricted contexts - ignore silently,
    // the panel will just reappear next time, which is harmless.
  }
}

/**
 * A small "before you start" tips card shown at the top of a resume
 * section (Personal, Experience, Education, Skills, Certifications).
 * Content comes entirely from the local translations bundle - fully
 * offline, no network. Dismissing it is remembered per device via
 * localStorage, and it can be reopened with the lightbulb button.
 */
function GuidancePanel({ sectionKey }) {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(() => readDismissed(sectionKey));

  const title = t(`guidance.${sectionKey}.title`);
  const tips = t(`guidance.${sectionKey}.tips`);

  if (!Array.isArray(tips) || tips.length === 0) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    writeDismissed(sectionKey, true);
  };

  const handleReopen = () => {
    setDismissed(false);
    writeDismissed(sectionKey, false);
  };

  if (dismissed) {
    return (
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1.5 }}>
        <IconButton
          size="small"
          onClick={handleReopen}
          title={t("guidance.showTips")}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            color: "warning.main",
          }}
        >
          <LightbulbIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  return (
    <Collapse in={!dismissed}>
      <Paper
        elevation={0}
        sx={{
          mb: 2.5,
          p: 2,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "warning.main",
          backgroundColor: "warning.light",
        }}
      >
        <Stack direction="row" alignItems="flex-start" spacing={1.2}>
          <LightbulbIcon
            fontSize="small"
            sx={{ color: "warning.dark", mt: 0.3, flexShrink: 0 }}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{ fontWeight: 700, color: "warning.dark", mb: 0.7, fontSize: "0.9rem" }}
            >
              {title}
            </Typography>

            <Stack spacing={0.4}>
              {tips.map((tip, index) => (
                <Typography
                  key={index}
                  sx={{ fontSize: "0.83rem", color: "warning.dark", lineHeight: 1.5 }}
                >
                  • {tip}
                </Typography>
              ))}
            </Stack>
          </Box>

          <IconButton size="small" onClick={handleDismiss} sx={{ color: "warning.dark" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Paper>
    </Collapse>
  );
}

export default GuidancePanel;
