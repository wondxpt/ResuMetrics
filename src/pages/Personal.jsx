import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from "@mui/icons-material/Tune";

import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useResumeStore from "../store/resumeStore";
import PhotoEditorDialog from "../components/PhotoEditorDialog";
import { useLanguage } from "../i18n/LanguageContext";
import GuidancePanel from "../components/GuidancePanel";
import CompletenessChecklist from "../components/CompletenessChecklist";
import PolishButton from "../components/PolishButton";
import { checkPersonalCompleteness } from "../assistant/completenessChecker";

function Personal() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const data = useResumeStore();
  const photoInputRef = useRef(null);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSource, setEditorSource] = useState("");

  const normalizedTemplate = (() => {
    const aliasMap = {
      canadian: "chronological",
      classic: "minimal",
      executive: "creative_photo",
      creative: "creative_photo",
      modern: "two_column",
      modern_two_column: "two_column",
      two_column: "two_column",
    };

    return (
      aliasMap[data.selected_template] ||
      data.selected_template ||
      "chronological"
    );
  })();

  const supportsProfilePhoto = [
    "two_column",
    "creative_photo",
  ].includes(normalizedTemplate);

  const handleChange = (e) => {
    data.updatePersonal({
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setEditorSource(String(reader.result || ""));
      setEditorOpen(true);
    };

    reader.readAsDataURL(file);

    // Allow re-selecting the same file later without the input
    // silently ignoring the change event.
    e.target.value = "";
  };

  const openEditorForExistingPhoto = () => {
    setEditorSource(
      data.photo_path_original || data.photo_path
    );
    setEditorOpen(true);
  };

  const handleEditorSave = (croppedDataUrl) => {
    data.updatePersonal({
      photo_path: croppedDataUrl,
      photo_path_original: editorSource,
    });
    setEditorOpen(false);
  };

  const clearPhoto = () => {
    data.updatePersonal({
      photo_path: "",
      photo_path_original: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {t("personalPage.title")}
          </Typography>

          <GuidancePanel sectionKey="personal" />
          <CompletenessChecklist
            {...checkPersonalCompleteness(data)}
          />

          <Stack spacing={2}>
            <TextField
              label={t("personalPage.fullName")}
              name="full_name"
              value={data.full_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label={t("personalPage.targetTitle")}
              name="target_title"
              value={data.target_title}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label={t("personalPage.location")}
              name="location"
              value={data.location}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label={t("personalPage.email")}
              name="email"
              value={data.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label={t("personalPage.phone")}
              name="phone"
              value={data.phone}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label={t("personalPage.linkedin")}
              name="linkedin"
              value={data.linkedin}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label={t("personalPage.summary")}
              name="summary"
              value={data.summary}
              onChange={handleChange}
              multiline
              rows={5}
              fullWidth
              placeholder={t("personalPage.summaryPlaceholder")}
              helperText={t("personalPage.summaryHelper")}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <PolishButton
                value={data.summary}
                onApply={(text) =>
                  data.updatePersonal({ summary: text })
                }
                mode="summary"
              />
            </Box>

            {supportsProfilePhoto ? (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {t("personalPage.profilePhoto")}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  flexWrap="wrap"
                  useFlexGap
                >
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<PhotoCameraIcon />}
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      borderRadius: 2,
                    }}
                  >
                    {t("personalPage.uploadPhoto")}

                    <input
                      ref={photoInputRef}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handlePhotoUpload}
                    />
                  </Button>

                  {data.photo_path ? (
                    <Button
                      variant="text"
                      startIcon={<TuneIcon fontSize="small" />}
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                      }}
                      onClick={openEditorForExistingPhoto}
                    >
                      {t("personalPage.editPhoto")}
                    </Button>
                  ) : null}

                  {data.photo_path ? (
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid #D4A030",
                        background: "background.paper",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={data.photo_path}
                        alt="profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ) : null}

                  {data.photo_path ? (
                    <Button
                      variant="text"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={clearPhoto}
                    >
                      {t("personalPage.remove")}
                    </Button>
                  ) : null}
                </Stack>
              </Box>
            ) : null}

            <Button
              variant="contained"
              sx={{
                background: "#D4A030",
                "&:hover": {
                  background: "#b88925",
                },
              }}
              onClick={() => navigate("/experience")}
            >
              {t("nav.next")}
            </Button>
          </Stack>
        </Paper>
      </Container>

      <PhotoEditorDialog
        open={editorOpen}
        imageSrc={editorSource}
        onClose={() => setEditorOpen(false)}
        onSave={handleEditorSave}
      />
    </Box>
  );
}

export default Personal;