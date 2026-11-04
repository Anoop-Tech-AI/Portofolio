import React from "react";

/**
 * Articulated cartoon duck beak with upper mandible, lower jaw,
 * inner mouth cavity, and tongue that articulates smoothly during speech.
 *
 * @param {number} mouthOpen - Value from 0.0 (closed) to 1.0 (fully open)
 * @param {string} expression - 'smile' | 'talk' | 'excited' | 'sleep'
 */
export default function ByteBeak({ mouthOpen = 0, expression = "talk" }) {
  // Calculate jaw translation and scale based on mouthOpen [0, 1]
  const jawDrop = Math.max(0, Math.min(1, mouthOpen)) * 9;
  const mouthGap = Math.max(0, Math.min(1, mouthOpen)) * 7;

  return (
    <g id="byte-beak-rig">
      {/* ─── Inner Mouth Cavity & Tongue (Visible when beak is open) ─── */}
      {mouthOpen > 0.05 && (
        <g id="inner-mouth" transform={`translate(0, 0)`}>
          {/* Mouth Cavity */}
          <ellipse
            cx="100"
            cy={97 + mouthGap * 0.4}
            rx={14 + mouthOpen * 2}
            ry={3 + mouthGap * 0.9}
            fill="#7F1D1D"
          />
          {/* Tongue */}
          <path
            d={`M 92,${98 + mouthGap * 0.5} Q 100,${95 + mouthGap * 0.2} 108,${98 + mouthGap * 0.5} Q 100,${102 + mouthGap * 0.7} 92,${98 + mouthGap * 0.5} Z`}
            fill="#FB7185"
          />
        </g>
      )}

      {/* ─── Upper Beak Mandible ─── */}
      <g id="upper-beak">
        {/* Shadow under upper beak */}
        <path
          d="M 80,95 Q 100,105 120,95 Q 100,103 80,95 Z"
          fill="#D94E1B"
          opacity="0.8"
        />
        {/* Main upper beak body */}
        <path
          d="M 76,92 Q 100,86 124,92 Q 130,96 122,100 Q 100,105 78,100 Q 70,96 76,92 Z"
          fill="url(#beak-grad-upper)"
          filter="url(#beak-shadow)"
        />
        {/* Upper Beak Highlight / Rim */}
        <path
          d="M 80,91 Q 100,87 120,91"
          stroke="#FFA566"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Nostrils */}
        <circle cx="94" cy="91" r="1" fill="#C2410C" />
        <circle cx="106" cy="91" r="1" fill="#C2410C" />
      </g>

      {/* ─── Lower Beak (Articulated Jaw) ─── */}
      <g
        id="lower-beak"
        transform={`translate(0, ${jawDrop})`}
        style={{
          transformOrigin: "100px 98px",
          transition: "transform 0.08s ease-out",
        }}
      >
        <path
          d="M 84,98 Q 100,108 116,98 Q 112,107 100,108 Q 88,107 84,98 Z"
          fill="url(#beak-grad-lower)"
          stroke="#C2410C"
          strokeWidth="1"
        />
        {/* Soft lower rim highlight */}
        <path
          d="M 88,103 Q 100,107 112,103"
          stroke="#FFA566"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      </g>

      {/* Sleep Expression line (subtle cute snore curl) */}
      {expression === "sleep" && (
        <path
          d="M 88,96 Q 100,99 112,96"
          stroke="#9A3412"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}
