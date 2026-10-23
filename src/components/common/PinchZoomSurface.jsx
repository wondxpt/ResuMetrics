import { useEffect, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function distance(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function midpoint(a, b) {
  return {
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2,
  };
}

export default function PinchZoomSurface({
  children,
  baseScale = 1,
  minScale = 1,
  maxScale = 2.5,
  onGestureScale,
  className,
  style,
}) {
  const surfaceRef = useRef(null);
  const gestureRef = useRef(null);
  const baseScaleRef = useRef(baseScale);
  const onGestureScaleRef = useRef(onGestureScale);
  const [gesture, setGesture] = useState(null);

  useEffect(() => {
    baseScaleRef.current = baseScale;
    onGestureScaleRef.current = onGestureScale;
  }, [baseScale, onGestureScale]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const finishGesture = () => {
      if (!gestureRef.current) return;
      const start = gestureRef.current;
      gestureRef.current = null;
      setGesture(null);
      onGestureScaleRef.current?.(start.baseScale);
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 2) return;
      const [a, b] = event.touches;
      gestureRef.current = {
        baseScale: baseScaleRef.current,
        startDistance: Math.max(distance(a, b), 1),
        startMidpoint: midpoint(a, b),
        scale: baseScaleRef.current,
      };
      setGesture({ scale: baseScaleRef.current, x: 0, y: 0 });
    };

    const handleTouchMove = (event) => {
      const start = gestureRef.current;
      if (!start || event.touches.length !== 2) return;

      event.preventDefault();
      const [a, b] = event.touches;
      const nextScale = clamp(
        start.baseScale * (distance(a, b) / start.startDistance),
        minScale,
        maxScale
      );
      const center = midpoint(a, b);
      const nextX = center.x - start.startMidpoint.x;
      const nextY = center.y - start.startMidpoint.y;

      start.scale = nextScale;
      setGesture({ scale: nextScale, x: nextX, y: nextY });
      onGestureScaleRef.current?.(nextScale);
    };

    surface.addEventListener("touchstart", handleTouchStart, { passive: true });
    surface.addEventListener("touchmove", handleTouchMove, { passive: false });
    surface.addEventListener("touchend", finishGesture, { passive: true });
    surface.addEventListener("touchcancel", finishGesture, { passive: true });

    return () => {
      surface.removeEventListener("touchstart", handleTouchStart);
      surface.removeEventListener("touchmove", handleTouchMove);
      surface.removeEventListener("touchend", finishGesture);
      surface.removeEventListener("touchcancel", finishGesture);
    };
  }, [minScale, maxScale]);

  return (
    <div
      ref={surfaceRef}
      className={className}
      style={{
        ...style,
        touchAction: "pan-x pan-y",
        overscrollBehavior: "contain",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transform: gesture
            ? `translate(${gesture.x}px, ${gesture.y}px) scale(${gesture.scale / Math.max(baseScale, 0.001)})`
            : "none",
          transformOrigin: "center center",
          transition: gesture ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: gesture ? "transform" : "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
