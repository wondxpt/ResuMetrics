import { Box } from "@mui/material";

export const PREVIEW_WIDTH = 793.7008;
export const PREVIEW_HEIGHT = 1122.5197;

function PreviewFrame({ children, sx = {}, ...props }) {
  return (
    <Box
      {...props}
      sx={{
        position: "relative",

        width: "210mm",
        height: "297mm",

        minWidth: "210mm",
        minHeight: "297mm",

        maxWidth: "210mm",
        maxHeight: "297mm",

        flexShrink: 0,

        boxSizing: "border-box",

        backgroundColor: "#ffffff",

        overflow: "hidden",

        margin: 0,
        padding: 0,

        "& > .resume-page": {
          width: "100% !important",
          height: "100% !important",

          minWidth: "100% !important",
          minHeight: "100% !important",

          maxWidth: "100% !important",
          maxHeight: "100% !important",

          margin: "0 !important",
          padding: "0 !important",

          boxSizing: "border-box !important",

          transform: "none !important",
        },

        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default PreviewFrame;