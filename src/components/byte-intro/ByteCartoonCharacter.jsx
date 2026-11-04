import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BYTE_ASSETS } from '../../data/byteAssets';
import { byteAudio } from '../../utils/byteAudio';

export default function ByteCartoonCharacter({
  mode = 'idle',
  isSpeaking = false,
  isAnticipating = false,
  isJumping = false,
  className = 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
  showShadow = true,
}) {
  const [walkFrame, setWalkFrame] = useState(0);
  const [mouthOpen, setMouthOpen] = useState(false);
  const lastFootstepRef = useRef(0);

  useEffect(() => {
    if (mode !== 'walk') return;

    const interval = setInterval(() => {
      setWalkFrame((prev) => {
        const next = (prev + 1) % BYTE_ASSETS.walkCycle.length;
        if (next === 0 || next === 5) {
          const now = Date.now();
          if (now - lastFootstepRef.current > 180) {
            byteAudio.playFootstep();
            lastFootstepRef.current = now;
          }
        }
        return next;
      });
    }, 85);

    return () => clearInterval(interval);
  }, [mode]);

  useEffect(() => {
    if (!isSpeaking) return;

    const mouthInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 130);

    return () => {
      clearInterval(mouthInterval);
      setMouthOpen(false);
    };
  }, [isSpeaking]);

  let currentSrc = BYTE_ASSETS.poses.cool;

  if (mode === 'walk') {
    currentSrc = BYTE_ASSETS.walkCycle[walkFrame];
  } else if (mode === 'waving') {
    currentSrc = BYTE_ASSETS.poses.waving;
  } else if (mode === 'pointing') {
    currentSrc = BYTE_ASSETS.poses.pointing;
  } else if (mode === 'excited') {
    currentSrc = BYTE_ASSETS.poses.excited;
  } else if (mode === 'typing') {
    currentSrc = BYTE_ASSETS.poses.typing;
  } else if (mode === 'thinking' || mode === 'idle') {
    currentSrc = BYTE_ASSETS.poses.thinking;
  } else if (mode === 'cool') {
    currentSrc = BYTE_ASSETS.poses.cool;
  } else if (mode === 'celebrating') {
    currentSrc = BYTE_ASSETS.poses.celebrating;
  } else if (mode === 'hero_dive') {
    currentSrc = BYTE_ASSETS.hero;
  } else if (mode === 'sleeping') {
    currentSrc = BYTE_ASSETS.poses.sleeping;
  }

  const isWalking = mode === 'walk';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {showShadow && (
        <motion.div
          animate={
            isJumping
              ? { scaleX: 0.25, scaleY: 0.25, opacity: 0.1 }
              : isAnticipating
              ? { scaleX: 1.35, scaleY: 1.2, opacity: 0.75 }
              : isWalking
              ? {
                  scaleX: walkFrame % 2 === 0 ? 1.08 : 0.92,
                  scaleY: walkFrame % 2 === 0 ? 0.92 : 1.08,
                  opacity: 0.65,
                }
              : { scaleX: 1.0, scaleY: 1.0, opacity: 0.6 }
          }
          transition={{ duration: 0.12 }}
          className="absolute -bottom-4 w-3/5 h-6 bg-black/60 dark:bg-black/80 rounded-full blur-[7px] pointer-events-none"
        />
      )}

      <motion.div
        animate={
          isAnticipating
            ? {
                scaleX: 1.25,
                scaleY: 0.72,
                y: 18,
                rotate: -2,
              }
            : isJumping
            ? {
                scaleX: 0.92,
                scaleY: 1.15,
                y: -14,
                rotate: 3,
              }
            : isWalking
            ? {
                y: walkFrame % 2 === 0 ? -4 : 0,
                rotate: walkFrame % 2 === 0 ? -1.5 : 1.5,
              }
            : isSpeaking
            ? {
                y: mouthOpen ? -4 : 0,
                scaleY: mouthOpen ? 1.03 : 0.98,
                rotate: mouthOpen ? 1 : -1,
                transition: { duration: 0.1 },
              }
            : mode === 'waving'
            ? {
                y: [0, -3, 0],
                rotate: [0, 2, 0, -2, 0],
                transition: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
              }
            : mode === 'excited'
            ? {
                y: [0, -8, 0],
                transition: { repeat: Infinity, duration: 0.6, ease: 'easeOut' },
              }
            : {
                y: 0,
                rotate: 0,
              }
        }
        transition={
          isWalking || isAnticipating || isJumping
            ? { duration: 0.1, ease: 'linear' }
            : isSpeaking
            ? { duration: 0.1 }
            : { type: 'spring', damping: 20, stiffness: 280 }
        }
        className="relative w-full h-full flex items-center justify-center"
      >
        <img
          src={currentSrc}
          alt="BYTE Cartoon Mascot"
          className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] pointer-events-none"
          draggable={false}
        />

        {mode === 'thinking' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6], y: [-2, -8, -2], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="absolute -top-3 right-8 text-2xl font-black text-amber-400 font-mono drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]"
          >
            ?
          </motion.div>
        )}

        {mode === 'sleeping' && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-5, -24], x: [0, 12] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="absolute -top-6 right-10 text-lg font-bold text-sky-400 font-mono tracking-widest drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          >
            z z Z
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
