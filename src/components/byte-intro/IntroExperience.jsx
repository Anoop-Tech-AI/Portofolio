import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FastForward, Volume2, VolumeX } from "lucide-react";
import ByteCartoonCharacter from "./ByteCartoonCharacter";
import LaptopHologram from "./LaptopHologram";
import CinematicTransition from "./CinematicTransition";
import { byteAudio } from "../../utils/byteAudio";

// The exact dialogue sequence from the storyboard
const STORYBOARD_SCRIPT = [
  { text: "HEYYYY! Hello, Sir!", mode: "waving", sfx: "wave" },
  {
    text: "I'm BYTE, Anoop's little coding companion!",
    mode: "cool",
    sfx: null,
  },
  {
    text: "Welcome to his little corner of the internet!",
    mode: "waving",
    sfx: null,
  },
  { text: "Let me introduce you to Anoop!", mode: "pointing", sfx: null },
  {
    text: "He's a Computer Science student at KMIT, Hyderabad.",
    mode: "cool",
    sfx: null,
  },
  {
    text: "He's passionate about software engineering, Artificial Intelligence and building interesting things.",
    mode: "excited",
    sfx: null,
  },
  {
    text: "He's exploring Agentic AI, RAG, full-stack development and problem-solving.",
    mode: "pointing",
    sfx: null,
  },
  { text: "Ready? Let's explore!", mode: "typing", sfx: "laptop" },
];

/**
 * IntroExperience
 * Full-screen cinematic cartoon introduction inspired by Tom & Jerry character animation:
 * - Scene 1: Black screen startup with terminal cursor
 * - Scene 2: Authentic 10-frame cartoon walk cycle across the screen with footstep audio
 * - Scene 3: Settle, sunglass adjust, wave & energetic spoken greeting
 * - Scene 4: Expressive cartoon acting while introducing Anoop
 * - Scene 5: Physical laptop interaction with glowing developer hologram preview
 * - Scene 6: Anticipation squash & stretch, powerful cartoon laptop dive towards the camera
 * - Scene 7: Dual-energy shockwave burst and seamless warm white portfolio reveal
 */
export default function IntroExperience({ onCompleteIntro }) {
  const [scene, setScene] = useState("scene1_startup");
  const [dialogueIndex, setDialogueIndex] = useState(-1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteractedSound, setHasInteractedSound] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [subtitleText, setSubtitleText] = useState("");

  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Execute the signature cartoon laptop dive sequence
  const executeLaptopDive = useCallback(() => {
    clearAllTimers();
    byteAudio.cancelSpeech();
    setIsSpeaking(false);
    setSubtitleText("");

    // Step 1: Anticipation squash & step back
    setScene("scene6_anticipation");
    byteAudio.playJumpAnticipation();

    // Step 2: Powerful leap towards camera with the laptop
    const tDive = setTimeout(() => {
      setScene("scene6_dive");
      byteAudio.playDiveWhoosh();
    }, 450);

    // Step 3: Impact shockwave & energy burst
    const tBurst = setTimeout(() => {
      byteAudio.playImpactBurst();
      setIsTransitioning(true);
    }, 1100);

    timersRef.current.push(tDive, tBurst);
  }, []);

  const handleSkip = useCallback(() => {
    clearAllTimers();
    byteAudio.cancelSpeech();
    setIsTransitioning(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    try {
      sessionStorage.setItem("anoop_byte_intro_played", "true");
    } catch {}
    onCompleteIntro();
  }, [onCompleteIntro]);

  const toggleSound = () => {
    byteAudio.unlockAudio();
    const newMuted = byteAudio.toggleMute();
    setIsMuted(newMuted);
    setHasInteractedSound(true);
  };

  const playDialogueStepRef = useRef(null);

  // Speak a dialogue step with synchronized beak bobbing and subtitles
  const playDialogueStep = useCallback(
    (index) => {
      if (index >= STORYBOARD_SCRIPT.length) {
        executeLaptopDive();
        return;
      }

      const item = STORYBOARD_SCRIPT[index];
      setDialogueIndex(index);
      setSubtitleText(item.text);

      if (item.sfx === "wave") byteAudio.playWaveSound();
      if (item.sfx === "laptop") {
        byteAudio.playLaptopOpen();
        byteAudio.playTyping();
      }

      // Trigger voice with synchronized beak bobbing
      byteAudio.speak(
        item.text,
        () => setIsSpeaking(true),
        () => {
          setIsSpeaking(false);
          // After line finishes, auto-advance with natural cartoon pause
          const nextTimer = setTimeout(
            () => {
              if (index === STORYBOARD_SCRIPT.length - 1) {
                executeLaptopDive();
              } else if (playDialogueStepRef.current) {
                playDialogueStepRef.current(index + 1);
              }
            },
            index === STORYBOARD_SCRIPT.length - 1 ? 1000 : 500,
          );
          timersRef.current.push(nextTimer);
        },
      );
    },
    [executeLaptopDive],
  );

  useEffect(() => {
    playDialogueStepRef.current = playDialogueStep;
  }, [playDialogueStep]);

  // Master Intro Timing Pipeline (0s -> 1.5s -> 5.3s -> sunglasses adjust -> dialogue)
  useEffect(() => {
    // Warm up voice
    byteAudio.initVoice();

    // Scene 2: Authentic 10-frame cartoon walk across the screen (1.5s - 5.3s)
    const tWalk = setTimeout(() => {
      setScene("scene2_walk");
    }, 1500);

    // Scene 3: Arrives at center (5.3s), settles & adjusts sunglasses
    const tArrive = setTimeout(() => {
      setScene("scene3_dialogue");
      setDialogueIndex(-1); // Cool sunglass adjust pose on arrival
      byteAudio.playWaveSound();
    }, 5300);

    // After sunglass adjust, wave and begin speaking (6.2s)
    const tGreet = setTimeout(() => {
      if (playDialogueStepRef.current) {
        playDialogueStepRef.current(0);
      }
    }, 6200);

    timersRef.current.push(tWalk, tArrive, tGreet);

    return () => {
      clearAllTimers();
      byteAudio.cancelSpeech();
    };
  }, []);

  // Keyboard navigation: Escape skips, Space/Enter advances dialogue, M toggles mute
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleSkip();
      } else if (e.key === " " || e.key === "Enter") {
        byteAudio.unlockAudio();
        setHasInteractedSound(true);
        if (scene === "scene3_dialogue") {
          byteAudio.cancelSpeech();
          playDialogueStep(dialogueIndex + 1);
        }
      } else if (e.key === "m" || e.key === "M") {
        toggleSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip, scene, dialogueIndex, playDialogueStep]);

  // Click on screen to unlock audio if browser blocked initial autoplay
  const handleScreenClick = () => {
    if (!hasInteractedSound) {
      byteAudio.unlockAudio();
      setHasInteractedSound(true);
    }
  };

  // Determine character mode based on current scene & script
  let currentCharacterMode = "cool";
  if (scene === "scene1_startup") {
    currentCharacterMode = "idle";
  } else if (scene === "scene2_walk") {
    currentCharacterMode = "walk";
  } else if (scene === "scene6_anticipation" || scene === "scene6_dive") {
    currentCharacterMode = "hero_dive";
  } else if (scene === "scene3_dialogue") {
    if (dialogueIndex >= 0 && dialogueIndex < STORYBOARD_SCRIPT.length) {
      currentCharacterMode = STORYBOARD_SCRIPT[dialogueIndex].mode;
    } else {
      currentCharacterMode = "cool";
    }
  }

  const isAnticipating = scene === "scene6_anticipation";
  const isJumping = scene === "scene6_dive";

  return (
    <div
      onClick={handleScreenClick}
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between items-center overflow-hidden select-none"
    >
      {/* ── Top Bar: Audio Controls & Skip Intro ── */}
      <div className="relative z-50 w-full px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="tracking-widest uppercase font-semibold">
              BYTE // CINEMATIC
            </span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
              isMuted
                ? "bg-zinc-800/80 text-zinc-400 border-zinc-700"
                : "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            }`}
            aria-label="Toggle Audio"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            )}
            <span>{isMuted ? "Muted" : "Sound On"}</span>
          </button>
        </div>

        {/* Skip Intro */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/[0.14] text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
          aria-label="Skip Introduction"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] text-zinc-500 ml-0.5">(Esc)</span>
        </button>
      </div>

      {/* ── First-interaction Audio Unlock Notice (Auto-dismisses on click) ── */}
      <AnimatePresence>
        {!hasInteractedSound && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 z-50 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center space-x-2 backdrop-blur-md shadow-lg pointer-events-none"
          >
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
            <span>Click anywhere to enable BYTE's cartoon voice!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scene 1: Terminal Startup Sequence (0s - 1.5s) ── */}
      {scene === "scene1_startup" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center font-mono text-zinc-400 text-sm tracking-wider"
        >
          <span>$ byte.init()</span>
          <span className="inline-block w-2 h-4 ml-2 bg-amber-400 animate-pulse" />
        </motion.div>
      )}

      {/* ── Scene 5: Floating Laptop Hologram Interface ── */}
      <AnimatePresence>
        {dialogueIndex === 7 && scene === "scene3_dialogue" && (
          <LaptopHologram />
        )}
      </AnimatePresence>

      {/* ── Upper Region: Cinematic Subtitles ── */}
      <div className="relative z-40 w-full flex flex-col items-center justify-end min-h-[120px] px-4 pb-2">
        <AnimatePresence mode="wait">
          {subtitleText && (
            <motion.div
              key={subtitleText}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", damping: 24, stiffness: 350 }}
              className="relative max-w-xl text-center px-6 py-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
            >
              <p className="text-base sm:text-xl font-bold tracking-tight text-white leading-snug">
                "{subtitleText}"
              </p>
              <div className="mt-1 flex items-center justify-center space-x-1 text-[10px] font-mono text-zinc-400">
                <span>Press Space or click to advance</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lower Region: Ground Horizon & Character Staging ── */}
      <div className="relative z-30 w-full flex flex-col items-center justify-end pb-8 sm:pb-12">
        {/* Subtle floor contact glow */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent pointer-events-none" />

        {/* ── THE CARTOON CHARACTER CONTAINER ── */}
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={
            scene === "scene1_startup"
              ? {
                  x: "-100vw",
                  opacity: 0,
                  scale: 1,
                  y: 0,
                }
              : scene === "scene2_walk"
                ? {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      x: { duration: 3.8, ease: [0.25, 0.1, 0.25, 1.0] },
                      opacity: { duration: 0.3 },
                    },
                  }
                : scene === "scene6_anticipation"
                  ? {
                      x: -30,
                      opacity: 1,
                      scale: 0.95,
                      transition: { duration: 0.4, ease: "easeInOut" },
                    }
                  : scene === "scene6_dive"
                    ? {
                        scale: [1, 1.5, 4.5, 14],
                        y: [0, -35, 40, 180],
                        opacity: [1, 1, 0.9, 0],
                        filter: [
                          "blur(0px)",
                          "blur(1px)",
                          "blur(4px)",
                          "blur(14px)",
                        ],
                        transition: {
                          duration: 0.85,
                          ease: [0.76, 0, 0.24, 1],
                        },
                      }
                    : {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          damping: 22,
                          stiffness: 280,
                        },
                      }
          }
          className="relative flex items-center justify-center cursor-pointer"
          onClick={() => {
            if (scene === "scene3_dialogue") {
              byteAudio.unlockAudio();
              byteAudio.cancelSpeech();
              playDialogueStep(dialogueIndex + 1);
            }
          }}
        >
          <ByteCartoonCharacter
            mode={currentCharacterMode}
            isSpeaking={isSpeaking}
            isAnticipating={isAnticipating}
            isJumping={isJumping}
            className="w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 lg:w-[380px] lg:h-[380px]"
            showShadow={!isJumping && scene !== "scene1_startup"}
          />
        </motion.div>
      </div>

      {/* ── Cinematic Energy Burst Shockwave Transition into Portfolio ── */}
      <CinematicTransition
        isTransitioning={isTransitioning}
        onTransitionComplete={handleTransitionComplete}
      />
    </div>
  );
}
