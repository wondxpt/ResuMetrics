import {
  Fab,
  Dialog,
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Avatar,
  CircularProgress,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import PostAddIcon from "@mui/icons-material/PostAdd";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useResumeStore from "../store/resumeStore";
import { getLocalAssistantReply } from "../assistant/localAssistant";

function ChatBubble({ message, onInsertSummary, onNavigate }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1.5,
      }}
    >
      <Box sx={{ maxWidth: "85%" }}>
        <Box
          sx={{
            px: 2,
            py: 1.2,
            borderRadius: isUser
              ? "16px 16px 4px 16px"
              : "16px 16px 16px 4px",
            background: isUser ? "#4338CA" : "#F1F1F6",
            color: isUser ? "#fff" : "#0F1222",
            whiteSpace: "pre-wrap",
            fontSize: "0.92rem",
            lineHeight: 1.55,
          }}
        >
          {message.content}
        </Box>

        {!isUser && message.action?.type === "navigate" ? (
          <Box sx={{ mt: 0.75, ml: 0.5 }}>
            <Box
              component="button"
              type="button"
              onClick={() => onNavigate(message.action.path)}
              sx={{
                appearance: "none",
                cursor: "pointer",
                border: "1px solid #4338CA",
                color: "#4338CA",
                background: "#fff",
                borderRadius: "999px",
                px: 1.5,
                py: 0.5,
                fontSize: "0.8rem",
                fontWeight: 600,
                "&:hover": { background: "#EEF0FF" },
              }}
            >
              Go to {message.action.label} →
            </Box>
          </Box>
        ) : null}

        {!isUser && !message.pending ? (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ mt: 0.5, ml: 0.5 }}
          >
            <Tooltip title={copied ? "Copied!" : "Copy"}>
              <IconButton size="small" onClick={handleCopy}>
                {copied ? (
                  <CheckIcon sx={{ fontSize: 16 }} />
                ) : (
                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Use as professional summary">
              <IconButton
                size="small"
                onClick={() => onInsertSummary(message.content)}
              >
                <PostAddIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
}

function AIAssistant() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const resume = useResumeStore();
  const setField = useResumeStore((state) => state.setField);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [insertedFlash, setInsertedFlash] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I can help you write your professional summary, punch up your experience bullet points, or suggest skills for your target role. What would you like help with?",
    },
  ]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleInsertSummary = (text) => {
    setField("summary", text);
    setInsertedFlash(true);
    setTimeout(() => setInsertedFlash(false), 2000);
  };

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Runs entirely locally (no network call), but a tiny delay keeps
    // the chat feeling responsive rather than jarringly instant, and
    // gives the "thinking" spinner a moment to be visible.
    setTimeout(() => {
      try {
        const reply = getLocalAssistantReply(text, resume);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: reply.text,
            action: reply.action,
          },
        ]);
      } catch (error) {
        console.error("Assistant error:", error);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, something went wrong putting that together. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const chatBody = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background:
                "linear-gradient(135deg, #5A55E0 0%, #7C7FF2 100%)",
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 18 }} />
          </Avatar>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
              Resume Assistant
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
            >
              Built-in assistant · works fully offline
            </Typography>
          </Box>
        </Stack>

        <IconButton onClick={() => setOpen(false)} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 2,
        }}
      >
        {messages.map((m, i) => (
          <ChatBubble
            key={i}
            message={m}
            onInsertSummary={handleInsertSummary}
            onNavigate={handleNavigate}
          />
        ))}

        {loading ? (
          <Box sx={{ display: "flex", pl: 0.5 }}>
            <CircularProgress size={18} />
          </Box>
        ) : null}
      </Box>

      {insertedFlash ? (
        <Box
          sx={{
            mx: 2,
            mb: 1,
            px: 1.5,
            py: 0.7,
            borderRadius: 2,
            bgcolor: "#EEF0FF",
            color: "#4338CA",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          Added to your Professional Summary ✓
        </Box>
      ) : null}

      <Stack
        direction="row"
        spacing={1}
        sx={{
          p: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Ask for a summary, better bullet points..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          multiline
          maxRows={4}
        />

        <IconButton
          onClick={handleSend}
          disabled={loading || !input.trim()}
          sx={{
            bgcolor: "#4338CA",
            color: "#fff",
            "&:hover": { bgcolor: "#362DB0" },
            "&.Mui-disabled": {
              bgcolor: "#E4E4EC",
              color: "#8A8CA0",
            },
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          right: 16,
          // Sits above the fixed bottom navigation bar (~84px tall on
          // phones) instead of overlapping it.
          bottom: { xs: 96, sm: 96, md: 32 },
          zIndex: 1200,
          background:
            "linear-gradient(135deg, #5A55E0 0%, #7C7FF2 100%)",
          color: "#fff",
          boxShadow: "0 8px 20px rgba(90, 85, 224, 0.4)",
          "&:hover": {
            background:
              "linear-gradient(135deg, #4338CA 0%, #5A55E0 100%)",
          },
        }}
      >
        <AutoAwesomeIcon />
      </Fab>

      {isMobile ? (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullScreen
        >
          {chatBody}
        </Dialog>
      ) : (
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          anchor="right"
          PaperProps={{
            sx: { width: 420, maxWidth: "100vw" },
          }}
        >
          {chatBody}
        </Drawer>
      )}
    </>
  );
}

export default AIAssistant;
