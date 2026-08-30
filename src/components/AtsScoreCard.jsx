import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { useLanguage } from "../i18n/LanguageContext";
import {
  scoreResumeAgainstJobDescription,
  ratingForScore,
} from "../assistant/atsScorer";

const RATING_COLOR = {
  strong: "success",
  moderate: "warning",
  weak: "warning",
  poor: "error",
};

/**
 * Lets the person paste a job description and instantly see how well
 * their resume's own wording overlaps with it. Runs entirely on the
 * device via keyword-frequency matching (src/assistant/atsScorer.js)
 * - nothing is sent anywhere.
 */
function AtsScoreCard({ resume }) {
  const { t } = useLanguage();
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    setResult(scoreResumeAgainstJobDescription(resume, jobDescription));
  };

  const rating = result ? ratingForScore(result.score) : null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        mb: 3,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
        <AssessmentIcon sx={{ color: "primary.main" }} fontSize="small" />
        <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
          {t("atsScore.heading")}
        </Typography>
      </Stack>

      <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", mb: 1.5 }}>
        {t("atsScore.subtitle")}
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={3}
        maxRows={8}
        placeholder={t("atsScore.placeholder")}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        sx={{ mb: 1.5 }}
      />

      <Button
        variant="contained"
        onClick={handleCalculate}
        disabled={!jobDescription.trim()}
        sx={{
          backgroundColor: "primary.main",
          fontWeight: 700,
          textTransform: "none",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      >
        {result ? t("atsScore.recalculate") : t("atsScore.calculate")}
      </Button>

      {result && (
        <Box sx={{ mt: 2.5 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.6 }}>
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "primary.main" }}>
              {t("atsScore.scoreLabel")}
            </Typography>
            <Chip
              size="small"
              label={`${result.score}% \u00b7 ${t(`atsScore.rating.${rating}`)}`}
              color={RATING_COLOR[rating]}
              sx={{ fontWeight: 700 }}
            />
          </Stack>

          <LinearProgress
            variant="determinate"
            value={result.score}
            color={RATING_COLOR[rating]}
            sx={{ height: 8, borderRadius: 4, mb: 2 }}
          />

          {result.matched.length > 0 && (
            <Box sx={{ mb: 1.5 }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "text.secondary", mb: 0.6 }}>
                {t("atsScore.matched")} ({result.matched.length})
              </Typography>
              <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                {result.matched.map((kw) => (
                  <Chip
                    key={kw}
                    size="small"
                    label={kw}
                    sx={{
                      mb: 0.6,
                      fontSize: "0.7rem",
                      backgroundColor: "rgba(22,163,74,0.1)",
                      color: "success.dark",
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {result.missing.length > 0 && (
            <Box>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "text.secondary", mb: 0.6 }}>
                {t("atsScore.missing")} ({result.missing.length})
              </Typography>
              <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                {result.missing.map((kw) => (
                  <Chip
                    key={kw}
                    size="small"
                    label={kw}
                    sx={{
                      mb: 0.6,
                      fontSize: "0.7rem",
                      backgroundColor: "rgba(220,38,38,0.08)",
                      color: "error.main",
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
}

export default AtsScoreCard;
