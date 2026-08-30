import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ShareIcon from "@mui/icons-material/Share";
import PrintIcon from "@mui/icons-material/Print";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import { generatePDF } from "../pdf/pdfGenerator";
import { computeSafePageBreaks } from "../pdf/pagination";
import TemplateRenderer from "../templates/TemplateRenderer";
import { useLanguage } from "../i18n/LanguageContext";
import useResumeStore from "../store/resumeStore";
import AtsScoreCard from "../components/AtsScoreCard";

function Preview() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const resume = useResumeStore();

  const viewerRef = useRef(null);
  const paperRef = useRef(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [fitScale, setFitScale] = useState(1);
  const manualZoomRef = useRef(false);
  const [pageBreaks, setPageBreaks] = useState([]);

  const [pdfStatus, setPdfStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    let frame = null;

    const recompute = () => {
      const resumePage = viewer.querySelector(".resume-page");
      if (!resumePage) return;
      setPageBreaks(computeSafePageBreaks(resumePage));
    };

    // Recompute once content settles (fonts/images can shift layout
    // slightly after the first paint), then keep watching for size
    // changes as the person edits their resume.
    frame = requestAnimationFrame(recompute);

    const resumePage = viewer.querySelector(".resume-page");
    const observer = resumePage
      ? new ResizeObserver(() => {
          requestAnimationFrame(recompute);
        })
      : null;

    if (observer && resumePage) {
      observer.observe(resumePage);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (observer) observer.disconnect();
    };
  });

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = viewerRef.current?.clientWidth || window.innerWidth;
      const horizontalPadding = viewportWidth < 600 ? 16 : 48;
      const availableWidth = Math.max(0, viewportWidth - horizontalPadding);
      const A4_WIDTH_PX = 793.7008;
      const nextFitScale = Math.min(1, Math.max(0.35, availableWidth / A4_WIDTH_PX));

      setFitScale(nextFitScale);
      setScale((currentScale) => (manualZoomRef.current ? currentScale : nextFitScale));
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [fullscreen]);

  const handleFullscreen = async () => {
    const viewer = viewerRef.current;

    if (!viewer) return;

    try {
      if (!document.fullscreenElement) {
        await viewer.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(
        "Fullscreen error:",
        error
      );
    }
  };

  const clampScale = (value) =>
    Math.min(2, Math.max(0.35, Number(value.toFixed(2))));

  const handleZoomOut = () => {
    manualZoomRef.current = true;
    setScale((current) => clampScale(current - 0.1));
  };

  const handleZoomIn = () => {
    manualZoomRef.current = true;
    setScale((current) => clampScale(current + 0.1));
  };

  const handleFitToPage = () => {
    manualZoomRef.current = false;
    setScale(fitScale);
  };

  const handlePdfAction = async (mode = "save") => {
    if (pdfStatus.loading) return;

    const viewer = viewerRef.current;

    if (!viewer) {
      setPdfStatus({
        loading: false,
        error: "Couldn't find the preview on screen. Try again.",
        success: "",
      });
      return;
    }

    const resumePage = viewer.querySelector(".resume-page");

    if (!resumePage) {
      setPdfStatus({
        loading: false,
        error: "Couldn't find the resume content to export. Try again.",
        success: "",
      });
      return;
    }

    setPdfStatus({ loading: true, error: "", success: "" });

    try {
      // The Android native print backend uses this same live .resume-page
      // DOM as its source. Keep the filename metadata on the element so the
      // native layer and the browser fallback use the same document name.
      if (resumePage) {
        const safeBaseName = String(resume.full_name || "Resume")
          .trim()
          .replace(/[^a-z0-9._-]+/gi, "_")
          .replace(/^_+|_+$/g, "");
        resumePage.setAttribute(
          "data-pdf-filename",
          `${safeBaseName || "Resume"}.pdf`
        );
      }

      const result = await generatePDF(resumePage, { mode });

      if (result === "browser-save-cancelled") {
        setPdfStatus({ loading: false, error: "", success: "" });
        return;
      }

      if (result === "browser-share-cancelled") {
        setPdfStatus({ loading: false, error: "", success: "" });
        return;
      }

      const pageText = result?.pageCount > 1
        ? `${result.pageCount} pages`
        : "1 page";

      const successMessage =
        result?.deliveryMethod === "android-print"
          ? `Android PDF/print dialog opened (${pageText}).`
          : mode === "print"
            ? "Print dialog opened."
            : mode === "share"
              ? `PDF ready to share (${pageText}).`
              : `PDF saved (${pageText}).`;

      setPdfStatus({
        loading: false,
        error: "",
        success: successMessage,
      });
    } catch (error) {
      console.error("PDF action failed:", error);

      setPdfStatus({
        loading: false,
        error: (error && error.message) || "PDF operation failed. Please try again.",
        success: "",
      });
    }
  };

  const scaledWidth = 793.7008 * scale;
  const scaledHeight = 1122.5197 * scale;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#F7F5F0",
        boxSizing: "border-box",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Box
          ref={viewerRef}
          sx={{
            width: "100%",
            height: "100vh",
            minHeight: "100vh",

            background: "#e5e7eb",

            display: "flex",
            flexDirection: "column",

            overflow: "hidden",

            boxSizing: "border-box",

            "&:fullscreen": {
              width: "100vw",
              height: "100vh",
              minHeight: "100vh",

              margin: 0,
              padding: 0,

              background: "#e5e7eb",

              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              flexShrink: 0,

              background: "#F7F5F0",

              borderBottom:
                "1px solid rgba(0,0,0,0.08)",

              px: {
                xs: 1,
                sm: 2,
                md: 3,
              },

              py: fullscreen ? 0.75 : 1.5,

              boxSizing: "border-box",

              zIndex: 100,
              position: fullscreen ? "sticky" : "relative",
              top: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "1200px",
                mx: "auto",
              }}
            >
              <Stack
                direction={fullscreen ? "row" : { xs: "column", sm: "row" }}
                spacing={fullscreen ? 0.75 : 2}
                flexWrap={fullscreen ? "wrap" : "nowrap"}
                justifyContent="space-between"
                alignItems={fullscreen ? "center" : { xs: "stretch", sm: "center" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon fontSize="small" />}
                  onClick={() => navigate(-1)}
                  aria-label={t("nav.back")}
                  title={t("nav.back")}
                  sx={{
                    ...(fullscreen
                      ? {
                          minWidth: 42,
                          width: 42,
                          height: 42,
                          p: 0,
                          borderRadius: 1.75,
                          "& .MuiButton-startIcon": { m: 0 },
                        }
                      : {
                          minHeight: 44,
                          fontWeight: 600,
                          borderRadius: 2,
                        }),
                    borderColor: "#1A2A3A",
                    color: "#1A2A3A",
                    "&:hover": {
                      borderColor: "#1A2A3A",
                      background: "rgba(26,42,58,0.05)",
                    },
                  }}
                >
                  {!fullscreen && t("nav.back")}
                </Button>

                <Box
                  sx={{
                    alignItems: "center",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 999,
                    background:
                      pageBreaks.length > 0
                        ? "#FDECEC"
                        : "#EEF0FF",
                    color:
                      pageBreaks.length > 0
                        ? "#E5484D"
                        : "#4338CA",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    alignSelf: {
                      xs: "flex-start",
                      sm: "center",
                    },
                    display: fullscreen ? "none" : "flex",
                  }}
                >
                  {pageBreaks.length + 1} page
                  {pageBreaks.length > 0 ? "s" : ""}
                </Box>

                <Stack
                  direction={fullscreen ? "row" : { xs: "column", sm: "row" }}
                  spacing={fullscreen ? 0.75 : 1}
                  flexWrap={fullscreen ? "wrap" : "nowrap"}
                  sx={{
                    width: fullscreen ? "auto" : { xs: "100%", sm: "auto" },
                    justifyContent: fullscreen
                      ? "flex-end"
                      : { xs: "stretch", sm: "flex-end" },
                    ml: fullscreen ? "auto" : 0,
                  }}
                >
                  {fullscreen ? (
                    <>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mr: 0.25 }}>
                        <Button
                          variant="outlined"
                          onClick={handleZoomOut}
                          disabled={scale <= 0.35}
                          aria-label="Zoom out"
                          title="Zoom out"
                          sx={{ minWidth: 42, width: 42, height: 42, p: 0, borderRadius: 1.75, borderColor: "rgba(26,42,58,0.25)", color: "#1A2A3A" }}
                        >
                          <ZoomOutIcon fontSize="small" />
                        </Button>
                        <Button
                          variant="text"
                          onClick={handleFitToPage}
                          aria-label={`Zoom ${Math.round(scale * 100)} percent. Reset to fit`}
                          title="Fit to page"
                          sx={{ minWidth: 66, height: 42, px: 1, borderRadius: 1.75, color: "#1A2A3A", fontWeight: 700, fontSize: "0.78rem" }}
                        >
                          {Math.round(scale * 100)}%
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleZoomIn}
                          disabled={scale >= 2}
                          aria-label="Zoom in"
                          title="Zoom in"
                          sx={{ minWidth: 42, width: 42, height: 42, p: 0, borderRadius: 1.75, borderColor: "rgba(26,42,58,0.25)", color: "#1A2A3A" }}
                        >
                          <ZoomInIcon fontSize="small" />
                        </Button>
                        {Math.abs(scale - fitScale) > 0.01 && (
                          <Button
                            variant="text"
                            onClick={handleFitToPage}
                            aria-label="Reset zoom to fit"
                            title="Reset zoom"
                            sx={{ minWidth: 42, width: 42, height: 42, p: 0, borderRadius: 1.75, color: "#1A2A3A" }}
                          >
                            <RestartAltIcon fontSize="small" />
                          </Button>
                        )}
                      </Stack>

                      <Button
                        variant="contained"
                        onClick={() => handlePdfAction("save")}
                        disabled={pdfStatus.loading}
                        aria-label={pdfStatus.loading ? "Generating PDF" : "Save PDF"}
                        title={pdfStatus.loading ? "Generating PDF" : "Save PDF"}
                        sx={{
                          minWidth: 42,
                          width: 42,
                          height: 42,
                          p: 0,
                          borderRadius: 1.75,
                          background: "#D4A030",
                          color: "#fff",
                          "&:hover": { background: "#b88925" },
                        }}
                      >
                        {pdfStatus.loading ? (
                          <CircularProgress size={16} sx={{ color: "#fff" }} />
                        ) : (
                          <PictureAsPdfIcon fontSize="small" />
                        )}
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => handlePdfAction("share")}
                        disabled={pdfStatus.loading}
                        aria-label="Share PDF"
                        title="Share PDF"
                        sx={{
                          minWidth: 42,
                          width: 42,
                          height: 42,
                          p: 0,
                          borderRadius: 1.75,
                          borderColor: "rgba(26,42,58,0.25)",
                          color: "#1A2A3A",
                        }}
                      >
                        <ShareIcon fontSize="small" />
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => handlePdfAction("print")}
                        disabled={pdfStatus.loading}
                        aria-label="Print PDF"
                        title="Print PDF"
                        sx={{
                          minWidth: 42,
                          width: 42,
                          height: 42,
                          p: 0,
                          borderRadius: 1.75,
                          borderColor: "rgba(26,42,58,0.25)",
                          color: "#1A2A3A",
                        }}
                      >
                        <PrintIcon fontSize="small" />
                      </Button>

                      <Button
                        variant="contained"
                        onClick={handleFullscreen}
                        aria-label="Exit fullscreen"
                        title="Exit fullscreen"
                        sx={{
                          minWidth: 42,
                          width: 42,
                          height: 42,
                          p: 0,
                          borderRadius: 1.75,
                          background: "#1A2A3A",
                          color: "#fff",
                          "&:hover": { background: "#263b52" },
                        }}
                      >
                        <FullscreenExitIcon fontSize="small" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center" sx={{ width: "100%", mb: 0.25 }}>
                        <Button
                          variant="outlined"
                          onClick={handleZoomOut}
                          disabled={scale <= 0.35}
                          aria-label="Zoom out"
                          title="Zoom out"
                          sx={{ minWidth: 44, width: 44, height: 40, p: 0, borderRadius: 1.75, borderColor: "rgba(26,42,58,0.25)", color: "#1A2A3A" }}
                        >
                          <ZoomOutIcon fontSize="small" />
                        </Button>
                        <Button
                          variant="text"
                          onClick={handleFitToPage}
                          aria-label={`Zoom ${Math.round(scale * 100)} percent. Reset to fit`}
                          title="Fit to page"
                          sx={{ minWidth: 68, height: 40, px: 1, borderRadius: 1.75, color: "#1A2A3A", fontWeight: 700, fontSize: "0.78rem" }}
                        >
                          {Math.round(scale * 100)}%
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleZoomIn}
                          disabled={scale >= 2}
                          aria-label="Zoom in"
                          title="Zoom in"
                          sx={{ minWidth: 44, width: 44, height: 40, p: 0, borderRadius: 1.75, borderColor: "rgba(26,42,58,0.25)", color: "#1A2A3A" }}
                        >
                          <ZoomInIcon fontSize="small" />
                        </Button>
                        {Math.abs(scale - fitScale) > 0.01 && (
                          <Button
                            variant="text"
                            onClick={handleFitToPage}
                            aria-label="Reset zoom to fit"
                            title="Reset zoom"
                            sx={{ minWidth: 44, width: 44, height: 40, p: 0, borderRadius: 1.75, color: "#1A2A3A" }}
                          >
                            <RestartAltIcon fontSize="small" />
                          </Button>
                        )}
                      </Stack>

                      <Button
                        fullWidth={true}
                        variant="contained"
                        startIcon={
                          pdfStatus.loading ? (
                            <CircularProgress size={16} sx={{ color: "#fff" }} />
                          ) : (
                            <PictureAsPdfIcon />
                          )
                        }
                        onClick={() => handlePdfAction("save")}
                        disabled={pdfStatus.loading}
                        sx={{
                          background: "#D4A030",
                          color: "#fff",
                          borderRadius: 2,
                          minHeight: 44,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          "&:hover": { background: "#b88925" },
                          "&.Mui-disabled": {
                            background: "#D4A030",
                            color: "#fff",
                            opacity: 0.7,
                          },
                        }}
                      >
                        {pdfStatus.loading ? "Generating…" : "Save PDF"}
                      </Button>

                      <Button
                        fullWidth={true}
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        onClick={() => handlePdfAction("share")}
                        disabled={pdfStatus.loading}
                        sx={{
                          borderColor: "#1A2A3A",
                          color: "#1A2A3A",
                          borderRadius: 2,
                          minHeight: 44,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          "&:hover": {
                            borderColor: "#1A2A3A",
                            background: "rgba(26,42,58,0.05)",
                          },
                        }}
                      >
                        Share PDF
                      </Button>

                      <Button
                        fullWidth={true}
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        onClick={() => handlePdfAction("print")}
                        disabled={pdfStatus.loading}
                        sx={{
                          borderColor: "#1A2A3A",
                          color: "#1A2A3A",
                          borderRadius: 2,
                          minHeight: 44,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          "&:hover": {
                            borderColor: "#1A2A3A",
                            background: "rgba(26,42,58,0.05)",
                          },
                        }}
                      >
                        Print
                      </Button>

                      <Button
                        fullWidth={true}
                        variant="contained"
                        startIcon={<FullscreenIcon />}
                        onClick={handleFullscreen}
                        sx={{
                          background: "#1A2A3A",
                          color: "#fff",
                          borderRadius: 2,
                          minHeight: 44,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          "&:hover": { background: "#263b52" },
                        }}
                      >
                        Fullscreen
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Box>

          {!fullscreen && (
            <Typography
              sx={{
                flexShrink: 0,
                textAlign: "center",
                color: "#1A2A3A",
                fontWeight: 700,
                fontSize: {
                  xs: "22px",
                  sm: "28px",
                },
                py: 2,
                px: 1,
              }}
            >
              Resume Preview
            </Typography>
          )}

          <Box
            sx={{
              width: "100%",
              flex: 1,
              minHeight: 0,

              display: "flex",

              justifyContent: "center",
              alignItems: "flex-start",

              overflow: "auto",

              boxSizing: "border-box",

              px: {
                xs: 1,
                sm: 2,
                md: 3,
              },

              py: {
                xs: 2,
                sm: 3,
              },

              WebkitOverflowScrolling:
                "touch",

              "& .resume-page": {
                flexShrink: 0,
              },
            }}
          >
            <Box
              sx={{
                width: `${scaledWidth}px`,
                height: `${scaledHeight}px`,

                flexShrink: 0,

                position: "relative",

                transition:
                  "width 0.15s ease, height 0.15s ease",
              }}
            >
              <Paper
                ref={paperRef}
                elevation={5}
                sx={{
                  width: "210mm",

                  minWidth: "210mm",
                  minHeight: "297mm",

                  maxWidth: "210mm",
                  // No fixed/max height and no "overflow: hidden" here on
                  // purpose: when the resume content is taller than one
                  // A4 page, this box (and .resume-page below) must be
                  // allowed to grow so the extra content stays visible
                  // (scrollable) in the preview and is actually captured
                  // by html2canvas, letting pdfGenerator.js paginate it
                  // onto additional PDF pages instead of silently
                  // clipping sections such as Certifications.

                  position: "absolute",
                  top: 0,
                  left: 0,

                  transform:
                    `scale(${scale})`,

                  transformOrigin:
                    "top left",

                  background: "#ffffff",

                  overflow: "visible",

                  boxSizing: "border-box",

                  margin: 0,
                  padding: 0,

                  "& .resume-page": {
                    width:
                      "210mm !important",

                    minWidth:
                      "210mm !important",

                    minHeight:
                      "297mm !important",

                    maxWidth:
                      "210mm !important",

                    boxSizing:
                      "border-box",

                    flexShrink: 0,

                    transform:
                      "none !important",

                    transformOrigin:
                      "top left",
                  },
                }}
              >
                <TemplateRenderer />

                {pageBreaks.map((breakY, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: `${breakY}px`,
                      zIndex: 5,
                      pointerEvents: "none",
                    }}
                  >
                    <Box
                      sx={{
                        borderTop: "2px dashed #E5484D",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 8,
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#E5484D",
                          background: "rgba(255,255,255,0.9)",
                          px: "6px",
                          py: "1px",
                          borderRadius: "4px",
                        }}
                      >
                        Page {i + 2} starts here
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container
        maxWidth="sm"
        sx={{ py: 4 }}
      >
        <AtsScoreCard resume={resume} />
      </Container>

      <Snackbar
        open={Boolean(pdfStatus.success)}
        autoHideDuration={4000}
        onClose={() =>
          setPdfStatus((prev) => ({ ...prev, success: "" }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() =>
            setPdfStatus((prev) => ({
              ...prev,
              success: "",
            }))
          }
        >
          {pdfStatus.success}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(pdfStatus.error)}
        autoHideDuration={6000}
        onClose={() =>
          setPdfStatus((prev) => ({ ...prev, error: "" }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() =>
            setPdfStatus((prev) => ({ ...prev, error: "" }))
          }
        >
          {pdfStatus.error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Preview;