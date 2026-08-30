// Renders the app's real icon file - the exact same PNG used for the
// browser favicon, the PWA icon, and the Android/Capacitor launcher
// icon (public/android-chrome-192x192.png) - rather than a separate
// hand-drawn copy. That way every in-app logo placement is
// guaranteed to be pixel-identical to the actual app icon, with a
// single source of truth: update the icon file once, and it updates
// everywhere (navbar, language screen, anywhere else `<Logo />` is
// used) automatically.
function Logo({ size = 34, alt = "ResuMetrics" }) {
  return (
    <img
      src="/android-chrome-512x512.png"
      width={size}
      height={size}
      alt={alt}
      style={{
        display: "block",
        flexShrink: 0,
        width: size,
        height: size,
        objectFit: "contain",
      }}
    />
  );
}

export default Logo;
