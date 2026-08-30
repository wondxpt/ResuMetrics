
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
    height: "297mm",

    minWidth: "210mm",
    minHeight: "297mm",

    maxWidth: "210mm",
    maxHeight: "297mm",

    boxSizing: "border-box",

    background: "#ffffff",

    overflow: "hidden",

    position: "relative",
  },

  // ===========================================================
  // PYTHON / REPORTLAB MARGINS
  //
  // Standard templates:
  // 1 inch = 96px ≈ 25.4mm
  //
  // Two-column / Graphic:
  // 0.7 inch ≈ 17.78mm
  // ===========================================================
  margins: {
    standard: "25.4mm",
    compact: "17.78mm",
  },

  // ===========================================================
  // SPACING
  // ===========================================================
  spacing: {
    pageX: "25.4mm",
    pageY: "25.4mm",

    compactPageX: "17.78mm",
    compactPageY: "17.78mm",

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
      margin: "25.4mm",
    },

    combination: {
      accent: "#0f766e",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "combination",
      divider: true,
      dividerThickness: "1px",
      banner: true,
      margin: "25.4mm",
    },

    functional: {
      accent: "#6d28d9",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "functional",
      divider: true,
      dividerThickness: "1px",
      banner: false,
      margin: "25.4mm",
    },

    two_column: {
      accent: "#1e293b",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "two_column",
      divider: false,
      dividerThickness: "0px",
      banner: false,
      margin: "17.78mm",
    },

    minimal: {
      accent: "#3a3a3a",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "standard",
      divider: false,
      dividerThickness: "0px",
      banner: false,
      margin: "25.4mm",
    },

    creative_photo: {
      accent: "#9d174d",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "graphic",
      divider: false,
      dividerThickness: "0px",
      banner: false,
      margin: "17.78mm",
    },
  },
};

export { resumeTheme };
export default resumeTheme;

