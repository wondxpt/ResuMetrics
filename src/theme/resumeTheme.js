const resumeTheme = {
  // =====================================================
  // GLOBAL COLORS
  // =====================================================
  colors: {
    text: "#1a1a1a",
    muted: "#6b7280",
    heading: "#1A2A3A",
    accent: "#D4A030",
    white: "#ffffff",
    border: "#d1d5db",
    lightBackground: "#f8fafc",
    dark: "#1e293b",
    grey: "#555555",

    // Template-specific accents
    creative: "#9D174D",
    functional: "#6D28D9",
    combination: "#0F766E",
  },

  // =====================================================
  // FONTS
  // =====================================================
  fonts: {
    primary: "Arial, Helvetica, sans-serif",
    secondary: "Arial, Helvetica, sans-serif",
    ats: "Arial, Helvetica, sans-serif",
  },

  // =====================================================
  // A4 PAGE
  // =====================================================
  page: {
    width: "210mm",
    minWidth: "210mm",
    minHeight: "297mm",
    maxWidth: "210mm",
    // No fixed/max height on purpose: content longer than one A4 page
    // must be able to grow past 297mm instead of being clipped, so it
    // can flow onto a second PDF page.

    boxSizing: "border-box",
    position: "relative",
    background: "#ffffff",
    overflow: "visible",
    margin: 0,
    padding: 0,
  },

  // =====================================================
  // STANDARD PAGE PADDING
  // =====================================================
  spacing: {
    pageX: "42px",
    pageY: "42px",

    section: "18px",
    item: "12px",

    small: "4px",
    medium: "8px",
    large: "16px",

    header: "28px",

    // Layout helpers
    columnGap: "24px",
    contentGap: "12px",
    bulletGap: "3px",
  },

  // =====================================================
  // STANDARD TYPOGRAPHY
  // =====================================================
  typography: {
    name: {
      fontSize: "24px",
      fontWeight: 800,
      lineHeight: 1.15,
      color: "#111827",
    },

    title: {
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: 1.3,
      color: "#4b5563",
    },

    contact: {
      fontSize: "13px",
      lineHeight: 1.45,
      color: "#6b7280",
    },

    body: {
      fontSize: "14px",
      lineHeight: 1.5,
      color: "#374151",
    },

    meta: {
      fontSize: "13px",
      lineHeight: 1.4,
      color: "#6b7280",
    },

    sectionTitle: {
      fontSize: "12px",
      fontWeight: 800,
      lineHeight: 1.25,
      letterSpacing: "0.08em",
      color: "#1A2A3A",
    },

    jobTitle: {
      fontSize: "13.5px",
      fontWeight: 700,
      lineHeight: 1.3,
      color: "#111827",
    },

    bullet: {
      fontSize: "14px",
      lineHeight: 1.45,
      color: "#374151",
    },

    education: {
      fontSize: "13px",
      lineHeight: 1.45,
      color: "#374151",
    },

    language: {
      fontSize: "13px",
      lineHeight: 1.45,
      color: "#374151",
    },
  },

  // =====================================================
  // STANDARD ELEMENTS
  // =====================================================
  elements: {
    page: {
      boxSizing: "border-box",
      background: "#ffffff",
    },

    header: {
      width: "100%",
      boxSizing: "border-box",
    },

    section: {
      marginTop: "18px",
      marginBottom: "8px",
    },

    sectionTitle: {
      marginBottom: "6px",
    },

    sectionDivider: {
      borderBottom: "1px solid #d1d5db",
      paddingBottom: "4px",
    },

    item: {
      marginBottom: "12px",
    },

    bullet: {
      marginLeft: "14px",
      marginBottom: "3px",
    },

    meta: {
      marginTop: "2px",
    },

    contact: {
      marginTop: "4px",
    },
  },

  // =====================================================
  // STANDARD HEADER
  // =====================================================
  header: {
    name: {
      fontSize: "24px",
      fontWeight: 800,
      lineHeight: 1.15,
      color: "#111827",
    },

    title: {
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: 1.3,
      color: "#4b5563",
    },

    contact: {
      fontSize: "13px",
      lineHeight: 1.45,
      color: "#6b7280",
    },
  },

  // =====================================================
  // TEMPLATE-SPECIFIC CONFIGURATION
  //
  // These values allow each template to keep its own
  // visual identity WITHOUT creating a separate styling
  // system.
  // =====================================================
  templates: {
    chronological: {
      accent: "#1A2A3A",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "single",
    },

    combination: {
      accent: "#0F766E",
      banner: "#0F766E",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "single",
    },

    corporate: {
      accent: "#1A2A3A",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "single",
    },

    executive: {
      accent: "#1A2A3A",
      secondaryAccent: "#D4A030",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "single",
    },

    functional: {
      accent: "#6D28D9",
      lightAccent: "#F5F3FF",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "single",
    },

    minimal: {
      accent: "#111827",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "single",
    },

    creative: {
      accent: "#9D174D",
      lightAccent: "#FDF2F8",
      sidebarWidth: "32%",
      contentWidth: "68%",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "two-column",
      hasPhoto: true,
    },

    two_column: {
      accent: "#1A2A3A",
      secondaryAccent: "#2C7A7A",
      sidebarWidth: "32%",
      contentWidth: "68%",
      fontFamily: "Arial, Helvetica, sans-serif",
      layout: "two-column",
      hasPhoto: true,
    },
  },
};

export { resumeTheme };
export default resumeTheme;
