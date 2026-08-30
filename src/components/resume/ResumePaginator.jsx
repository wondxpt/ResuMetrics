import { Box } from "@mui/material";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 793.7008;
const A4_HEIGHT_PX = 1122.5197;

const PAGE_BOTTOM_INSET = 56;
const NEXT_PAGE_TOP_INSET = 56;
const MIN_PROGRESS = 8;

function waitForAssets(node) {
  const images = Array.from(node.querySelectorAll("img"));

  const imagePromises = images.map((image) => {
    if (image.complete) return Promise.resolve();

    return new Promise((resolve) => {
      const done = () => resolve();
      image.addEventListener("load", done, { once: true });
      image.addEventListener("error", done, { once: true });
    });
  });

  const fontPromise = document.fonts?.ready || Promise.resolve();

  return Promise.all([fontPromise, ...imagePromises]);
}

function getBreakCandidates(root) {
  const rootRect = root.getBoundingClientRect();
  const candidates = [];

  const nodes = root.querySelectorAll("*");

  nodes.forEach((node) => {
    if (node === root) return;

    const computed = window.getComputedStyle(node);

    if (
      computed.position === "absolute" ||
      computed.position === "fixed" ||
      computed.display === "inline" ||
      computed.display === "contents"
    ) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const top = rect.top - rootRect.top;
    const height = rect.height;

    if (!Number.isFinite(top) || !Number.isFinite(height)) return;
    if (height <= 0) return;
    if (top <= 0.5) return;

    candidates.push(top);
  });

  candidates.sort((a, b) => a - b);

  const unique = [];

  candidates.forEach((value) => {
    if (!unique.length || Math.abs(value - unique[unique.length - 1]) > 1) {
      unique.push(value);
    }
  });

  return unique;
}

function calculateOffsets(root) {
  const totalHeight = Math.max(
    root.scrollHeight,
    root.getBoundingClientRect().height
  );

  if (totalHeight <= A4_HEIGHT_PX + 1) {
    return [0];
  }

  const candidates = getBreakCandidates(root);
  const offsets = [0];

  let currentOffset = 0;

  while (currentOffset + A4_HEIGHT_PX < totalHeight - 1) {
    const pageEnd =
      currentOffset + A4_HEIGHT_PX - PAGE_BOTTOM_INSET;

    let breakPoint = null;

    for (let index = candidates.length - 1; index >= 0; index -= 1) {
      const candidate = candidates[index];

      if (candidate <= currentOffset + MIN_PROGRESS) continue;
      if (candidate > pageEnd) continue;

      breakPoint = candidate;
      break;
    }

    if (breakPoint == null) {
      breakPoint = Math.min(
        currentOffset + A4_HEIGHT_PX - PAGE_BOTTOM_INSET,
        totalHeight
      );
    }

    const nextOffset = Math.max(
      currentOffset + MIN_PROGRESS,
      breakPoint - NEXT_PAGE_TOP_INSET
    );

    if (nextOffset <= currentOffset + MIN_PROGRESS) {
      break;
    }

    offsets.push(nextOffset);
    currentOffset = nextOffset;
  }

  return offsets;
}

function ResumePaginator({ children, onPageCount, ...props }) {
  const sourceRef = useRef(null);
  const sourceContentRef = useRef(null);
  const [offsets, setOffsets] = useState([0]);

  const paginate = useCallback(async () => {
    const source = sourceRef.current;
    if (!source) return;

    await waitForAssets(source);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const resumePage = source.querySelector(".resume-page");

        if (!resumePage) return;

        const nextOffsets = calculateOffsets(resumePage);
        setOffsets(nextOffsets);
        onPageCount?.(nextOffsets.length);
      });
    });
  }, [onPageCount]);

  useLayoutEffect(() => {
    paginate();
  }, [paginate]);

  useEffect(() => {
    const source = sourceRef.current;
    const sourceContent = sourceContentRef.current;
    if (!source || !sourceContent) return undefined;

    const resizeObserver = new ResizeObserver(() => {
      paginate();
    });

    const mutationObserver = new MutationObserver(() => {
      paginate();
    });

    resizeObserver.observe(sourceContent);

    mutationObserver.observe(sourceContent, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [paginate]);

  const rerenderKey = offsets.join("-");

  return (
    <Box
      ref={sourceRef}
      sx={{
        position: "relative",
        width: `${A4_WIDTH_MM}mm`,
        maxWidth: `${A4_WIDTH_MM}mm`,
        boxSizing: "border-box",
        ...props.sx,
      }}
    >
      <Box
        ref={sourceContentRef}
        sx={{
          position: "absolute",
          left: "-100000px",
          top: 0,
          width: `${A4_WIDTH_MM}mm`,
          visibility: "hidden",
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        {children}
      </Box>

      <Box
        key={rerenderKey}
        className="resume-pagination-output"
        sx={{
          width: `${A4_WIDTH_MM}mm`,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          boxSizing: "border-box",
        }}
      >
        {offsets.map((offset, index) => (
          <Box
            key={`${offset}-${index}`}
            className="resume-output-page"
            sx={{
              width: `${A4_WIDTH_MM}mm`,
              height: `${A4_HEIGHT_MM}mm`,
              minWidth: `${A4_WIDTH_MM}mm`,
              minHeight: `${A4_HEIGHT_MM}mm`,
              maxWidth: `${A4_WIDTH_MM}mm`,
              maxHeight: `${A4_HEIGHT_MM}mm`,
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
              boxShadow: "0 3px 14px rgba(0,0,0,0.14)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: `-${offset}px`,
                width: `${A4_WIDTH_MM}mm`,
                minWidth: `${A4_WIDTH_MM}mm`,
                boxSizing: "border-box",
              }}
            >
              {children}
            </Box>

            {index > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: `${NEXT_PAGE_TOP_INSET}px`,
                  backgroundColor: "#ffffff",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              />
            )}

            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: `${
                  index < offsets.length - 1
                    ? Math.max(
                        PAGE_BOTTOM_INSET,
                        A4_HEIGHT_PX -
                          (offsets[index + 1] +
                            NEXT_PAGE_TOP_INSET -
                            offset)
                      )
                    : PAGE_BOTTOM_INSET
                }px`,
                backgroundColor: "#ffffff",
                zIndex: 20,
                pointerEvents: "none",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ResumePaginator;
