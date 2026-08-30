import { Box } from "@mui/material";

function TemplateWireframe({ layout = "chronological" }) {
  const base = {
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,

    bgcolor: "#ffffff",

    borderRadius: 0,

    overflow: "hidden",

    position: "relative",

    boxSizing: "border-box",

    flexShrink: 0,
  };

  if (layout === "combination") {
    return (
      <Box
        sx={{
          ...base,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            bgcolor: "#0f766e",
            height: "46px",
            minHeight: "46px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 110,
              height: 8,
              bgcolor: "#fff",
              borderRadius: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            px: 2,
            py: 2,
            flex: 1,
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              height: 8,
              width: 120,
              bgcolor: "#d1d5db",
              mb: 1,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: 150,
              bgcolor: "#d1d5db",
              mb: 2,
            }}
          />

          <Box
            sx={{
              bgcolor: "#eef7f6",
              border: "1px solid #0f766e",
              p: 1,
              mb: 2,
            }}
          >
            <Box
              sx={{
                height: 7,
                width: "100%",
                bgcolor: "#94a3b8",
                mb: 0.5,
              }}
            />

            <Box
              sx={{
                height: 7,
                width: "88%",
                bgcolor: "#94a3b8",
                mb: 0.5,
              }}
            />
          </Box>

          <Box
            sx={{
              borderBottom: "2px solid #0f766e",
              width: 150,
              mb: 1,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "100%",
              bgcolor: "#e5e7eb",
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "88%",
              bgcolor: "#e5e7eb",
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "90%",
              bgcolor: "#e5e7eb",
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              mt: 2,
              borderBottom: "2px solid #0f766e",
              width: 150,
              mb: 1,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "100%",
              bgcolor: "#e5e7eb",
              mb: 0.8,
            }}
          />
        </Box>
      </Box>
    );
  }

  if (layout === "functional") {
    return (
      <Box
        sx={{
          ...base,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #6D28D9",
            pb: 2,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: 140,
              height: 10,
              bgcolor: "#111827",
              mb: 1,
            }}
          />

          <Box
            sx={{
              width: 100,
              height: 6,
              bgcolor: "#6D28D9",
            }}
          />
        </Box>

        <Box
          sx={{
            bgcolor: "#f5f3ff",
            border: "1px solid #6D28D9",
            p: 1,
            mt: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              height: 8,
              width: "100%",
              bgcolor: "#cbc3ff",
              mb: 0.6,
            }}
          />

          <Box
            sx={{
              height: 8,
              width: "95%",
              bgcolor: "#cbc3ff",
              mb: 0.6,
            }}
          />
        </Box>

        <Box
          sx={{
            borderBottom: "2px solid #6D28D9",
            width: 150,
            mb: 1,
          }}
        />

        <Box
          sx={{
            height: 6,
            width: "100%",
            bgcolor: "#e5e7eb",
            mb: 0.7,
          }}
        />

        <Box
          sx={{
            height: 6,
            width: "90%",
            bgcolor: "#e5e7eb",
            mb: 0.7,
          }}
        />

        <Box
          sx={{
            height: 6,
            width: "94%",
            bgcolor: "#e5e7eb",
            mb: 0.7,
          }}
        />
      </Box>
    );
  }

  if (layout === "two_column") {
    return (
      <Box
        sx={{
          ...base,
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "34%",
            height: "100%",
            bgcolor: "#1e293b",
            p: 2,
            color: "#fff",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              bgcolor: "#fff",
              opacity: 0.8,
              mx: "auto",
              mb: 2,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "90%",
              bgcolor: "#fff",
              mb: 1,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "80%",
              bgcolor: "#d1d5db",
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "86%",
              bgcolor: "#d1d5db",
              mb: 1.2,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "88%",
              bgcolor: "#d1d5db",
              mb: 0.8,
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            height: "100%",
            p: 2,
            bgcolor: "#fff",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              height: 10,
              width: 140,
              bgcolor: "#1e293b",
              mb: 1,
            }}
          />

          <Box
            sx={{
              height: 8,
              width: 110,
              bgcolor: "#b8bfc9",
              mb: 2,
            }}
          />

          <Box
            sx={{
              height: 7,
              width: "100%",
              bgcolor: "#e5e7eb",
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              height: 7,
              width: "94%",
              bgcolor: "#e5e7eb",
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              height: 7,
              width: "90%",
              bgcolor: "#e5e7eb",
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              height: 7,
              width: "88%",
              bgcolor: "#e5e7eb",
              mb: 0.8,
            }}
          />
        </Box>
      </Box>
    );
  }

  if (layout === "creative_photo") {
    return (
      <Box
        sx={{
          ...base,
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "34%",
            height: "100%",
            bgcolor: "#9D174D",
            p: 2,
            color: "#fff",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 82,
              height: 82,
              borderRadius: "50%",
              bgcolor: "#fff",
              mx: "auto",
              mb: 2,
            }}
          />

          <Box
            sx={{
              height: 7,
              width: 90,
              bgcolor: "#fff",
              mb: 1,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "88%",
              bgcolor: "#fff",
              opacity: 0.9,
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "94%",
              bgcolor: "#fff",
              opacity: 0.9,
              mb: 0.8,
            }}
          />

          <Box
            sx={{
              height: 6,
              width: "72%",
              bgcolor: "#fff",
              opacity: 0.9,
              mb: 0.8,
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            height: "100%",
            p: 2,
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              height: 12,
              width: 150,
              bgcolor: "#111827",
              mb: 1,
            }}
          />

          <Box
            sx={{
              height: 8,
              width: 120,
              bgcolor: "#9D174D",
              mb: 2,
            }}
          />

          <Box
            sx={{
              height: 7,
              width: "100%",
              bgcolor: "#e5e7eb",
              mb: 0.7,
            }}
          />

          <Box
            sx={{
              height: 7,
              width: "88%",
              bgcolor: "#e5e7eb",
              mb: 0.7,
            }}
          />

          <Box
            sx={{
              height: 7,
              width: "98%",
              bgcolor: "#e5e7eb",
              mb: 0.7,
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...base,
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 12,
            bgcolor: "#111827",
            mx: "auto",
            mb: 1,
          }}
        />

        <Box
          sx={{
            width: 116,
            height: 7,
            bgcolor: "#4b5563",
            mx: "auto",
            mb: 1,
          }}
        />

        <Box
          sx={{
            width: 170,
            height: 6,
            bgcolor: "#94a3b8",
            mx: "auto",
          }}
        />
      </Box>

      <Box
        sx={{
          borderBottom: "2px solid #1f2937",
          width: 150,
          mb: 1,
        }}
      />

      <Box
        sx={{
          height: 7,
          width: "100%",
          bgcolor: "#e5e7eb",
          mb: 0.7,
        }}
      />

      <Box
        sx={{
          height: 7,
          width: "92%",
          bgcolor: "#e5e7eb",
          mb: 0.7,
        }}
      />

      <Box
        sx={{
          height: 7,
          width: "96%",
          bgcolor: "#e5e7eb",
          mb: 1.8,
        }}
      />

      <Box
        sx={{
          borderBottom: "2px solid #1f2937",
          width: 140,
          mb: 1,
        }}
      />

      <Box
        sx={{
          height: 7,
          width: "100%",
          bgcolor: "#e5e7eb",
          mb: 0.7,
        }}
      />

      <Box
        sx={{
          height: 7,
          width: "86%",
          bgcolor: "#e5e7eb",
          mb: 0.7,
        }}
      />
    </Box>
  );
}

export default TemplateWireframe;