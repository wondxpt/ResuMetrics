import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useEffect, useRef, useState } from "react";

const FRAME_SIZE = 360;
const OUTPUT_SIZE = 1000;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getBaseScale(size, image) {
  if (!image?.naturalWidth || !image?.naturalHeight) return 1;

  return Math.max(size / image.naturalWidth, size / image.naturalHeight);
}

function getImageMetrics(image, zoom) {
  const baseScale = getBaseScale(FRAME_SIZE, image);
  const scale = baseScale * zoom;
  return {
    width: image.naturalWidth * scale,
    height: image.naturalHeight * scale,
  };
}

function getPositionBounds(image, zoom) {
  if (!image?.naturalWidth || !image?.naturalHeight) {
    return { x: 0, y: 0 };
  }

  const { width, height } = getImageMetrics(image, zoom);

  return {
    x: Math.max(0, (width - FRAME_SIZE) / 2),
    y: Math.max(0, (height - FRAME_SIZE) / 2),
  };
}

function clampPosition(x, y, image, zoom) {
  const bounds = getPositionBounds(image, zoom);

  return {
    x: clamp(x, -bounds.x, bounds.x),
    y: clamp(y, -bounds.y, bounds.y),
  };
}

function PhotoEditor({
  value = "",
  onChange,
  buttonLabel = "Edit Photo",
  showChoose = true,
}) {
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const pointersRef = useRef(new Map());
  const gestureRef = useRef({
    mode: "none",
    lastX: 0,
    lastY: 0,
    startDistance: 0,
    startZoom: MIN_ZOOM,
    lastMidX: 0,
    lastMidY: 0,
  });

  const [open, setOpen] = useState(false);
  const [source, setSource] = useState(value || "");
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    setSource(value || "");
  }, [value]);

  const resetEditor = () => {
    setZoom(MIN_ZOOM);
    setOffsetX(0);
    setOffsetY(0);
  };

  const resetGesture = () => {
    pointersRef.current.clear();
    gestureRef.current = {
      mode: "none",
      lastX: 0,
      lastY: 0,
      startDistance: 0,
      startZoom: MIN_ZOOM,
      lastMidX: 0,
      lastMidY: 0,
    };
  };

  const openEditor = () => {
    setSource(value || "");
    resetEditor();
    resetGesture();
    setOpen(true);
  };

  const closeEditor = () => {
    resetGesture();
    setOpen(false);
  };

  const loadFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();

    reader.onload = () => {
      setSource(String(reader.result || ""));
      resetEditor();
      resetGesture();
      setOpen(true);
    };

    reader.readAsDataURL(file);
  };

  const drawPreview = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image || !image.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(FRAME_SIZE * dpr);
    canvas.height = Math.round(FRAME_SIZE * dpr);
    canvas.style.width = `${FRAME_SIZE}px`;
    canvas.style.height = `${FRAME_SIZE}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);
    ctx.fillStyle = "text.primary";
    ctx.fillRect(0, 0, FRAME_SIZE, FRAME_SIZE);

    const { width, height } = getImageMetrics(image, zoom);

    ctx.save();
    ctx.translate(FRAME_SIZE / 2 + offsetX, FRAME_SIZE / 2 + offsetY);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.restore();
  };

  useEffect(() => {
    drawPreview();
  }, [source, zoom, offsetX, offsetY]);

  const getDistance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);

  const getMidpoint = (a, b) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  });

  const handlePointerDown = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture?.(event.pointerId);
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    const pointers = [...pointersRef.current.values()];

    if (pointers.length === 1) {
      gestureRef.current = {
        ...gestureRef.current,
        mode: "drag",
        lastX: event.clientX,
        lastY: event.clientY,
      };
    } else if (pointers.length >= 2) {
      const [a, b] = pointers;
      const midpoint = getMidpoint(a, b);

      gestureRef.current = {
        ...gestureRef.current,
        mode: "pinch",
        startDistance: Math.max(getDistance(a, b), 1),
        startZoom: zoom,
        lastMidX: midpoint.x,
        lastMidY: midpoint.y,
      };
    }

    event.preventDefault();
  };

  const handlePointerMove = (event) => {
    const pointers = pointersRef.current;
    if (!pointers.has(event.pointerId)) return;

    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    const activePointers = [...pointers.values()];
    const gesture = gestureRef.current;

    if (activePointers.length >= 2) {
      const [a, b] = activePointers;
      const distance = Math.max(getDistance(a, b), 1);
      const midpoint = getMidpoint(a, b);

      if (gesture.mode !== "pinch") {
        gesture.mode = "pinch";
        gesture.startDistance = distance;
        gesture.startZoom = zoom;
        gesture.lastMidX = midpoint.x;
        gesture.lastMidY = midpoint.y;
      }

      const scale = distance / Math.max(gesture.startDistance, 1);
      const nextZoom = clamp(gesture.startZoom * scale, MIN_ZOOM, MAX_ZOOM);
      const nextPosition = clampPosition(
        offsetX + (midpoint.x - gesture.lastMidX),
        offsetY + (midpoint.y - gesture.lastMidY),
        imageRef.current,
        nextZoom
      );

      setZoom(Number(nextZoom.toFixed(3)));
      setOffsetX(nextPosition.x);
      setOffsetY(nextPosition.y);

      gesture.lastMidX = midpoint.x;
      gesture.lastMidY = midpoint.y;
      event.preventDefault();
      return;
    }

    if (activePointers.length === 1 && gesture.mode === "drag") {
      const dx = event.clientX - gesture.lastX;
      const dy = event.clientY - gesture.lastY;
      const nextPosition = clampPosition(
        offsetX + dx,
        offsetY + dy,
        imageRef.current,
        zoom
      );

      gesture.lastX = event.clientX;
      gesture.lastY = event.clientY;

      setOffsetX(nextPosition.x);
      setOffsetY(nextPosition.y);
      event.preventDefault();
    }
  };

  const handlePointerUp = (event) => {
    const canvas = canvasRef.current;
    pointersRef.current.delete(event.pointerId);

    if (
      canvas?.releasePointerCapture &&
      canvas.hasPointerCapture?.(event.pointerId)
    ) {
      canvas.releasePointerCapture(event.pointerId);
    }

    const remaining = [...pointersRef.current.values()];

    if (remaining.length === 1) {
      const [point] = remaining;
      gestureRef.current = {
        ...gestureRef.current,
        mode: "drag",
        lastX: point.x,
        lastY: point.y,
      };
    } else {
      gestureRef.current.mode = "none";
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();

    const delta = event.deltaY < 0 ? 0.08 : -0.08;
    const nextZoom = clamp(
      Number((zoom + delta).toFixed(3)),
      MIN_ZOOM,
      MAX_ZOOM
    );
    const nextPosition = clampPosition(
      offsetX,
      offsetY,
      imageRef.current,
      nextZoom
    );

    setZoom(nextZoom);
    setOffsetX(nextPosition.x);
    setOffsetY(nextPosition.y);
  };

  const setZoomSafely = (nextValue) => {
    const nextZoom = clamp(Number(nextValue), MIN_ZOOM, MAX_ZOOM);
    const nextPosition = clampPosition(
      offsetX,
      offsetY,
      imageRef.current,
      nextZoom
    );

    setZoom(nextZoom);
    setOffsetX(nextPosition.x);
    setOffsetY(nextPosition.y);
  };

  const adjustZoom = (delta) => {
    setZoomSafely(Number((zoom + delta).toFixed(2)));
  };

  const handleSave = () => {
    const image = imageRef.current;
    if (!image || !image.naturalWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleRatio = OUTPUT_SIZE / FRAME_SIZE;
    const baseScale = getBaseScale(OUTPUT_SIZE, image);
    const scale = baseScale * zoom;
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;

    ctx.fillStyle = "background.paper";
    ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    ctx.save();
    ctx.translate(
      OUTPUT_SIZE / 2 + offsetX * scaleRatio,
      OUTPUT_SIZE / 2 + offsetY * scaleRatio
    );
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );
    ctx.restore();

    const result = canvas.toDataURL("image/jpeg", 0.94);
    onChange?.(result);
    setSource(result);
    setOpen(false);
    resetGesture();
  };

  const handleMainButtonClick = () => {
    if (value) {
      openEditor();
      return;
    }

    inputRef.current?.click();
  };

  return (
    <>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button
          variant="outlined"
          startIcon={<PhotoCameraIcon />}
          onClick={handleMainButtonClick}
          sx={{
            borderColor: "primary.main",
            color: "primary.main",
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            px: 2,
            minHeight: 40,
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
        >
          {buttonLabel}
        </Button>

        <input
          ref={inputRef}
          hidden
          accept="image/*"
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            loadFile(file);
            event.target.value = "";
          }}
        />
      </Stack>

      <Dialog
        open={open}
        onClose={closeEditor}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            width: "min(100%, 520px)",
            maxHeight: "calc(100dvh - 20px)",
            m: 1,
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid var(--app-divider)",
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Edit profile photo
          <IconButton onClick={closeEditor} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            p: { xs: 1.5, sm: 2.5 },
            background: "background.paper",
            overflowY: "auto",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                maxWidth: 420,
              }}
            >
              Drag the photo to reposition it. Pinch with two fingers or use
              the zoom control to resize it inside the frame.
            </Typography>

            <Box
              sx={{
                position: "relative",
                width: "min(360px, 78vw)",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                overflow: "hidden",
                background: "text.primary",
                touchAction: "none",
                boxShadow: "0 6px 30px rgba(15,23,42,.18)",
              }}
            >
              {source ? (
                <Box
                  ref={canvasRef}
                  component="canvas"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onWheel={handleWheel}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    touchAction: "none",
                    cursor: "grab",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                  }}
                />
              ) : null}

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,.95)",
                  pointerEvents: "none",
                }}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              The area inside the circle is the part that will be saved.
            </Typography>

            <Button
              variant="text"
              startIcon={<PhotoCameraIcon />}
              onClick={() => inputRef.current?.click()}
              sx={{
                color: "primary.main",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Change photo
            </Button>

            <Box sx={{ width: "100%", maxWidth: 420 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 0.5 }}
              >
                <Typography sx={{ fontWeight: 700, color: "text.primary" }}>
                  Zoom
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(zoom * 100)}%
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={() => adjustZoom(-0.1)}
                  disabled={zoom <= MIN_ZOOM}
                  aria-label="Zoom out"
                >
                  <RemoveIcon />
                </IconButton>

                <Slider
                  value={zoom}
                  min={MIN_ZOOM}
                  max={MAX_ZOOM}
                  step={0.01}
                  onChange={(_, next) => setZoomSafely(next)}
                  sx={{ color: "primary.main" }}
                />

                <IconButton
                  onClick={() => adjustZoom(0.1)}
                  disabled={zoom >= MAX_ZOOM}
                  aria-label="Zoom in"
                >
                  <AddIcon />
                </IconButton>
              </Stack>
            </Box>

            <Button
              variant="text"
              startIcon={<RestartAltIcon />}
              onClick={resetEditor}
              sx={{
                color: "text.secondary",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Reset position and zoom
            </Button>

            {source ? (
              <Box
                component="img"
                ref={imageRef}
                src={source}
                alt=""
                onLoad={drawPreview}
                sx={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
            ) : null}
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            p: 1.5,
            borderTop: "1px solid var(--app-divider)",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button
            onClick={closeEditor}
            sx={{
              color: "text.secondary",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleSave}
            disabled={!source}
            sx={{
              bgcolor: "primary.main",
              borderRadius: 999,
              px: 2.5,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Save photo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PhotoEditor;
