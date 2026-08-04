/* Windows doesn't render regional-indicator flag emoji as actual flag images
   (Chrome/Edge on Windows show plain "GB" / "NL" letters instead), so we use
   small inline SVGs here to guarantee the flags always show correctly. */

export function GBFlag({ size = 16 }) {
  const w = size * 1.5;
  const h = size;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: 2, flexShrink: 0 }}
      aria-hidden="true"
    >
      <clipPath id="gb-clip">
        <rect width="30" height="20" rx="2" />
      </clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="30" height="20" fill="#00247d" />
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#cf142b" strokeWidth="1.5" />
        <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="6.5" />
        <path d="M15,0 V20 M0,10 H30" stroke="#cf142b" strokeWidth="3.5" />
      </g>
    </svg>
  );
}

export function NLFlag({ size = 16 }) {
  const w = size * 1.5;
  const h = size;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: 2, flexShrink: 0 }}
      aria-hidden="true"
    >
      <clipPath id="nl-clip">
        <rect width="30" height="20" rx="2" />
      </clipPath>
      <g clipPath="url(#nl-clip)">
        <rect width="30" height="20" fill="#21468b" />
        <rect width="30" height="13.34" fill="#fff" />
        <rect width="30" height="6.67" fill="#ae1c28" />
      </g>
    </svg>
  );
}
