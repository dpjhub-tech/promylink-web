// Detailed vector illustration of a city skyline matching the reference design:
// storefront with striped awning, multi-story buildings with window grids,
// rooftop details, trees, floating clouds, and birds in soft pastel lavender tones.
export function CityIllustration() {
  return (
    <svg viewBox="0 0 440 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden="true">
      {/* Floating Clouds */}
      <path d="M40 35 C40 28 48 24 55 27 C59 20 70 20 75 26 C81 23 88 27 88 35 Z" fill="#E8EDFD" />
      <path d="M260 25 C260 20 266 17 271 19 C274 14 282 14 286 18 C290 16 295 19 295 25 Z" fill="#E8EDFD" />
      <path d="M380 40 C380 36 385 33 389 35 C392 31 398 31 401 34 C405 32 409 35 409 40 Z" fill="#E8EDFD" />

      {/* Birds */}
      <path d="M95 18 Q98 14 101 18 Q104 14 107 18" stroke="#BAC7F5" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M110 24 Q112 21 114 24 Q116 21 118 24" stroke="#BAC7F5" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* Left Tree */}
      <rect x="36" y="128" width="5" height="28" rx="2" fill="#B3C1F2" />
      <circle cx="38" cy="118" r="16" fill="#C5D3FA" />
      <circle cx="44" cy="112" r="11" fill="#D6E0FC" />

      {/* Tall Left Building */}
      <rect x="58" y="55" width="46" height="100" rx="2" fill="#DDE5FB" stroke="#C2D1F7" strokeWidth="1" />
      {[65, 78, 91].map((x) =>
        [65, 80, 95, 110, 125, 140].map((y) => (
          <rect key={`lw-${x}-${y}`} x={x} y={y} width="7" height="9" rx="1" fill="#FFFFFF" opacity="0.85" />
        ))
      )}

      {/* Background Slim Tower */}
      <rect x="114" y="38" width="38" height="118" rx="2" fill="#E6ECFC" stroke="#D1DCF8" strokeWidth="1" />
      {[122, 136].map((x) =>
        [48, 62, 76, 90, 104, 118, 132].map((y) => (
          <rect key={`bw-${x}-${y}`} x={x} y={y} width="8" height="7" rx="1" fill="#FFFFFF" opacity="0.75" />
        ))
      )}

      {/* Center Storefront / Low Building */}
      <rect x="108" y="105" width="85" height="51" rx="2" fill="#E2E9FB" stroke="#C0D0F7" strokeWidth="1" />
      {/* Striped Canopy Awning */}
      <path d="M106 105 L195 105 L191 114 L110 114 Z" fill="#9AAEEA" />
      <path d="M115 105 L125 105 L123 114 L113 114 Z" fill="#7D95E3" />
      <path d="M135 105 L145 105 L143 114 L133 114 Z" fill="#7D95E3" />
      <path d="M155 105 L165 105 L163 114 L153 114 Z" fill="#7D95E3" />
      <path d="M175 105 L185 105 L183 114 L173 114 Z" fill="#7D95E3" />
      {/* Store Windows & Door */}
      <rect x="116" y="120" width="28" height="26" rx="2" fill="#FFFFFF" stroke="#BACBF7" strokeWidth="1" />
      <line x1="130" y1="120" x2="130" y2="146" stroke="#BACBF7" strokeWidth="1" />
      <rect x="150" y="122" width="16" height="34" rx="1" fill="#FFFFFF" stroke="#BACBF7" strokeWidth="1" />
      <rect x="172" y="120" width="16" height="26" rx="2" fill="#FFFFFF" stroke="#BACBF7" strokeWidth="1" />

      {/* Mid-right Background Tower */}
      <rect x="202" y="70" width="36" height="86" rx="2" fill="#E8EDFC" stroke="#D3DEF8" strokeWidth="1" />
      {[208, 222].map((x) =>
        [78, 92, 106, 120, 134].map((y) => (
          <rect key={`mw-${x}-${y}`} x={x} y={y} width="8" height="7" rx="1" fill="#FFFFFF" opacity="0.8" />
        ))
      )}

      {/* Right Modern Office Building */}
      <rect x="245" y="48" width="55" height="108" rx="2" fill="#D7E1FA" stroke="#BDCEF7" strokeWidth="1" />
      <rect x="268" y="38" width="8" height="10" fill="#B3C4F4" />
      <line x1="272" y1="28" x2="272" y2="38" stroke="#9AAEEA" strokeWidth="1.5" />
      {[253, 267, 281].map((x) =>
        [58, 72, 86, 100, 114, 128, 142].map((y) => (
          <rect key={`rw-${x}-${y}`} x={x} y={y} width="8" height="7" rx="1" fill="#FFFFFF" opacity="0.9" />
        ))
      )}

      {/* Right Tree */}
      <rect x="312" y="128" width="5" height="28" rx="2" fill="#B3C1F2" />
      <circle cx="314" cy="116" r="18" fill="#C5D3FA" />
      <circle cx="322" cy="110" r="12" fill="#D6E0FC" />

      {/* Ground Baseline */}
      <line x1="10" y1="156" x2="430" y2="156" stroke="#C5D4F9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
