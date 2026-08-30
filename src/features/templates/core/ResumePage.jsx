import { Box } from "@mui/material";

const A4_WIDTH = "210mm";
const A4_HEIGHT = "297mm";

function ResumePage({
  children,
  sx = {},
  ...props
}) {
  return (
    <Box
      component="div"
      className="resume-page"
      // Templates have a fixed, designed layout (sidebar side, column
      // order, etc.) that must stay the same regardless of the app's
      // UI language. Without this, selecting Arabic/Persian sets
      // dir="rtl" on <html> (for the UI), which cascades down and
      // makes the browser auto-mirror every flexDirection: "row" in
      // here - swapping which side the sidebar/columns render on.
      // Pinning this root to ltr isolates the template's own layout
      // from the app chrome's direction.
      dir="ltr"
      {...props}
      sx={{
        width: A4_WIDTH,

        minWidth: A4_WIDTH,
        minHeight: A4_HEIGHT,

        maxWidth: A4_WIDTH,
        // No maxHeight here on purpose: a resume with more content than
        // one A4 page must be allowed to grow taller than 297mm so that
        // pdfGenerator.js can slice it into multiple PDF pages. Capping
        // the height (and hiding overflow) silently clips sections like
        // Certifications instead of pushing them onto a second page.

        boxSizing: "border-box",

        position: "relative",

        margin: 0,

        padding: 0,

        backgroundColor: "#ffffff",

        display: "flex",
        flexDirection: "column",

        wordBreak: "normal",
        overflowWrap: "break-word",

        fontFamily:
          "Arial, Helvetica, sans-serif",

        fontSize: "12.5px",
        lineHeight: 1.35,

        color: "#1a1a1a",

        // Visible (not "hidden"): content taller than one A4 page must
        // stay in the document flow so it can be captured by html2canvas
        // and paginated by pdfGenerator.js instead of being clipped.
        overflow: "visible",

        transform: "none",
        transformOrigin:
          "top left",

        "& *": {
          boxSizing: "border-box",
        },

        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default ResumePage;