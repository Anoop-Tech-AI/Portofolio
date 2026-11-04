import { motion } from "motion/react";

/**
 * ByteCharacter
 * A large, high-definition 2D developer duck illustration built with clean SVG vectors.
 * Features articulated body parts:
 * - Expressive round head with bobbing feather tuft
 * - Developer glasses with lens gleam
 * - Dynamic eyes (normal, blinking, happy, curious, sparkle)
 * - Animated beak (smile, talk, open)
 * - Modern charcoal developer hoodie with drawstrings & glowing </> code badge
 * - Miniature glowing developer laptop
 * - Articulated wings (walking swing, waving, pointing, proud)
 * - Articulated legs and webbed feet with natural walking tilt & step cycles
 */
export default function ByteCharacter({
  isWalking = false,
  isWaving = false,
  isPointing = false,
  isProud = false,
  isLeaning = false,
  isJumping = false,
  eyeState = "normal", // 'normal' | 'blinking' | 'happy' | 'curious' | 'sparkle'
  mouthState = "smile", // 'smile' | 'talk' | 'open'
  headTilt = 0,
  className = "w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 lg:w-[360px] lg:h-[360px]",
}) {
  const isBlinking = eyeState === "blinking";
  const isHappy = eyeState === "happy";
  const isCurious = eyeState === "curious";
  const isSparkle = eyeState === "sparkle";

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 240 260"
        className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="BYTE — The Large Developer Duck"
      >
        <defs>
          {/* Duck Body Gradients */}
          <linearGradient
            id="byteYellowBody"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fff385" />
            <stop offset="35%" stopColor="#fdd835" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient
            id="byteYellowHead"
            x1="20%"
            y1="0%"
            x2="80%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fff7a1" />
            <stop offset="40%" stopColor="#fde047" />
            <stop offset="90%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Duck Bill / Feet Orange Gradients */}
          <linearGradient id="byteOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>

          <linearGradient
            id="byteOrangeHighlight"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>

          {/* Modern Slate/Charcoal Developer Hoodie */}
          <linearGradient
            id="byteHoodieGrad"
            x1="10%"
            y1="0%"
            x2="90%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#374151" />
            <stop offset="40%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>

          {/* Glowing Laptop Screen */}
          <linearGradient
            id="byteScreenGlow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Soft Ground Contact Shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* ── Ground Shadow (scales down on jump/step) ── */}
        <motion.ellipse
          cx="120"
          cy="246"
          rx={isJumping ? 36 : isWalking ? 60 : 68}
          ry={isJumping ? 5 : isWalking ? 9 : 11}
          fill="url(#groundShadow)"
          animate={
            isWalking
              ? { rx: [68, 54, 68], opacity: [0.65, 0.45, 0.65] }
              : isJumping
                ? { rx: 30, opacity: 0.15 }
                : { rx: 68, opacity: 0.65 }
          }
          transition={{
            duration: 0.45,
            repeat: isWalking ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* ── Backpack (Seen behind duck shoulders) ── */}
        <g id="byte-backpack">
          <rect
            x="58"
            y="132"
            width="124"
            height="66"
            rx="20"
            fill="#0b0f19"
            stroke="#1f2937"
            strokeWidth="2.5"
          />
          {/* Top Carry Handle */}
          <path
            d="M 96 132 C 96 118, 144 118, 144 132"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </g>

        {/* ── Feet & Legs (Articulated for walking) ── */}
        <g id="byte-legs">
          {/* Left Leg & Foot */}
          <g
            style={{
              transformOrigin: "82px 224px",
              transition: "transform 0.18s ease-out",
            }}
            className={isWalking ? "animate-duck-foot-left" : ""}
          >
            {/* Leg bone */}
            <rect
              x="80"
              y="210"
              width="8"
              height="24"
              rx="4"
              fill="url(#byteOrange)"
              stroke="#9a3412"
              strokeWidth="1"
            />
            {/* Left Webbed Foot */}
            <path
              d="M 68 238 C 64 238, 52 248, 56 253 C 66 255, 96 255, 102 249 C 98 243, 86 238, 68 238 Z"
              fill="url(#byteOrange)"
              stroke="#9a3412"
              strokeWidth="1.8"
            />
            {/* Foot web creases */}
            <path
              d="M 68 244 L 64 252"
              stroke="#ea580c"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 84 244 L 84 253"
              stroke="#ea580c"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Right Leg & Foot */}
          <g
            style={{
              transformOrigin: "158px 224px",
              transition: "transform 0.18s ease-out",
            }}
            className={isWalking ? "animate-duck-foot-right" : ""}
          >
            {/* Leg bone */}
            <rect
              x="152"
              y="210"
              width="8"
              height="24"
              rx="4"
              fill="url(#byteOrange)"
              stroke="#9a3412"
              strokeWidth="1"
            />
            {/* Right Webbed Foot */}
            <path
              d="M 172 238 C 176 238, 188 248, 184 253 C 174 255, 144 255, 138 249 C 142 243, 154 238, 172 238 Z"
              fill="url(#byteOrange)"
              stroke="#9a3412"
              strokeWidth="1.8"
            />
            {/* Foot web creases */}
            <path
              d="M 172 244 L 176 252"
              stroke="#ea580c"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 156 244 L 156 253"
              stroke="#ea580c"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ── Torso & Developer Hoodie ── */}
        <g
          id="byte-torso"
          style={{
            transformOrigin: "120px 222px",
            transform: isLeaning ? "rotate(-3.5deg) translateY(2px)" : "none",
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Main Hoodie Body */}
          <path
            d="M 62 222 C 58 152, 78 132, 120 132 C 162 132, 182 152, 178 222 C 160 227, 80 227, 62 222 Z"
            fill="url(#byteHoodieGrad)"
            stroke="#0b0f19"
            strokeWidth="3"
          />

          {/* Kangaroo Pocket */}
          <path
            d="M 84 186 C 84 176, 156 176, 156 186 L 164 212 C 144 216, 96 216, 76 212 Z"
            fill="#161e2e"
            stroke="#374151"
            strokeWidth="1.8"
          />
          {/* Pocket Hem Detail */}
          <path
            d="M 84 186 L 76 212"
            stroke="#4b5563"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 156 186 L 164 212"
            stroke="#4b5563"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Hoodie Collar / Neck V-Line */}
          <path
            d="M 94 132 Q 120 152 146 132"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Amber Drawstrings */}
          <path
            d="M 108 144 L 108 168"
            stroke="#f59e0b"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="108" cy="170" r="2.2" fill="#d97706" />

          <path
            d="M 132 144 L 132 168"
            stroke="#f59e0b"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="132" cy="170" r="2.2" fill="#d97706" />

          {/* Chest Developer Insignia: Glowing </ > */}
          <g transform="translate(120, 160)">
            <rect
              x="-24"
              y="-10"
              width="48"
              height="20"
              rx="6"
              fill="#0f172a"
              stroke="#f59e0b"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x="0"
              y="4.5"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="900"
              letterSpacing="1"
            >
              &lt;/&gt;
            </text>
          </g>
        </g>

        {/* ── Left Wing with Mini Laptop (Positioned naturally in front/cradled) ── */}
        <g id="byte-left-wing-laptop">
          {/* Arm / Sleeve */}
          <path
            d="M 64 150 Q 52 186 86 196"
            fill="none"
            stroke="#1f2937"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Feather Wing Tip holding laptop */}
          <ellipse
            cx="88"
            cy="196"
            rx="8"
            ry="7"
            fill="url(#byteYellowBody)"
            stroke="#ca8a04"
            strokeWidth="1.5"
          />

          {/* Miniature Developer Laptop */}
          <g transform="translate(86, 174) rotate(-8)">
            {/* Base / Keyboard chassis */}
            <rect
              x="0"
              y="24"
              width="62"
              height="8"
              rx="2"
              fill="#475569"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            <rect x="24" y="25" width="14" height="4" rx="1" fill="#94a3b8" />

            {/* Laptop Screen Display Lid */}
            <rect
              x="4"
              y="0"
              width="54"
              height="26"
              rx="3"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.8"
            />
            <rect
              x="7"
              y="3"
              width="48"
              height="20"
              rx="2"
              fill="url(#byteScreenGlow)"
            />

            {/* Glowing Code Lines on Screen */}
            <line
              x1="11"
              y1="8"
              x2="26"
              y2="8"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <line
              x1="29"
              y1="8"
              x2="42"
              y2="8"
              stroke="#fde047"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <line
              x1="11"
              y1="13"
              x2="36"
              y2="13"
              stroke="#a7f3d0"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <line
              x1="11"
              y1="18"
              x2="22"
              y2="18"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <line
              x1="25"
              y1="18"
              x2="48"
              y2="18"
              stroke="#fed7aa"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>
        </g>

        {/* ── HEAD GROUP (Articulated with headTilt & nods) ── */}
        <g
          id="byte-head"
          style={{
            transformOrigin: "120px 95px",
            transform: `rotate(${headTilt}deg)`,
            transition: "transform 0.25s ease-out",
          }}
        >
          {/* Feather Tuft at top */}
          <path
            d="M 118 22 Q 106 6 116 2 Q 124 10 120 22 Z"
            fill="url(#byteYellowHead)"
            stroke="#ca8a04"
            strokeWidth="1.2"
          />
          <path
            d="M 124 24 Q 136 10 142 8 Q 138 18 126 24 Z"
            fill="#eab308"
            stroke="#ca8a04"
            strokeWidth="1.2"
          />

          {/* Main Round Duck Head */}
          <ellipse
            cx="120"
            cy="78"
            rx="54"
            ry="50"
            fill="url(#byteYellowHead)"
            stroke="#ca8a04"
            strokeWidth="3"
          />

          {/* Rosy Peach Cheeks */}
          <circle cx="82" cy="94" r="8.5" fill="#fca5a5" opacity="0.65" />
          <circle cx="158" cy="94" r="8.5" fill="#fca5a5" opacity="0.65" />

          {/* Developer Glasses */}
          <g id="byte-glasses" stroke="#111827" strokeWidth="3.2" fill="none">
            {/* Left Frame */}
            <circle cx="94" cy="74" r="18" />
            <ellipse
              cx="94"
              cy="74"
              rx="18"
              ry="18"
              fill="rgba(56, 189, 248, 0.12)"
            />
            {/* Left Glass Specular Glint */}
            <path
              d="M 84 62 L 96 74"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Right Frame */}
            <circle cx="146" cy="74" r="18" />
            <ellipse
              cx="146"
              cy="74"
              rx="18"
              ry="18"
              fill="rgba(56, 189, 248, 0.12)"
            />
            {/* Right Glass Specular Glint */}
            <path
              d="M 136 62 L 148 74"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Bridge */}
            <line x1="112" y1="74" x2="128" y2="74" strokeWidth="3.5" />

            {/* Temple arms going back */}
            <line x1="76" y1="74" x2="68" y2="72" strokeWidth="3" />
            <line x1="164" y1="74" x2="172" y2="72" strokeWidth="3" />
          </g>

          {/* ── Expressive Eyes ── */}
          <g id="byte-eyes">
            {isBlinking ? (
              // Blinking / Closed Eyes
              <>
                <path
                  d="M 84 76 Q 94 84 104 76"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 76 Q 146 84 156 76"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </>
            ) : isHappy ? (
              // Happy Joyful Arches ^ ^
              <>
                <path
                  d="M 84 77 Q 94 67 104 77"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 77 Q 146 67 156 77"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                />
              </>
            ) : isCurious ? (
              // Curious / Looking to side
              <>
                <ellipse cx="98" cy="74" rx="6.5" ry="7" fill="#0f172a" />
                <circle cx="100.5" cy="71.5" r="2.4" fill="#ffffff" />
                <ellipse cx="150" cy="74" rx="6.5" ry="7" fill="#0f172a" />
                <circle cx="152.5" cy="71.5" r="2.4" fill="#ffffff" />
              </>
            ) : isSparkle ? (
              // Big Excited Anime Sparkle Eyes
              <>
                <ellipse cx="94" cy="74" rx="7.5" ry="8" fill="#0f172a" />
                <circle cx="97" cy="71" r="3.2" fill="#ffffff" />
                <circle cx="91" cy="77" r="1.5" fill="#ffffff" />

                <ellipse cx="146" cy="74" rx="7.5" ry="8" fill="#0f172a" />
                <circle cx="149" cy="71" r="3.2" fill="#ffffff" />
                <circle cx="143" cy="77" r="1.5" fill="#ffffff" />
              </>
            ) : (
              // Standard Bright Eyes with Catchlight
              <>
                <ellipse cx="94" cy="74" rx="7" ry="7.5" fill="#0f172a" />
                <circle cx="96.5" cy="71.5" r="2.8" fill="#ffffff" />
                <circle cx="91.5" cy="76" r="1.2" fill="#ffffff" />

                <ellipse cx="146" cy="74" rx="7" ry="7.5" fill="#0f172a" />
                <circle cx="148.5" cy="71.5" r="2.8" fill="#ffffff" />
                <circle cx="143.5" cy="76" r="1.2" fill="#ffffff" />
              </>
            )}
          </g>

          {/* ── Duck Beak / Bill ── */}
          <g id="byte-beak">
            {/* Upper Bill Base */}
            <path
              d="M 92 88 C 92 84, 102 80, 120 80 C 138 80, 148 84, 148 88 C 150 105, 140 114, 120 114 C 100 114, 90 105, 92 88 Z"
              fill="url(#byteOrange)"
              stroke="#9a3412"
              strokeWidth="2.4"
            />
            {/* Bill Highlight on Top Ridge */}
            <path
              d="M 104 84 Q 120 82 136 84"
              fill="none"
              stroke="url(#byteOrangeHighlight)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Nostrils */}
            <circle cx="114" cy="86" r="1.4" fill="#9a3412" />
            <circle cx="126" cy="86" r="1.4" fill="#9a3412" />

            {/* Mouth Curve (Animated according to speech) */}
            {mouthState === "open" || mouthState === "talk" ? (
              // Open cheerful talking beak with tongue
              <g>
                <path
                  d="M 100 96 Q 120 118 140 96 Z"
                  fill="#7f1d1d"
                  stroke="#9a3412"
                  strokeWidth="1.8"
                />
                <path
                  d="M 108 106 Q 120 98 132 106 Q 120 116 108 106 Z"
                  fill="#f87171"
                />
              </g>
            ) : (
              // Cheerful warm smile crease
              <path
                d="M 98 94 Q 120 103 142 94"
                fill="none"
                stroke="#7c2d12"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            )}
          </g>
        </g>

        {/* ── RIGHT WING (Animated: Waving, Pointing, Walking, or Resting) ── */}
        <g id="byte-right-wing">
          {isPointing ? (
            // Pointing wing extending outward toward dialogue or buttons
            <g
              style={{
                transformOrigin: "172px 148px",
                transform: "rotate(-42deg) translate(8px, -12px)",
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Arm Sleeve */}
              <path
                d="M 172 148 Q 206 138 232 118"
                fill="none"
                stroke="#1f2937"
                strokeWidth="15"
                strokeLinecap="round"
              />
              {/* Hand / Feather Tip Pointing */}
              <ellipse
                cx="232"
                cy="116"
                rx="9"
                ry="8"
                fill="url(#byteYellowBody)"
                stroke="#ca8a04"
                strokeWidth="1.8"
              />
              <path
                d="M 234 112 L 244 104"
                stroke="#ca8a04"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ) : isWaving ? (
            // Energetic, joyful waving wing!
            <g
              className="animate-mascot-wave"
              style={{
                transformOrigin: "172px 148px",
              }}
            >
              {/* Raised arm sleeve */}
              <path
                d="M 172 148 Q 198 134 214 104"
                fill="none"
                stroke="#1f2937"
                strokeWidth="15"
                strokeLinecap="round"
              />
              {/* Waving feather hand */}
              <ellipse
                cx="216"
                cy="100"
                rx="10"
                ry="8"
                fill="url(#byteYellowBody)"
                stroke="#ca8a04"
                strokeWidth="1.8"
              />
              {/* Friendly waving feather tips */}
              <path
                d="M 220 94 L 226 86"
                stroke="#ca8a04"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 214 92 L 216 82"
                stroke="#ca8a04"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          ) : isProud ? (
            // Hands on hips / confident pose
            <g
              style={{
                transformOrigin: "172px 148px",
                transform: "rotate(18deg)",
              }}
            >
              <path
                d="M 172 148 Q 194 172 176 196"
                fill="none"
                stroke="#1f2937"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <ellipse
                cx="174"
                cy="196"
                rx="8"
                ry="7"
                fill="url(#byteYellowBody)"
                stroke="#ca8a04"
                strokeWidth="1.5"
              />
            </g>
          ) : isWalking ? (
            // Walking arm pendulum swing
            <g
              className="animate-duck-wing-swing"
              style={{ transformOrigin: "172px 148px" }}
            >
              <path
                d="M 172 148 Q 186 172 176 200"
                fill="none"
                stroke="#1f2937"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <ellipse
                cx="176"
                cy="200"
                rx="8"
                ry="7"
                fill="url(#byteYellowBody)"
                stroke="#ca8a04"
                strokeWidth="1.5"
              />
            </g>
          ) : (
            // Resting comfortably by side
            <g
              style={{
                transformOrigin: "172px 148px",
                transition: "transform 0.25s ease",
              }}
            >
              <path
                d="M 172 148 Q 188 174 178 202"
                fill="none"
                stroke="#1f2937"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <ellipse
                cx="178"
                cy="202"
                rx="8"
                ry="7"
                fill="url(#byteYellowBody)"
                stroke="#ca8a04"
                strokeWidth="1.5"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
