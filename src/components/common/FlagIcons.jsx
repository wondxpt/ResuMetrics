// Rendered as real SVG rather than flag emoji (🇺🇸/🇨🇦) on purpose:
// many Android devices and WebViews (including the Capacitor build)
// don't have flag-emoji glyphs in their system font and silently
// fall back to blank/tofu characters. SVG paints identically
// everywhere.

export function UsFlagIcon({ size = 20 }) {
  const w = size;
  const h = (size * 2) / 3;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <clipPath id="usFlagClip">
          <rect width="30" height="20" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#usFlagClip)">
        <rect width="30" height="20" fill="#FFFFFF" />
        <rect y="0" width="30" height="1.54" fill="#B22234" />
        <rect y="3.08" width="30" height="1.54" fill="#B22234" />
        <rect y="6.15" width="30" height="1.54" fill="#B22234" />
        <rect y="9.23" width="30" height="1.54" fill="#B22234" />
        <rect y="12.31" width="30" height="1.54" fill="#B22234" />
        <rect y="15.38" width="30" height="1.54" fill="#B22234" />
        <rect y="18.46" width="30" height="1.54" fill="#B22234" />
        <rect x="0" y="0" width="12" height="10.77" fill="#3C3B6E" />
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="29"
        height="19"
        rx="2"
        fill="none"
        stroke="rgba(0,0,0,0.14)"
      />
    </svg>
  );
}

export function CaFlagIcon({ size = 20 }) {
  const w = size;
  const h = (size * 2) / 3;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <clipPath id="caFlagClip">
          <rect width="30" height="20" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#caFlagClip)">
        <rect width="30" height="20" fill="#FFFFFF" />
        <rect x="0" width="7.5" height="20" fill="#D80621" />
        <rect x="22.5" width="7.5" height="20" fill="#D80621" />
        <g transform="translate(15,10) scale(1.7)" fill="#D80621">
          <path d="M0,-2.3 L0.9,-0.6 L2.2,-0.9 L1.1,0.5 L1.9,1.9 L0,1.0 L-1.9,1.9 L-1.1,0.5 L-2.2,-0.9 L-0.9,-0.6 Z" />
          <line
            x1="0"
            y1="1.0"
            x2="0"
            y2="2.5"
            stroke="#D80621"
            strokeWidth="0.5"
          />
        </g>
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="29"
        height="19"
        rx="2"
        fill="none"
        stroke="rgba(0,0,0,0.14)"
      />
    </svg>
  );
}
