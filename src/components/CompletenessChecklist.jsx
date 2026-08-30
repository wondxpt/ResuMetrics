import { Box, Typography, LinearProgress, Stack, Chip } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";

import { useLanguage } from "../i18n/LanguageContext";

/**
 * Shows a live completeness percentage + a list of specific,
 * actionable nudges while the person is filling in a section - fully
 * derived from local, synchronous checks (see
 * src/assistant/completenessChecker.js). No network, updates on
 * every render.
 */
function CompletenessChecklist({ percent, missing }) {
  const { t } = useLanguage();

  if (percent >= 100 && (!missing || missing.length === 0)) {
    return null;
  }

  const color =
    percent >= 75 ? "success" : percent >= 40 ? "warning" : "error";

  return (
    <Box
      sx={{
        mb: 2.5,
        p: 1.8,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "primary.main" }}>
          {t("completeness.title")}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: `${color}.main` }}>
          {percent}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={percent}
        color={color}
        sx={{ height: 6, borderRadius: 3, mb: missing?.length ? 1.2 : 0 }}
      />

      {Array.isArray(missing) && missing.length > 0 && (
        <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
          {missing.map((key) => (
            <Chip
              key={key}
              size="small"
              icon={<ErrorOutlineIcon sx={{ fontSize: 14 }} />}
              label={t(key)}
              sx={{
                fontSize: "0.7rem",
                backgroundColor: "rgba(220, 38, 38, 0.08)",
                color: "error.main",
                mb: 0.6,
                "& .MuiChip-icon": { color: "error.main" },
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default CompletenessChecklist;
