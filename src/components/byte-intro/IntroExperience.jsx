import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FastForward } from 'lucide-react';
import ByteCharacter from './ByteCharacter';
import ByteDialogue from './ByteDialogue';
import IntroNavigation from './IntroNavigation';
import CinematicTransition from './CinematicTransition';

const DIALOGUE_SEQUENCE = [
  'HEYYYY! Hello, Sir! 👋',
  "I'm BYTE, Anoop's little coding companion! 💻",
  'Welcome to his little corner of the internet! ✨',
  'Let me introduce you to Anoop! 🚀',
  "He's a Computer Science student at KMIT, Hyderabad, passionate about software engineering, AI and building interesting things. 🎓",
  "He's been working on some exciting projects. Want to have a look? 👀",
];

// Pure function to derive character expression states based on dialogue position
function getCharacterExpressions(dialogueIndex, showOptions) {
  if (dialogueIndex === 0) return { eye: 'happy', mouth: 'open', tilt: 4 };
  if (dialogueIndex === 1) return { eye: 'sparkle', mouth: 'talk', tilt: -3 };
  if (dialogueIndex === 2) return { eye: 'happy', mouth: 'smile', tilt: 0 };
  if (dialogueIndex === 3) return { eye: 'curious', mouth: 'talk', tilt: 3 };
  if (dialogueIndex === 4) return { eye: 'normal', mouth: 'talk', tilt: -2 };
  if (dialogueIndex === 5 || showOptions) return { eye: 'sparkle', mouth: 'open', tilt: 4 };
  return { eye: 'normal', mouth: 'smile', tilt: 0 };
}

/**
 * IntroExperience
 * Full-screen pure black cinematic animated introduction featuring a large,
 * visually prominent developer duck named BYTE.
 *
 * Sequence:
 * 0–2s: Pure black screen with subtle terminal blink
 * 2–6s: BYTE enters from left and walks to center (articulated walk cycle & bobbing)
 * 6s+: BYTE stops in center, faces visitor, waves, and reveals progressive dialogue
 * Final: Shows 3 interactive options -> BYTE jumps towards camera -> circular aperture transition to portfolio
 */
export default function IntroExperience({ onCompleteIntro }) {
  // Intro Phases:
  // 'black' (0-2s) | 'walking' (2-6s) | 'arrived' (6s+) | 'jumping' | 'transitioning'
  const [phase, setPhase] = useState('black');
  const [dialogueIndex, setDialogueIndex] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const executeTransition = useCallback((targetSection = null) => {
    clearAllTimers();
    setSelectedSection(targetSection);
    setPhase('jumping');

    // Trigger jump animation
    const tJump = setTimeout(() => {
      setIsTransitioning(true);
    }, 280);

    timersRef.current.push(tJump);
  }, []);

  const handleSkip = useCallback(() => {
    executeTransition(null);
  }, [executeTransition]);

  const handleTransitionComplete = useCallback(() => {
    try {
      sessionStorage.setItem('anoop_byte_intro_played', 'true');
    } catch {}

    onCompleteIntro(selectedSection);
  }, [onCompleteIntro, selectedSection]);

  // Advance dialogue to next line or reveal options
  const handleAdvanceDialogue = useCallback(() => {
    if (dialogueIndex < DIALOGUE_SEQUENCE.length - 1) {
      setDialogueIndex((prev) => {
        const next = prev + 1;
        if (next === DIALOGUE_SEQUENCE.length - 1) {
          setShowOptions(true);
        }
        return next;
      });
    } else {
      setShowOptions(true);
    }
  }, [dialogueIndex]);

  // Handle option selection from the 3 buttons
  const handleSelectOption = useCallback((optionId, targetSection) => {
    setDialogueIndex(-1);
    setShowOptions(false);
    executeTransition(targetSection);
  }, [executeTransition]);

  // Master Intro Timing Orchestration (0–6s+)
  useEffect(() => {
    // At 2.0s: BYTE begins walking in from left
    const tWalk = setTimeout(() => {
      setPhase('walking');
    }, 2000);

    // At 6.0s: BYTE arrives in center, stops, waves, and greets
    const tArrive = setTimeout(() => {
      setPhase('arrived');
      setDialogueIndex(0);
    }, 6000);

    // Auto-advance dialogue steps if user does not manually click
    const tD1 = setTimeout(() => setDialogueIndex(1), 9000);
    const tD2 = setTimeout(() => setDialogueIndex(2), 12200);
    const tD3 = setTimeout(() => setDialogueIndex(3), 15400);
    const tD4 = setTimeout(() => setDialogueIndex(4), 18400);
    const tD5 = setTimeout(() => {
      setDialogueIndex(5);
      setShowOptions(true);
    }, 23000);

    timersRef.current.push(tWalk, tArrive, tD1, tD2, tD3, tD4, tD5);

    return () => clearAllTimers();
  }, []);

  // Keyboard navigation: Escape skips, Space/Enter advances, 1/2/3 selects options
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (!showOptions) {
          handleAdvanceDialogue();
        }
      } else if (showOptions) {
        if (e.key === '1') handleSelectOption('projects', 'projects');
        if (e.key === '2') handleSelectOption('about', 'about');
        if (e.key === '3') handleSelectOption('skills', 'skills');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip, handleAdvanceDialogue, handleSelectOption, showOptions]);

  // Derive reactive character expressions without extra setState in effects
  const { eye: eyeState, mouth: mouthState, tilt: headTilt } = getCharacterExpressions(
    dialogueIndex,
    showOptions
  );

  const isWalking = phase === 'walking';
  const isJumping = phase === 'jumping';
  const isWaving = phase === 'arrived' && (dialogueIndex === 0 || dialogueIndex === 2);
  const isPointing = phase === 'arrived' && (dialogueIndex === 3 || Boolean(hoveredOption));
  const isProud = phase === 'arrived' && dialogueIndex === 1;
  const isLeaning = phase === 'arrived' && (dialogueIndex === 5 || showOptions);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between items-center overflow-hidden select-none">
      {/* ── Subtle Cinematic Letterbox Vignette ── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      {/* ── Top Bar: Skip Introduction Button ── */}
      <div className="relative z-10 w-full px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-amber-400/80 animate-ping" />
          <span className="tracking-widest uppercase">BYTE // Experience</span>
        </div>

        <button
          onClick={handleSkip}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/[0.14] text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
          aria-label="Skip Introduction"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] text-zinc-500 ml-1 hidden sm:inline">(Esc)</span>
        </button>
      </div>

      {/* ── Initial 0–2s Terminal Cursor ── */}
      {phase === 'black' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center font-mono text-zinc-500 text-sm tracking-wider"
        >
          <span>$ byte.init()</span>
          <span className="inline-block w-2 h-4 ml-1.5 bg-amber-400 animate-pulse" />
        </motion.div>
      )}

      {/* ── Upper Region: Animated Dialogue & Interactive Options ── */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end min-h-[160px] sm:min-h-[220px] pb-4">
        <AnimatePresence mode="wait">
          {phase === 'arrived' && dialogueIndex >= 0 && !showOptions && (
            <ByteDialogue
              currentStep={dialogueIndex}
              dialogueList={DIALOGUE_SEQUENCE}
              onAdvance={handleAdvanceDialogue}
              showAdvanceHint={true}
            />
          )}

          {phase === 'arrived' && showOptions && (
            <IntroNavigation
              onSelectOption={handleSelectOption}
              onHoverOption={setHoveredOption}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Lower Region: Floor Horizon & Large BYTE Mascot ── */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end pb-8 sm:pb-12">
        {/* Floor Horizon Line with Ambient Light Halo */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/25 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 h-20 bg-amber-500/[0.04] blur-3xl pointer-events-none" />

        {/* ── THE LARGE DEVELOPER DUCK (BYTE) ── */}
        <motion.div
          initial={{ x: '-60vw', opacity: 0 }}
          animate={
            isWalking
              ? {
                  x: 0,
                  opacity: 1,
                  y: [0, -16, 0, -16, 0, -16, 0],
                }
              : isJumping
              ? {
                  scale: [1, 1.4, 7],
                  y: [0, -45, -140],
                  opacity: [1, 1, 0],
                }
              : phase === 'arrived'
              ? {
                  x: 0,
                  opacity: 1,
                  y: 0,
                }
              : { x: '-60vw', opacity: 0 }
          }
          transition={
            isWalking
              ? {
                  x: { duration: 4.0, ease: [0.25, 0.1, 0.25, 1.0] },
                  y: { duration: 4.0, ease: 'linear' },
                  opacity: { duration: 0.5 },
                }
              : isJumping
              ? {
                  duration: 0.75,
                  ease: [0.76, 0, 0.24, 1],
                }
              : { type: 'spring', damping: 22, stiffness: 260 }
          }
          className="relative flex items-center justify-center cursor-pointer"
          onClick={() => {
            if (phase === 'arrived') {
              handleAdvanceDialogue();
            }
          }}
        >
          {/* Large prominent duck: 30–40% viewport height */}
          <ByteCharacter
            isWalking={isWalking}
            isWaving={isWaving}
            isPointing={isPointing}
            isProud={isProud}
            isLeaning={isLeaning}
            isJumping={isJumping}
            eyeState={eyeState}
            mouthState={mouthState}
            headTilt={headTilt}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[380px] lg:h-[380px]"
          />
        </motion.div>
      </div>

      {/* ── Cinematic Transition Curtain & Portal Aperture ── */}
      <CinematicTransition
        isTransitioning={isTransitioning}
        onTransitionComplete={handleTransitionComplete}
      />
    </div>
  );
}
