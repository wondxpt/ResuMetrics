import { useState } from "react";
import {
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
  Stack,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TranslateIcon from "@mui/icons-material/Translate";

import { useLanguage } from "../i18n/LanguageContext";
import {
  polishBulletPoint,
  polishSummary,
  polishGenericField,
} from "../assistant/textPolisher";
import {
  translateToEnglish,
  isTranslationSupported,
} from "../assistant/translator";

const ENGINES = {
  bullet: polishBulletPoint,
  summary: polishSummary,
  generic: polishGenericField,
};

/**
 * Runs the fully-offline professional-English rewrite engine on the
 * current value of a field and applies the result immediately (with
 * an Undo option). If the app's current language isn't English, this
 * first machine-translates the text to English (offline, via
 * src/assistant/translator.js) before polishing it - the button label
 * and icon switch automatically to reflect that. `mode` selects which
 * rewrite engine to use after translation.
 */
function PolishButton({ value, onApply, mode = "generic", size = "small" }) {
  const { t, language } = useLanguage();
  const [snackbar, setSnackbar] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [busy, setBusy] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(null);

  const needsTranslation = isTranslationSupported(language);

  const handlePolish = async () => {
    const raw = String(value || "").trim();
    if (!raw) return;

    setBusy(true);
    setDownloadProgress(null);

    try {
      let englishText = raw;

      if (needsTranslation) {
        englishText = await translateToEnglish(raw, language, (progress) => {
          // transformers.js progress events include a `status` and,
          // during file download, a `progress` percentage (0-100).
          if (progress?.status === "progress" && typeof progress.progress === "number") {
            setDownloadProgress(Math.round(progress.progress));
          }
        });
      }

      const engine = ENGINES[mode] || ENGINES.generic;
      const result = engine(englishText);

      if (!result.text) {
        setBusy(false);
        return;
      }

      setPreviousValue(value);
      onApply(result.text);
      setSnackbar({ tips: result.tips || [] });
    } catch (error) {
      setSnackbar({
        error:
          error?.message && /not installed|isn't set up/i.test(error.message)
            ? t("polish.translationUnavailable")
            : t("polish.translationFailed"),
      });
    } finally {
      setBusy(false);
      setDownloadProgress(null);
    }
  };

  const handleUndo = () => {
    if (previousValue !== null) {
      onApply(previousValue);
    }
    setSnackbar(null);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          size={size}
          variant="text"
          startIcon={
            busy ? (
              <CircularProgress size={14} />
            ) : needsTranslation ? (
              <TranslateIcon fontSize="small" />
            ) : (
              <AutoFixHighIcon fontSize="small" />
            )
          }
          onClick={handlePolish}
          disabled={!String(value || "").trim() || busy}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            color: "#5A55E0",
            alignSelf: "flex-start",
            px: 1,
            "&:hover": { backgroundColor: "rgba(90,85,224,0.08)" },
          }}
        >
          {needsTranslation ? t("polish.translateButton") : t("polish.button")}
        </Button>

        {busy && downloadProgress !== null && (
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
            {t("polish.downloadingModel")} {downloadProgress}%
          </Typography>
        )}
      </Stack>

      {busy && downloadProgress !== null && (
        <LinearProgress
          variant="determinate"
          value={downloadProgress}
          sx={{ height: 4, borderRadius: 2, mt: 0.5, maxWidth: 220 }}
        />
      )}

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={7000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar(null)}
          severity={snackbar?.error ? "error" : "success"}
          variant="filled"
          action={
            !snackbar?.error && (
              <Button color="inherit" size="small" onClick={handleUndo}>
                {t("polish.undo")}
              </Button>
            )
          }
          sx={{ maxWidth: 420 }}
        >
          {snackbar?.error ? (
            <Typography sx={{ fontSize: "0.85rem" }}>{snackbar.error}</Typography>
          ) : (
            <>
              <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                {t("polish.applied")}
              </Typography>

              {snackbar?.tips?.length > 0 && (
                <Box sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, opacity: 0.9 }}>
                    {t("polish.tipsTitle")}
                  </Typography>
                  <Stack spacing={0.2}>
                    {snackbar.tips.map((tip, i) => (
                      <Typography key={i} sx={{ fontSize: "0.72rem", opacity: 0.9 }}>
                        • {tip}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}
            </>
          )}
        </Alert>
      </Snackbar>
    </>
  );
}

export default PolishButton;
