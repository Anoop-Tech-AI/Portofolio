import React from "react";

/**
 * Articulated legs and webbed duck feet for BYTE:
 * - Hips pivots for leg swings in walk cycle
 * - Knee flex for jump squash/stretch
 * - Webbed feet with toe lobes and highlights
 *
 * @param {number} leftLegAngle - Rotation angle for left leg (-25 to +25 deg)
 * @param {number} rightLegAngle - Rotation angle for right leg (-25 to +25 deg)
 * @param {number} legSquash - Vertical compression [0 to 1] for crouching before jumps
 */
export default function ByteLegs({
  leftLegAngle = 0,
  rightLegAngle = 0,
  legSquash = 0,
}) {
  const squashScaleY = 1 - legSquash * 0.35;
  const squashOffsetY = legSquash * 6;

  return (
    <g id="byte-legs-rig">
      {/* ─── Left Leg & Foot ─── */}
      <g
        id="left-leg-joint"
        style={{
          transformOrigin: "84px 172px",
          transform: `translate(0px, ${squashOffsetY}px) scaleY(${squashScaleY}) rotate(${leftLegAngle}deg)`,
          transition: "transform 0.12s linear",
        }}
      >
        {/* Left Leg Upper Segment */}
        <rect
          x="80"
          y="170"
          width="8"
          height="18"
          rx="4"
          fill="url(#foot-grad)"
          stroke="#C2410C"
          strokeWidth="1"
        />

        {/* Left Webbed Foot */}
        <g id="left-foot" transform="translate(84, 186)">
          {/* Foot Base */}
          <path
            d="
              M -14,2
              C -16,4 -10,7 -4,8
              C 0,8.5 6,8.5 12,7
              C 15,6.5 17,4 15,2
              C 12,0.5 4,0 -2,0
              Z
            "
            fill="url(#foot-grad)"
            stroke="#C2410C"
            strokeWidth="1.2"
          />
          {/* Toe webbing indentations */}
          <path
            d="M -7,2 Q -4,7 -1,2"
            stroke="#9A3412"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 2,2 Q 5,7 8,2"
            stroke="#9A3412"
            strokeWidth="1"
            fill="none"
          />
          {/* Highlight along upper foot ridge */}
          <path
            d="M -10,2 Q 0,4.5 10,2"
            stroke="#FFA566"
            strokeWidth="1"
            fill="none"
            opacity="0.75"
          />
        </g>
      </g>

      {/* ─── Right Leg & Foot ─── */}
      <g
        id="right-leg-joint"
        style={{
          transformOrigin: "116px 172px",
          transform: `translate(0px, ${squashOffsetY}px) scaleY(${squashScaleY}) rotate(${rightLegAngle}deg)`,
          transition: "transform 0.12s linear",
        }}
      >
        {/* Right Leg Upper Segment */}
        <rect
          x="112"
          y="170"
          width="8"
          height="18"
          rx="4"
          fill="url(#foot-grad)"
          stroke="#C2410C"
          strokeWidth="1"
        />

        {/* Right Webbed Foot */}
        <g id="right-foot" transform="translate(116, 186)">
          {/* Foot Base */}
          <path
            d="
              M -14,2
              C -16,4 -10,7 -4,8
              C 0,8.5 6,8.5 12,7
              C 15,6.5 17,4 15,2
              C 12,0.5 4,0 -2,0
              Z
            "
            fill="url(#foot-grad)"
            stroke="#C2410C"
            strokeWidth="1.2"
          />
          {/* Toe webbing indentations */}
          <path
            d="M -7,2 Q -4,7 -1,2"
            stroke="#9A3412"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 2,2 Q 5,7 8,2"
            stroke="#9A3412"
            strokeWidth="1"
            fill="none"
          />
          {/* Highlight along upper foot ridge */}
          <path
            d="M -10,2 Q 0,4.5 10,2"
            stroke="#FFA566"
            strokeWidth="1"
            fill="none"
            opacity="0.75"
          />
        </g>
      </g>
    </g>
  );
}
