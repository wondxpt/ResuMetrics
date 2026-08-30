import { Box } from "@mui/material";

function ResumePreviewWrapper({ children }) {
  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        height: "297mm",
        overflow: "hidden",
        border: "1px solid #ddd",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 0,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "210mm",
          minHeight: "297mm",
          height: "297mm",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default ResumePreviewWrapper;
