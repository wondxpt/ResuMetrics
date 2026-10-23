// Shared in-app ResuMetrics logo. The supplied artwork is processed as a
// transparent PNG with the outer white border removed. Every <Logo />
// placement uses this single asset.
function Logo({ size = 34, alt = "ResuMetrics" }) {
  return (
    <img
      src="/resumetrics-logo.png"
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
