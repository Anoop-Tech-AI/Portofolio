import React from "react";
import ByteFace from "./ByteFace";
import ByteBeak from "./ByteBeak";
import ByteWings from "./ByteWings";
import ByteLegs from "./ByteLegs";

/**
 * Master 2D Articulated Cartoon Rig for BYTE.
 * Connects all independently articulated joints, layers, transforms,
 * squash-and-stretch, and accessories.
 */
export default function ByteRig({
  // Global transforms & squash/stretch
  bodyY = 0,
  bodyScaleX = 1,
  bodyScaleY = 1,
  bodyTilt = 0,
  shadowScale = 1,
  shadowOpacity = 0.35,

  // Head articulation
  headY = 0,
  headTilt = 0,
  glassesOffset = 0,

  // Facial state
  isBlinking = false,
  eyeDirection = "center",
  expression = "idle",
  mouthOpen = 0,

  // Wing angles
  leftWingAngle = 0,
  rightWingAngle = 0,

  // Leg articulation
  leftLegAngle = 0,
  rightLegAngle = 0,
  legSquash = 0,

  // Accessories
  showLaptop = false,
  laptopTyping = false,
}) {
  return (
    <svg
      viewBox="0 0 200 220"
      className="w-full h-full select-none overflow-visible"
      style={{ filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.15))" }}
      aria-label="BYTE Cartoon Mascot"
    >
      <defs>
        {/* Feathers Gradient */}
        <radialGradient id="feather-grad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="60%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F57F17" />
        </radialGradient>

        {/* Head Gradient */}
        <radialGradient id="head-grad" cx="42%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="55%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F57F17" />
        </radialGradient>

        {/* Beak Upper Gradient */}
        <linearGradient id="beak-grad-upper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8A65" />
          <stop offset="45%" stopColor="#FF7043" />
          <stop offset="100%" stopColor="#E64A19" />
        </linearGradient>

        {/* Beak Lower Gradient */}
        <linearGradient id="beak-grad-lower" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF7043" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>

        {/* Webbed Feet Gradient */}
        <linearGradient id="foot-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8A65" />
          <stop offset="100%" stopColor="#E64A19" />
        </linearGradient>

        {/* Left Wing Gradient */}
        <linearGradient id="wing-grad-left" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="50%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F57F17" />
        </linearGradient>

        {/* Right Wing Gradient */}
        <linearGradient id="wing-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="50%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F57F17" />
        </linearGradient>

        {/* Hoodie Gradient */}
        <linearGradient id="hoodie-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2D35" />
          <stop offset="60%" stopColor="#1E2026" />
          <stop offset="100%" stopColor="#14151A" />
        </linearGradient>

        {/* Backpack Gradient */}
        <linearGradient id="backpack-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* Soft Cheek Blur Filter */}
        <filter id="cheek-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>

        {/* Beak Drop Shadow */}
        <filter id="beak-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#B45309" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* ─── 1. Ground Drop Shadow (Scales with jump and crouch) ─── */}
      <ellipse
        cx="100"
        cy="198"
        rx={46 * shadowScale}
        ry={9 * shadowScale}
        fill="#000000"
        opacity={shadowOpacity}
        style={{ transition: "all 0.12s linear" }}
      />

      {/* ─── 2. Articulated Legs and Feet ─── */}
      <ByteLegs
        leftLegAngle={leftLegAngle}
        rightLegAngle={rightLegAngle}
        legSquash={legSquash}
      />

      {/* ─── 3. Main Articulated Torso, Head, and Accessories Container ─── */}
      <g
        id="byte-upper-rig"
        style={{
          transformOrigin: "100px 185px",
          transform: `translate(0px, ${bodyY}px) scale(${bodyScaleX}, ${bodyScaleY}) rotate(${bodyTilt}deg)`,
          transition: "transform 0.08s linear",
        }}
      >
        {/* ─── Developer Backpack (Sticks out on left side) ─── */}
        <g id="byte-backpack">
          <rect
            x="48"
            y="118"
            width="20"
            height="36"
            rx="8"
            fill="url(#backpack-grad)"
            stroke="#78350F"
            strokeWidth="1.2"
          />
          {/* Backpack Pocket */}
          <rect
            x="49"
            y="132"
            width="15"
            height="18"
            rx="4"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="1"
          />
          {/* Zipper accent */}
          <line x1="51" y1="130" x2="62" y2="130" stroke="#FDE68A" strokeWidth="1.5" />
        </g>

        {/* ─── Developer Hoodie (Body / Torso) ─── */}
        <g id="byte-torso">
          {/* Base Torso Fabric */}
          <path
            d="
              M 66,120
              C 62,142 66,170 76,176
              C 84,180 116,180 124,176
              C 134,170 138,142 134,120
              C 125,115 110,118 100,118
              C 90,118 75,115 66,120
              Z
            "
            fill="url(#hoodie-grad)"
            stroke="#121316"
            strokeWidth="1.5"
          />

          {/* Kangaroo Pouch Pocket */}
          <path
            d="
              M 76,146
              C 84,144 116,144 124,146
              L 126,166
              C 118,170 82,170 74,166
              Z
            "
            fill="#18191E"
            stroke="#262830"
            strokeWidth="1"
          />
          {/* Pocket side slits */}
          <path d="M 76,146 L 79,162" stroke="#374151" strokeWidth="1.2" />
          <path d="M 124,146 L 121,162" stroke="#374151" strokeWidth="1.2" />

          {/* Hoodie Drawstrings */}
          <path d="M 92,122 Q 91,136 90,144" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="90" cy="144" r="1.5" fill="#D97706" />

          <path d="M 108,122 Q 109,136 110,144" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="110" cy="144" r="1.5" fill="#D97706" />

          {/* ─── Glowing Developer `</>` Logo ─── */}
          <g id="byte-code-logo" transform="translate(100, 134)">
            {/* Soft Glow */}
            <circle cx="0" cy="0" r="10" fill="#F59E0B" opacity="0.12" />
            <text
              x="0"
              y="4.5"
              textAnchor="middle"
              fill="#F59E0B"
              fontSize="12"
              fontWeight="900"
              fontFamily="monospace"
              style={{ letterSpacing: "-1px" }}
            >
              &lt;/&gt;
            </text>
          </g>
        </g>

        {/* ─── Headphones Around Neck ─── */}
        <g id="byte-headphones">
          {/* Headband wrapping behind/around neck */}
          <path
            d="M 64,112 C 75,124 125,124 136,112"
            stroke="#374151"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Headband inner cushion accent */}
          <path
            d="M 70,113 C 80,121 120,121 130,113"
            stroke="#1F2937"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Earcup */}
          <g transform="translate(62, 110) rotate(-18)">
            <rect x="-7" y="-10" width="14" height="20" rx="6" fill="#1F2937" stroke="#111827" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="4.5" fill="#F59E0B" />
            <circle cx="0" cy="0" r="2.2" fill="#111827" />
          </g>

          {/* Right Earcup */}
          <g transform="translate(138, 110) rotate(18)">
            <rect x="-7" y="-10" width="14" height="20" rx="6" fill="#1F2937" stroke="#111827" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="4.5" fill="#F59E0B" />
            <circle cx="0" cy="0" r="2.2" fill="#111827" />
          </g>
        </g>

        {/* ─── 4. Articulated Head & Face Group ─── */}
        <g
          id="byte-head-joint"
          style={{
            transformOrigin: "100px 115px",
            transform: `translate(0px, ${headY}px) rotate(${headTilt}deg)`,
            transition: "transform 0.08s linear",
          }}
        >
          {/* Feather tuft on top of head (Cute little feather crown) */}
          <path
            d="M 96,36 C 94,22 104,18 102,12 C 108,18 108,28 102,36 Z"
            fill="#FFF176"
            stroke="#F57F17"
            strokeWidth="1"
          />
          <path
            d="M 100,36 C 104,24 112,22 114,16 C 114,24 110,32 105,36 Z"
            fill="#FBC02D"
            stroke="#F57F17"
            strokeWidth="1"
          />

          {/* Main Cartoon Head Shape */}
          <ellipse
            cx="100"
            cy="76"
            rx="42"
            ry="40"
            fill="url(#head-grad)"
            stroke="#D97706"
            strokeWidth="1.5"
          />

          {/* Cheek highlights */}
          <path
            d="M 68,64 C 64,74 65,86 70,92"
            stroke="#FFF9C4"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Face, Blinking Eyes, Eyebrows & Pixel Sunglasses */}
          <ByteFace
            isBlinking={isBlinking}
            eyeDirection={eyeDirection}
            expression={expression}
            glassesOffset={glassesOffset}
          />

          {/* Articulated Beak with Upper & Lower Mandible */}
          <ByteBeak mouthOpen={mouthOpen} expression={expression} />
        </g>

        {/* ─── 5. Articulated Wings (Left & Right) ─── */}
        <ByteWings
          state={expression}
          rightWingAngle={rightWingAngle}
          leftWingAngle={leftWingAngle}
        />

        {/* ─── 6. Separate Laptop Accessory (Shown when typing or demoing) ─── */}
        {showLaptop && (
          <g
            id="byte-laptop"
            transform={`translate(68, ${laptopTyping ? 143.5 : 142})`}
            style={{ transition: "opacity 0.2s ease" }}
          >
            {/* Laptop Base */}
            <polygon points="0,24 64,24 56,32 8,32" fill="#18191E" stroke="#374151" strokeWidth="1" />
            {/* Keyboard glow */}
            <polygon points="12,25 52,25 48,30 16,30" fill="#38BDF8" opacity="0.3" />

            {/* Laptop Screen Lid */}
            <polygon points="4,24 14,0 50,0 60,24" fill="#09090B" stroke="#374151" strokeWidth="1.2" />
            {/* Glowing Screen display */}
            <polygon points="8,22 17,3 47,3 56,22" fill="#0F172A" />

            {/* Code lines on screen */}
            <line x1="18" y1="7" x2="32" y2="7" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="11" x2="40" y2="11" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="15" x2="28" y2="15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="19" x2="44" y2="19" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* ─── 7. Floating Animated ZZZ's for Sleeping State ─── */}
        {expression === "sleep" && (
          <g id="byte-sleep-zzz">
            <text x="142" y="55" fill="#38BDF8" fontSize="14" fontWeight="bold" opacity="0.85">
              Z
              <animate attributeName="y" values="55;42;55" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2s" repeatCount="indefinite" />
            </text>
            <text x="156" y="42" fill="#818CF8" fontSize="18" fontWeight="bold" opacity="0.9">
              Z
              <animate attributeName="y" values="42;26;42" dur="2s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.4s" repeatCount="indefinite" />
            </text>
            <text x="172" y="28" fill="#C084FC" fontSize="22" fontWeight="bold">
              Z
              <animate attributeName="y" values="28;10;28" dur="2s" begin="0.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.8s" repeatCount="indefinite" />
            </text>
          </g>
        )}
      </g>
    </svg>
  );
}
