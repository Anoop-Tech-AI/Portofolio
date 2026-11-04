import React from "react";

/**
 * Expressive face component for BYTE:
 * - Animated blinking eyes and pupils
 * - Expressive eyebrows
 * - Rosy cartoon cheeks
 * - Iconic pixel sunglasses with lightning reflections
 *
 * @param {boolean} isBlinking - Whether eyes are currently blinking closed
 * @param {string} eyeDirection - 'center' | 'left' | 'right' | 'up'
 * @param {string} expression - 'idle' | 'happy' | 'thinking' | 'excited' | 'sleep' | 'waving'
 * @param {number} glassesOffset - Y offset when BYTE pushes/adjusts shades
 */
export default function ByteFace({
  isBlinking = false,
  eyeDirection = "center",
  expression = "idle",
  glassesOffset = 0,
}) {
  // Eye pupil offset
  const getPupilOffset = () => {
    switch (eyeDirection) {
      case "left":
        return { x: -3, y: 0 };
      case "right":
        return { x: 3, y: 0 };
      case "up":
        return { x: 0, y: -2 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const pupil = getPupilOffset();
  const isAsleep = expression === "sleep";

  return (
    <g id="byte-face-rig">
      {/* ─── Rosy Cheeks ─── */}
      <circle cx="68" cy="88" r="9" fill="#FB7185" opacity="0.35" filter="url(#cheek-blur)" />
      <circle cx="132" cy="88" r="9" fill="#FB7185" opacity="0.35" filter="url(#cheek-blur)" />

      {/* ─── Eyes Group (Under/Behind Sunglasses with high visibility) ─── */}
      <g id="byte-eyes">
        {/* Left Eye */}
        <g id="left-eye" transform="translate(80, 72)">
          {isAsleep || isBlinking ? (
            // Closed/Blinking Arc
            <path
              d="M -9,0 Q 0,7 9,0"
              stroke="#451A03"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Open Eye
            <>
              {/* White Sclera */}
              <ellipse cx="0" cy="0" rx="10" ry="12" fill="#FFFFFF" stroke="#451A03" strokeWidth="1.5" />
              {/* Dark Pupil */}
              <ellipse
                cx={pupil.x}
                cy={pupil.y + 1}
                rx="6"
                ry="7.5"
                fill="#18181B"
              />
              {/* Eye Color Ring (Warm Amber/Honey) */}
              <circle cx={pupil.x} cy={pupil.y + 1} r="4.5" fill="#D97706" opacity="0.75" />
              <circle cx={pupil.x} cy={pupil.y + 1} r="3" fill="#09090B" />
              {/* Sparkle Highlights */}
              <circle cx={pupil.x - 2.5} cy={pupil.y - 2} r="2.2" fill="#FFFFFF" />
              <circle cx={pupil.x + 2} cy={pupil.y + 3} r="1.1" fill="#FFFFFF" />
            </>
          )}
        </g>

        {/* Right Eye */}
        <g id="right-eye" transform="translate(120, 72)">
          {isAsleep || isBlinking ? (
            // Closed/Blinking Arc
            <path
              d="M -9,0 Q 0,7 9,0"
              stroke="#451A03"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Open Eye
            <>
              {/* White Sclera */}
              <ellipse cx="0" cy="0" rx="10" ry="12" fill="#FFFFFF" stroke="#451A03" strokeWidth="1.5" />
              {/* Dark Pupil */}
              <ellipse
                cx={pupil.x}
                cy={pupil.y + 1}
                rx="6"
                ry="7.5"
                fill="#18181B"
              />
              {/* Eye Color Ring */}
              <circle cx={pupil.x} cy={pupil.y + 1} r="4.5" fill="#D97706" opacity="0.75" />
              <circle cx={pupil.x} cy={pupil.y + 1} r="3" fill="#09090B" />
              {/* Sparkle Highlights */}
              <circle cx={pupil.x - 2.5} cy={pupil.y - 2} r="2.2" fill="#FFFFFF" />
              <circle cx={pupil.x + 2} cy={pupil.y + 3} r="1.1" fill="#FFFFFF" />
            </>
          )}
        </g>
      </g>

      {/* ─── Eyebrows ─── */}
      <g id="byte-eyebrows">
        {expression === "thinking" ? (
          <>
            {/* Left eyebrow raised */}
            <path d="M 68,56 Q 78,50 90,56" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Right eyebrow furrowed */}
            <path d="M 110,58 Q 122,62 132,58" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* Confident / happy eyebrows */}
            <path d="M 70,55 Q 80,50 90,54" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <path d="M 110,54 Q 120,50 130,55" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          </>
        )}
      </g>

      {/* ─── Iconic Pixel Sunglasses with Lightning Accents ─── */}
      <g
        id="byte-sunglasses"
        transform={`translate(0, ${glassesOffset})`}
        style={{
          transformOrigin: "100px 72px",
          transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Soft Drop Shadow under frames */}
        <rect x="62" y="62" width="37" height="23" rx="2" fill="#000000" opacity="0.25" />
        <rect x="101" y="62" width="37" height="23" rx="2" fill="#000000" opacity="0.25" />

        {/* Bridge linking lenses */}
        <rect x="94" y="64" width="12" height="6" fill="#18181B" />
        <rect x="96" y="65" width="8" height="2" fill="#3F3F46" />

        {/* Left Lens Frame (Pixel steps) */}
        <path
          d="
            M 62,60
            H 96
            V 82
            H 88
            V 85
            H 72
            V 82
            H 62
            Z
          "
          fill="#09090B"
          stroke="#27272A"
          strokeWidth="1.2"
        />

        {/* Left Lens Lightning Bolt Pixel Highlight */}
        <g id="left-lightning" fill="#FFFFFF">
          {/* Top step */}
          <rect x="74" y="64" width="7" height="4" fill="#FFFFFF" />
          {/* Middle slant */}
          <rect x="71" y="68" width="7" height="4" fill="#FFFFFF" />
          {/* Bottom slant */}
          <rect x="68" y="72" width="6" height="4" fill="#FFFFFF" />
          {/* Accent dot */}
          <rect x="65" y="76" width="4" height="3" fill="#E4E4E7" />
        </g>

        {/* Right Lens Frame (Pixel steps) */}
        <path
          d="
            M 104,60
            H 138
            V 82
            H 128
            V 85
            H 112
            V 82
            H 104
            Z
          "
          fill="#09090B"
          stroke="#27272A"
          strokeWidth="1.2"
        />

        {/* Right Lens Lightning Bolt Pixel Highlight */}
        <g id="right-lightning" fill="#FFFFFF">
          {/* Top step */}
          <rect x="116" y="64" width="7" height="4" fill="#FFFFFF" />
          {/* Middle slant */}
          <rect x="113" y="68" width="7" height="4" fill="#FFFFFF" />
          {/* Bottom slant */}
          <rect x="110" y="72" width="6" height="4" fill="#FFFFFF" />
          {/* Accent dot */}
          <rect x="107" y="76" width="4" height="3" fill="#E4E4E7" />
        </g>

        {/* Sunglasses Temples / Arms */}
        <path d="M 62,65 Q 52,67 48,70" stroke="#18181B" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 138,65 Q 148,67 152,70" stroke="#18181B" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}
