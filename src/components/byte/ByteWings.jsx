import React from "react";

/**
 * Articulated wings for BYTE:
 * - Left wing with shoulder pivot
 * - Right wing with shoulder pivot for waving, pointing, celebrating, typing
 *
 * @param {string} state - 'idle' | 'walking' | 'waving' | 'pointing' | 'jumping' | 'celebrating' | 'sleeping' | 'talking' | 'typing'
 * @param {number} rightWingAngle - Dynamic angle for right wing
 * @param {number} leftWingAngle - Dynamic angle for left wing
 */
export default function ByteWings({
  state = "idle",
  rightWingAngle = 0,
  leftWingAngle = 0,
}) {
  const isWaving = state === "waving";
  const isCelebrating = state === "celebrating";
  const isPointing = state === "pointing";
  const isTyping = state === "typing";

  return (
    <g id="byte-wings-rig">
      {/* ─── Left Wing (Attached at left shoulder x=64, y=125) ─── */}
      <g
        id="left-wing-joint"
        style={{
          transformOrigin: "64px 125px",
          transform: `rotate(${leftWingAngle}deg)`,
          transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.4, 1)",
        }}
      >
        {isCelebrating ? (
          // Celebrating: Left wing raised high into the air
          <g>
            <path
              d="M 64,124 C 44,110 32,85 36,68 C 42,62 52,70 56,82 C 62,96 66,112 64,124 Z"
              fill="url(#wing-grad-left)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            {/* Feather tips */}
            <path d="M 40,78 Q 48,72 52,82" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </g>
        ) : isTyping ? (
          // Typing: Wing forward over keyboard
          <g>
            <path
              d="M 64,124 C 60,135 68,155 78,162 C 84,164 88,158 84,150 C 78,142 70,132 64,124 Z"
              fill="url(#wing-grad-left)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
          </g>
        ) : (
          // Natural resting/sway wing
          <g>
            <path
              d="M 64,125 C 46,132 38,155 46,168 C 50,172 58,168 64,158 Z"
              fill="#D97706"
              opacity="0.25"
            />
            <path
              d="M 64,124 C 44,128 34,148 40,165 C 44,174 52,176 58,166 C 63,158 66,145 66,128 Z"
              fill="url(#wing-grad-left)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            <path
              d="M 44,155 C 48,162 54,163 56,155"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 40,143 C 45,150 51,150 54,143"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </g>

      {/* ─── Right Wing (Attached at right shoulder x=136, y=125) ─── */}
      <g
        id="right-wing-joint"
        style={{
          transformOrigin: isWaving ? "138px 125px" : "136px 125px",
          transform: `rotate(${rightWingAngle}deg)`,
          transition: "transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1)",
        }}
      >
        {isWaving ? (
          // Waving: Raised high right wing matching reference sheet!
          <g>
            {/* Wing body extending upward with playful wave curves */}
            <path
              d="
                M 136,124
                C 148,110 162,94 168,76
                C 172,66 164,62 154,68
                C 146,74 140,90 134,106
                Z
              "
              fill="url(#wing-grad-right)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            {/* Articulated wing tip feathers waving */}
            <path
              d="M 166,74 Q 172,70 168,64 Q 158,68 156,76"
              fill="#FDE047"
              stroke="#B45309"
              strokeWidth="1"
            />
            <path
              d="M 158,80 C 163,84 168,82 165,76"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : isCelebrating ? (
          // Celebrating: Right wing raised high
          <g>
            <path
              d="M 136,124 C 156,110 168,85 164,68 C 158,62 148,70 144,82 C 138,96 134,112 136,124 Z"
              fill="url(#wing-grad-right)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            <path d="M 160,78 Q 152,72 148,82" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </g>
        ) : isPointing ? (
          // Pointing: Outstretched toward portfolio content
          <g>
            <path
              d="M 136,124 C 155,115 178,110 192,104 C 196,102 195,108 188,114 C 176,124 158,136 138,132 Z"
              fill="url(#wing-grad-right)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            <path
              d="M 185,106 Q 194,103 192,107"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : isTyping ? (
          // Typing: Wing forward over keyboard
          <g>
            <path
              d="M 136,124 C 140,135 132,155 122,162 C 116,164 112,158 116,150 C 122,142 130,132 136,124 Z"
              fill="url(#wing-grad-right)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
          </g>
        ) : (
          // Resting / walking / idle
          <g>
            <path
              d="M 136,125 C 154,132 162,155 154,168 C 150,172 142,168 136,158 Z"
              fill="#D97706"
              opacity="0.25"
            />
            <path
              d="M 136,124 C 156,128 166,148 160,165 C 156,174 148,176 142,166 C 137,158 134,145 134,128 Z"
              fill="url(#wing-grad-right)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            <path
              d="M 156,155 C 152,162 146,163 144,155"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 160,143 C 155,150 149,150 146,143"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </g>
    </g>
  );
}
