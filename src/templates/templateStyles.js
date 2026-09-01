

// =============================================================
// Resume Template Styles
// Based directly on the Python / ReportLab resume generator
// =============================================================

const resumeTheme = {
  // ===========================================================
  // COLORS
  // ===========================================================
  colors: {
    text: "#1a1a1a",
    muted: "#555555",
    heading: "#1a1a1a",

    // Default brand accent
    accent: "#2c3e50",

    white: "#ffffff",

    border: "#d1d5db",

    lightBackground: "#f8fafc",

    dark: "#1e293b",

    grey: "#555555",

    // Python template accents
    chronological: "#2c3e50",
    combination: "#0f766e",
    functional: "#6d28d9",
    twoColumn: "#1e293b",
    minimal: "#3a3a3a",
    creative: "#9d174d",
  },

  // ===========================================================
  // FONTS
  // Python uses Helvetica for ATS templates
  // ===========================================================
  fonts: {
    primary: "Arial, Helvetica, sans-serif",
    secondary: "Arial, Helvetica, sans-serif",
    ats: "Arial, Helvetica, sans-serif",

    regular: "Arial, Helvetica, sans-serif",
    bold: "Arial, Helvetica, sans-serif",
    italic: "Arial, Helvetica, sans-serif",
  },

  // ===========================================================
  // A4 PAGE
  // ===========================================================
  page: {
    width: "210mm",

    minWidth: "210mm",
    minHeight: "297mm",

    maxWidth: "210mm",
    // No fixed "height" and no "maxHeight" here on purpose: templates
    // that spread ...resumeTheme.page must be free to grow taller than
    // one A4 page when content is long. A fixed/max height here would
    // cap the element's own box at 297mm while its content visually
    // overflowed past it - which both looks clipped on screen and (more
    // importantly) breaks pdfGenerator.js's page-count measurement,
    // since that reads the container's own box height to decide how
    // many PDF pages to generate.

    boxSizing: "border-box",

    background: "#ffffff",

    // Must stay visible: a resume taller than one A4 page has to remain
    // in the document flow so pdfGenerator.js can paginate it onto a
    // second page instead of the extra content being clipped away.
    overflow: "visible",

    position: "relative",
  },

  // ===========================================================
  // MARGINS
  //
  // Reduced from the original 25.4mm (1 inch) / 17.78mm (0.7 inch)
  // ReportLab values, which ate too much of the printable A4 area
  // and pushed content to a second page prematurely. These match
  // common professional resume margin guidance (~0.55"-0.6") while
  // still leaving a comfortable, print-safe border.
  //
  // Standard templates (single column): 15mm ≈ 0.59 inch
  // Two-column / Graphic (has its own inner column padding too): 12mm
  // ===========================================================
  margins: {
    standard: "15mm",
    compact: "12mm",
  },

  // ===========================================================
  // SPACING
  // ===========================================================
  spacing: {
    pageX: "15mm",
    pageY: "15mm",

    compactPageX: "12mm",
    compactPageY: "12mm",

    section: "12px",
    sectionAfter: "4px",

    item: "6px",

    small: "3px",
    medium: "6px",
    large: "12px",

    header: "12px",
  },

  // ===========================================================
  // TYPOGRAPHY
  //
  // Exact values based on build_styles() in Python
  // ===========================================================
  typography: {
    // ---------------------------------------------------------
    // NameHeader
    // ---------------------------------------------------------
    name: {
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "22px",
      fontWeight: 700,
      lineHeight: "24px",
      color: "#1a1a1a",

      textAlign: "center",

      margin: 0,
      padding: 0,
    },

    // ---------------------------------------------------------
    // TargetTitle
    // ---------------------------------------------------------
    title: {
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.45,

      color: "#2c3e50",

      textAlign: "center",

      margin: 0,
      padding: 0,
    },

    // ---------------------------------------------------------
    // ContactLine
    // ---------------------------------------------------------
    contact: {
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "13.5px",
      fontWeight: 400,
      lineHeight: 1.42,

      color: "#555555",

      textAlign: "center",

      margin: 0,
      padding: 0,

      overflowWrap: "break-word",
      wordBreak: "normal",
    },

    // ---------------------------------------------------------
    // SectionHeader
    // ---------------------------------------------------------
    sectionTitle: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "13.5px",
      fontWeight: 700,

      lineHeight: 1.45,

      color: "#2c3e50",

      textAlign: "left",

      textTransform: "uppercase",

      margin: 0,
      padding: 0,

      // Don't let a section heading print alone at the bottom of a
      // page with its content pushed to the next one.
      "@media print": {
        breakAfter: "avoid",
        pageBreakAfter: "avoid",
      },
    },

    // ---------------------------------------------------------
    // JobTitle
    // ---------------------------------------------------------
    jobTitle: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "13.5px",
      fontWeight: 700,

      lineHeight: 1.42,

      color: "#1a1a1a",

      margin: 0,
      padding: 0,
    },

    // ---------------------------------------------------------
    // JobMeta
    // ---------------------------------------------------------
    meta: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "13.5px",
      fontWeight: 400,
      fontStyle: "italic",

      lineHeight: 1.40,

      color: "#555555",

      margin: 0,
      padding: 0,
    },

    // ---------------------------------------------------------
    // BodyText2
    // ---------------------------------------------------------
    body: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "14px",
      fontWeight: 400,

      lineHeight: 1.40,

      color: "#1a1a1a",

      margin: 0,
      padding: 0,

      overflowWrap: "break-word",
      wordBreak: "normal",
    },

    // ---------------------------------------------------------
    // ResumeBullet
    // ---------------------------------------------------------
    bullet: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "14px",
      fontWeight: 400,

      lineHeight: 1.40,

      color: "#1a1a1a",

      margin: 0,
      marginBottom: "6px",

      padding: 0,

      overflowWrap: "break-word",
      wordBreak: "normal",
    },

    // ---------------------------------------------------------
    // CondensedJob
    // ---------------------------------------------------------
    condensedJob: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "13.5px",
      fontWeight: 400,

      lineHeight: 1.42,

      color: "#1a1a1a",

      margin: 0,
      marginBottom: "7px",

      padding: 0,
    },

    // ---------------------------------------------------------
    // SkillsBoxText
    // ---------------------------------------------------------
    skillsBox: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "13.5px",
      fontWeight: 400,

      lineHeight: 1.42,

      color: "#1a1a1a",

      margin: 0,
      padding: 0,

      overflowWrap: "break-word",
      wordBreak: "normal",
    },

    // ---------------------------------------------------------
    // Sidebar
    // ---------------------------------------------------------
    sidebarHeader: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "13.5px",
      fontWeight: 700,

      lineHeight: 1.42,

      color: "#ffffff",

      textAlign: "left",

      margin: 0,
      padding: 0,
    },

    sidebarText: {
      fontFamily: "Arial, Helvetica, sans-serif",

      fontSize: "13.5px",
      fontWeight: 400,

      lineHeight: 1.40,

      color: "#e2e8f0",

      margin: 0,
      padding: 0,

      overflowWrap: "break-word",
      wordBreak: "normal",
    },
  },

  // ===========================================================
  // COMMON ELEMENTS
  // ===========================================================
  elements: {
    page: {
      boxSizing: "border-box",
      background: "#ffffff",
    },

    // ---------------------------------------------------------
    // Header
    // ---------------------------------------------------------
    header: {
      width: "100%",
      textAlign: "center",

      flexShrink: 0,

      margin: 0,
      padding: 0,
    },

    // ---------------------------------------------------------
    // Section
    // ---------------------------------------------------------
    section: {
      width: "100%",

      marginTop: "12px",
      marginBottom: "6px",

      flexShrink: 0,

      boxSizing: "border-box",
    },

    // ---------------------------------------------------------
    // Section divider
    // ---------------------------------------------------------
    sectionDivider: {
      width: "100%",

      height: "1px",

      backgroundColor: "#2c3e50",

      marginTop: 0,
      marginBottom: "6px",

      flexShrink: 0,
    },

    // ---------------------------------------------------------
    // Resume item
    // ---------------------------------------------------------
    item: {
      width: "100%",

      marginBottom: "6px",

      flexShrink: 0,

      boxSizing: "border-box",

      // Keeps one experience/education/etc. entry from being split
      // across a page break by the browser's real print pagination
      // (see pdfGenerator.js's printResume()). Ignored on screen.
      "@media print": {
        breakInside: "avoid",
        pageBreakInside: "avoid",
      },
    },

    // ---------------------------------------------------------
    // Bullet container
    // ---------------------------------------------------------
    bullet: {
      margin: 0,
      padding: 0,

      paddingLeft: "14px",

      width: "100%",

      boxSizing: "border-box",
    },

    // ---------------------------------------------------------
    // Skills box
    // ---------------------------------------------------------
    skillsBox: {
      width: "100%",

      boxSizing: "border-box",

      backgroundColor: "#f1f5f9",

      border: "1px solid #0f766e",

      borderRadius: 0,

      padding: "8px 10px",
    },

    // ---------------------------------------------------------
    // Combination banner
    // ---------------------------------------------------------
    combinationBanner: {
      width: "100%",

      backgroundColor: "#0f766e",

      boxSizing: "border-box",

      padding: "16px 12px",

      textAlign: "center",

      flexShrink: 0,
    },

    // ---------------------------------------------------------
    // Creative / Two Column sidebar
    // ---------------------------------------------------------
    sidebar: {
      boxSizing: "border-box",

      backgroundColor: "#1e293b",

      color: "#ffffff",
    },
  },

  // ===========================================================
  // TEMPLATE CONFIG
  // Direct equivalent of Python TEMPLATES
  // ===========================================================
  templates: {
    chronological: {
      accent: "#2c3e50",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "standard",
      divider: true,
      dividerThickness: "0.8px",
      banner: false,
      // Kept in sync with margins.standard above (this field itself is
      // not read anywhere in the app today, but is left accurate so it
      // doesn't mislead anyone who wires it up later).
      margin: "15mm",
    },

    combination: {
      accent: "#0f766e",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "combination",
      divider: true,
      dividerThickness: "1px",
      banner: true,
      margin: "15mm",
    },

    functional: {
      accent: "#6d28d9",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "functional",
      divider: true,
      dividerThickness: "1px",
      banner: false,
      margin: "15mm",
    },

    two_column: {
      accent: "#1e293b",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "two_column",
      divider: false,
      dividerThickness: "0px",
      banner: false,
      margin: "12mm",
    },

    minimal: {
      accent: "#3a3a3a",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "standard",
      divider: false,
      dividerThickness: "0px",
      banner: false,
      margin: "15mm",
    },

    creative_photo: {
      accent: "#9d174d",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "graphic",
      divider: false,
      dividerThickness: "0px",
      banner: false,
      margin: "12mm",
    },
  },
};

export { resumeTheme };
export default resumeTheme;

