import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Slider,
  IconButton,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CheckIcon from "@mui/icons-material/Check";

import { useEffect, useRef, useState } from "react";

// Preview stage size, in CSS px. The circular crop frame fills this
// square. Kept fixed so the drag/zoom math is simple and predictable.
const STAGE_SIZE = 320;

// Resolution of the exported (cropped) image, in px.
const OUTPUT_SIZE = 640;

function getCoverScale(naturalWidth, naturalHeight, rotationDeg, frameSize) {
  const rotated = rotationDeg % 180 !== 0;
  const w = rotated ? naturalHeight : naturalWidth;
  const h = rotated ? naturalWidth : naturalHeight;
  if (!w || !h) return 1;
  return Math.max(frameSize / w, frameSize / h);
}

function PhotoEditorDialog({ open, imageSrc, onClose, onSave }) {
  const imgRef = useRef(null);
  const stageRef = useRef(null);

  const [naturalSize, setNaturalSize] = useState({
    width: 0,
    height: 0,
  });

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragState = useRef(null);

  useEffect(() => {
    if (!open) return;

    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
    setNaturalSize({ width: 0, height: 0 });
  }, [open, imageSrc]);

  const handleImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    setNaturalSize({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  const coverScale = getCoverScale(
    naturalSize.width,
    naturalSize.height,
    rotation,
    STAGE_SIZE
  );

  const totalScale = coverScale * zoom;

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setOffset({
      x: dragState.current.offsetX + dx,
      y: dragState.current.offsetY + dy,
    });
  };

  const handlePointerUp = () => {
    dragState.current = null;
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  const handleRotate = (dir) => {
    setRotation((prev) => {
      const next = (prev + dir * 90 + 360) % 360;
      return next;
    });
    // Rotating changes which axis "cover" is measured against, so
    // re-centering avoids the image appearing to jump outside frame.
    setOffset({ x: 0, y: 0 });
  };

  const handleSave = () => {
    const img = imgRef.current;
    if (!img || !naturalSize.width) return;

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext("2d");

    const ratio = OUTPUT_SIZE / STAGE_SIZE;

    ctx.save();
    ctx.beginPath();
    ctx.arc(
      OUTPUT_SIZE / 2,
      OUTPUT_SIZE / 2,
      OUTPUT_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = "background.paper";
    ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    ctx.translate(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2);
    ctx.translate(offset.x * ratio, offset.y * ratio);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(totalScale * ratio, totalScale * ratio);

    ctx.drawImage(
      img,
      -naturalSize.width / 2,
      -naturalSize.height / 2,
      naturalSize.width,
      naturalSize.height
    );

    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, overflow: "hidden" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          pt: 2.5,
          pb: 1,
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Adjust Photo
        </Typography>

        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
          pb: 1,
        }}
      >
        <Box
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          sx={{
            width: STAGE_SIZE,
            height: STAGE_SIZE,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            background:
              "repeating-conic-gradient(#f1f1f6 0% 25%, #ffffff 0% 50%) 50% / 20px 20px",
            border: "1px solid",
            borderColor: "divider",
            cursor: "grab",
            touchAction: "none",
            userSelect: "none",
            "&:active": { cursor: "grabbing" },
          }}
        >
          {imageSrc ? (
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Selected"
              onLoad={handleImageLoad}
              draggable={false}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: naturalSize.width || "auto",
                height: naturalSize.height || "auto",
                maxWidth: "none",
                transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${totalScale})`,
                transformOrigin: "center center",
                pointerEvents: "none",
              }}
            />
          ) : null}

          {/* Subtle frame ring for a polished, app-like feel */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              boxShadow:
                "inset 0 0 0 2px rgba(67, 56, 202, 0.35)",
              pointerEvents: "none",
            }}
          />
        </Box>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary" }}
        >
          Drag to reposition · use the slider to zoom
        </Typography>

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ width: "100%", px: 1 }}
        >
          <ZoomOutIcon fontSize="small" sx={{ color: "text.secondary" }} />

          <Slider
            size="small"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e, v) => setZoom(v)}
          />

          <ZoomInIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Stack>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Rotate left">
            <IconButton
              onClick={() => handleRotate(-1)}
              size="small"
              sx={{
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <RotateLeftIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Rotate right">
            <IconButton
              onClick={() => handleRotate(1)}
              size="small"
              sx={{
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <RotateRightIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset">
            <IconButton
              onClick={handleReset}
              size="small"
              sx={{
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<CheckIcon />}
          onClick={handleSave}
          disabled={!naturalSize.width}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PhotoEditorDialog;
