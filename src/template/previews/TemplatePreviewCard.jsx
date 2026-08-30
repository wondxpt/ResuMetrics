import { Box } from "@mui/material";

const A4_WIDTH = "210mm";
const A4_HEIGHT = "297mm";

function TemplatePreviewCard({ children }) {
  return (
    <Box
      dir="ltr"
      // Same reasoning as templates/ResumePage.jsx: these preview
      // thumbnails must keep the template's own designed layout
      // direction regardless of the app UI's language/direction.
      sx={{
        width: A4_WIDTH,
        height: A4_HEIGHT,

        minWidth: A4_WIDTH,
        minHeight: A4_HEIGHT,

        maxWidth: A4_WIDTH,
        maxHeight: A4_HEIGHT,

        position: "relative",

        bgcolor: "#ffffff",

        boxSizing: "border-box",

        overflow: "hidden",

        flex: "0 0 auto",

        fontFamily: "Helvetica, Arial, sans-serif",

        // تمام عناصر داخل صفحه
        "& *": {
          boxSizing: "border-box",
          maxWidth: "100%",
        },

        // خود صفحه رزومه
        "& .resume-page": {
          position: "relative",

          width: `${A4_WIDTH} !important`,
          minWidth: `${A4_WIDTH} !important`,
          maxWidth: `${A4_WIDTH} !important`,

          height: `${A4_HEIGHT} !important`,
          minHeight: `${A4_HEIGHT} !important`,
          maxHeight: `${A4_HEIGHT} !important`,

          margin: "0 !important",

          boxSizing: "border-box !important",

          overflow: "hidden !important",

          transform: "none !important",
        },

        // جلوگیری از بیرون‌زدگی متن
        "& p, & span, & li, & h1, & h2, & h3, & h4, & h5, & h6": {
          maxWidth: "100%",
          minWidth: 0,

          overflowWrap: "anywhere",
          wordBreak: "normal",

          whiteSpace: "normal",
        },

        // جلوگیری از بیرون‌زدگی آیتم‌های flex
        "& .MuiBox-root": {
          minWidth: 0,
        },

        // تصاویر
        "& img": {
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
        },
      }}
    >
      {children}
    </Box>
  );
}

export default TemplatePreviewCard;

