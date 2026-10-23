import {
  Box,
  Card,
  CardActions,
  Chip,
  Container,
  Stack,
  Typography,
  Button,
  Dialog,
  IconButton,
  Tooltip,
} from "@mui/material";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";
import useResumeStore from "../store/resumeStore";

import ChronologicalPreview from "../template/previews/ChronologicalPreview";
import CombinationPreview from "../template/previews/CombinationPreview";
import FunctionalPreview from "../template/previews/FunctionalPreview";
import TwoColumnPreview from "../template/previews/TwoColumnPreview";
import MinimalPreview from "../template/previews/MinimalPreview";
import CreativePhotoPreview from "../template/previews/CreativePhotoPreview";

import { useEffect, useRef, useState } from "react";

import { useLanguage } from "../i18n/LanguageContext";
import PinchZoomSurface from "../components/common/PinchZoomSurface";

const A4_WIDTH = "210mm";
const A4_HEIGHT = "297mm";
const A4_WIDTH_PX = 793.7008;
const A4_HEIGHT_PX = 1122.5197;

const templates = [
  {
    id: "chronological",
    name: "Canadian Standard",
    description:
      "ATS-friendly reverse chronological design built for North American job applications.",
    ats: "100%",
    atsLabel: "ATS-Friendly",
    bestFor: "North American Job Market",
    keyFeatures: [
      "Single Column",
      "No Photo",
      "Maximum Scanner Readability",
      "Reverse Chronological",
    ],
    Preview: ChronologicalPreview,
  },

  {
    id: "combination",
    name: "Combination Hybrid",
    description:
      "A balanced layout that highlights both strengths and professional experience.",
    ats: "85%",
    atsLabel: "High Compatibility",
    bestFor: "Career Changers & Tech Professionals",
    keyFeatures: [
      "Hybrid Layout",
      "Skill-first",
      "Experience Focus",
      "Modern Structure",
    ],
    Preview: CombinationPreview,
  },

  {
    id: "functional",
    name: "Functional Skills Based",
    description:
      "A skills-centered format ideal for career transitions and non-linear experience.",
    ats: "90%",
    atsLabel: "Strong ATS",
    bestFor: "Career Changes & Consulting",
    keyFeatures: [
      "Skill Highlights",
      "Flexible Sections",
      "Minimal Clutter",
      "Direct Messaging",
    ],
    Preview: FunctionalPreview,
  },

  {
    id: "two_column",
    name: "Modern Two Column",
    description:
      "A contemporary and polished layout suited to modern direct applications.",
    ats: "78%",
    atsLabel: "Modern Layout",
    bestFor: "Creative & Direct Applications",
    keyFeatures: [
      "Two Columns",
      "Photo Friendly",
      "Executive Feel",
      "Visual Hierarchy",
    ],
    Preview: TwoColumnPreview,
  },

  {
    id: "minimal",
    name: "Minimal ATS",
    description:
      "Clean, structured and highly readable for corporate, engineering and finance roles.",
    ats: "95%",
    atsLabel: "Excellent ATS",
    bestFor: "Corporate, Engineering & Finance",
    keyFeatures: [
      "Minimal Design",
      "Plain Text Focus",
      "High Readability",
      "No Visual Noise",
    ],
    Preview: MinimalPreview,
  },

  {
    id: "creative_photo",
    name: "Creative European",
    description:
      "A refined European-style template with a natural portrait section and polished visual flow.",
    ats: "72%",
    atsLabel: "Creative Style",
    bestFor: "European & Creative Roles",
    keyFeatures: [
      "Photo Portrait",
      "European Styling",
      "Bold Branding",
      "Modern Editorial Feel",
    ],
    Preview: CreativePhotoPreview,
  },
];

function TemplateFullscreenDialog({
  template,
  onClose,
  onSelect,
}) {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener(
      "fullscreenchange",
      handleChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleChange
      );
    };
  }, []);

  useEffect(() => {
    // Leave the browser's native fullscreen mode behind when the
    // dialog closes, so it doesn't linger after the template changes.
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const toggleFullscreen = async () => {
    const node = containerRef.current;
    if (!node) return;

    try {
      if (!document.fullscreenElement) {
        await node.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  if (!template) return null;

  return (
    <Dialog
      open={Boolean(template)}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, overflow: "hidden" },
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: isFullscreen ? "100vh" : "85vh",
          bgcolor: "#eef1f4",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 1.5,
            bgcolor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography sx={{ fontWeight: 700, color: "#1A2A3A" }}>
            {t(
              `templates.${template.id}.name`,
              template.name
            )}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Tooltip
              title={
                isFullscreen
                  ? t("templatesPage.exitFullscreen")
                  : t("templatesPage.viewFullscreen")
              }
            >
              <IconButton
                onClick={toggleFullscreen}
                size="small"
                aria-label={
                  isFullscreen
                    ? t("templatesPage.exitFullscreen")
                    : t("templatesPage.viewFullscreen")
                }
                sx={(theme) => ({
                  color: theme.palette.text.primary,
                  bgcolor: theme.palette.action.hover,
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[50],
                    color: theme.palette.primary.main,
                  },
                })}
              >
                {isFullscreen ? (
                  <FullscreenExitIcon />
                ) : (
                  <FullscreenIcon />
                )}
              </IconButton>
            </Tooltip>

            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0 }}>
          <TemplateA4Preview Preview={template.Preview} />
        </Box>

        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "#ffffff",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => onSelect(template)}
            sx={{
              bgcolor: "#D4A030",
              minHeight: 48,
              borderRadius: 2,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#B88720" },
            }}
          >
            {t("templatesPage.useTemplate")}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

function TemplateA4Preview({ Preview }) {
  const wrapperRef = useRef(null);
  // Start small (not 1 = full A4 width) so the thumbnail can never
  // overflow the phone viewport during the brief window before the
  // real measurement below replaces it with an accurate value.
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    let cancelled = false;

    const calculateScale = () => {
      const wrapper = wrapperRef.current;

      if (!wrapper || cancelled) return;

      const width = wrapper.clientWidth;
      const height = wrapper.clientHeight;

      if (!width || !height) {
        // The wrapper hasn't been laid out yet (common right after
        // mount on mobile, before fonts/layout settle) - try again on
        // the next frame instead of giving up and leaving the preview
        // stuck at its un-scaled, page-overflowing default size.
        requestAnimationFrame(calculateScale);
        return;
      }

      const padding = 16;

      const availableWidth = Math.max(
        width - padding * 2,
        1
      );

      const availableHeight = Math.max(
        height - padding * 2,
        1
      );

      const widthScale =
        availableWidth / A4_WIDTH_PX;

      const heightScale =
        availableHeight / A4_HEIGHT_PX;

      const nextScale = Math.min(
        widthScale,
        heightScale,
        1
      );

      setScale(Math.max(nextScale, 0.1));
    };

    calculateScale();

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(calculateScale);
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    window.addEventListener(
      "resize",
      calculateScale
    );

    return () => {
      cancelled = true;

      observer.disconnect();

      window.removeEventListener(
        "resize",
        calculateScale
      );
    };
  }, []);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        width: "100%",
        height: "100%",

        minWidth: 0,
        minHeight: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        overflow: "hidden",

        position: "relative",

        boxSizing: "border-box",

        background: "#eef1f4",
      }}
    >
      <PinchZoomSurface
        baseScale={scale}
        minScale={scale}
        maxScale={Math.min(2.5, scale * 2.5)}
        style={{ width: "100%", height: "100%" }}
      >
      <Box
        sx={{
          width: A4_WIDTH,
          height: A4_HEIGHT,

          flex: "0 0 auto",

          position: "relative",

          background: "#ffffff",

          boxSizing: "border-box",

          transform: `scale(${scale})`,

          transformOrigin:
            "center center",

          boxShadow:
            "0 4px 18px rgba(0,0,0,0.16)",

          border:
            "1px solid #d9dee5",

          overflow: "hidden",

          "& > *": {
            width: "100%",
            height: "100%",
            minWidth: 0,
            minHeight: 0,
            maxWidth: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          },

          "& .resume-page": {
            width:
              `${A4_WIDTH} !important`,

            minWidth:
              `${A4_WIDTH} !important`,

            maxWidth:
              `${A4_WIDTH} !important`,

            height:
              `${A4_HEIGHT} !important`,

            minHeight:
              `${A4_HEIGHT} !important`,

            maxHeight:
              `${A4_HEIGHT} !important`,

            boxSizing:
              "border-box !important",

            margin:
              "0 !important",

            transform:
              "none !important",

            overflow:
              "hidden !important",
          },
        }}
      >
        <Preview />
      </Box>
      </PinchZoomSurface>
    </Box>
  );
}

function Templates() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [fullscreenTemplate, setFullscreenTemplate] =
    useState(null);

  const setTemplate = useResumeStore(
    (state) => state.setTemplate
  );

  const handleSelect = (template) => {
    setTemplate(template.id);
    navigate("/personal");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",

        bgcolor: "#F7F5F0",

        py: 4,

        px: {
          xs: 1,
          sm: 2,
          md: 3,
        },

        boxSizing: "border-box",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",

            color: "#1A2A3A",

            fontWeight: 700,

            mb: 4,
          }}
        >
          {t("templatesPage.heading")}
        </Typography>

        <Box
          sx={{
            display: "flex",

            flexDirection: "column",

            gap: 4,

            width: "100%",
          }}
        >
          {templates.map((template) => {
            const Preview =
              template.Preview;

            return (
              <Card
                key={template.id}
                sx={{
                  width: "100%",

                  borderRadius: 4,

                  bgcolor:
                    "rgba(255,255,255,0.97)",

                  boxShadow:
                    "0 14px 36px rgba(0,0,0,0.08)",

                  overflow: "hidden",

                  display: "flex",

                  flexDirection: "column",

                  border:
                    "1px solid #e5e7eb",
                }}
              >
                {/* =========================
                    A4 PREVIEW
                   ========================= */}

                <Box
                  sx={{
                    width: "100%",

                    height: {
                      xs: 500,
                      sm: 620,
                      md: 720,
                    },

                    minHeight: {
                      xs: 500,
                      sm: 620,
                      md: 720,
                    },

                    bgcolor: "#eef1f4",

                    p: 1.5,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    overflow: "hidden",

                    boxSizing: "border-box",

                    position: "relative",

                    borderBottom:
                      "1px solid #eef2f7",
                  }}
                >
                  <Tooltip title={t("templatesPage.viewFullscreen")}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenTemplate(template);
                      }}
                      size="small"
                      sx={(theme) => ({
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 2,
                        width: 38,
                        height: 38,
                        color: theme.palette.text.primary,
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.shadows[2],
                        backdropFilter: "blur(8px)",
                        transition: "background-color 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease",
                        "&:hover": {
                          bgcolor: theme.palette.mode === "dark"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[50],
                          color: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main,
                          boxShadow: theme.shadows[3],
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                        },
                      })}
                    >
                      <FullscreenIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <TemplateA4Preview
                    Preview={Preview}
                  />
                </Box>

                {/* =========================
                    TEMPLATE INFORMATION
                   ========================= */}

                <Box
                  sx={{
                    p: 2.5,

                    display: "flex",

                    flexDirection: "column",

                    flex: 1,

                    gap: 1.5,

                    bgcolor: "#f8fafc",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#1A2A3A",

                      fontWeight: 700,
                    }}
                  >
                    {t(
                      `templates.${template.id}.name`,
                      template.name
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#5E6B75",

                      lineHeight: 1.6,

                      fontSize: 14,
                    }}
                  >
                    {t(
                      `templates.${template.id}.description`,
                      template.description
                    )}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      label={`ATS Score: ${template.ats}`}
                      size="small"
                      sx={{
                        bgcolor: "#e8f5e9",

                        color: "#1b5e20",

                        fontWeight: 700,
                      }}
                    />

                    <Chip
                      label={template.atsLabel}
                      size="small"
                      sx={{
                        bgcolor: "#e3f2fd",

                        color: "#0d47a1",

                        fontWeight: 700,
                      }}
                    />
                  </Stack>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",

                        fontWeight: 700,

                        color: "#64748b",

                        mb: 0.5,
                      }}
                    >
                      {t("templatesPage.bestForLabel")}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#1f2937",

                        fontWeight: 600,

                        fontSize: 14,
                      }}
                    >
                      {t(
                        `templates.${template.id}.bestFor`,
                        template.bestFor
                      )}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",

                        fontWeight: 700,

                        color: "#64748b",

                        mb: 0.7,
                      }}
                    >
                      Key Features
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      sx={{
                        flexWrap: "wrap",
                      }}
                    >
                      {template.keyFeatures.map(
                        (feature) => (
                          <Chip
                            key={feature}
                            label={feature}
                            size="small"
                            sx={{
                              bgcolor: "#ffffff",

                              color: "#334155",

                              border:
                                "1px solid #dbe4ee",

                              fontWeight: 600,
                            }}
                          />
                        )
                      )}
                    </Stack>
                  </Box>
                </Box>

                {/* =========================
                    SELECT BUTTON
                   ========================= */}

                <CardActions
                  sx={{
                    px: 2.5,

                    pb: 2.5,

                    pt: 1,
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      handleSelect(template)
                    }
                    sx={{
                      bgcolor: "#D4A030",

                      minHeight: 48,

                      borderRadius: 2,

                      fontWeight: 700,

                      textTransform: "none",

                      "&:hover": {
                        bgcolor: "#B88720",
                      },
                    }}
                  >
                    {t("templatesPage.useTemplate")}
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Container>

      <TemplateFullscreenDialog
        template={fullscreenTemplate}
        onClose={() => setFullscreenTemplate(null)}
        onSelect={handleSelect}
      />
    </Box>
  );
}

export default Templates;