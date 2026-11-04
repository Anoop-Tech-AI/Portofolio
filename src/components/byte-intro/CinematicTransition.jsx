import { motion } from 'motion/react';

/**
 * CinematicTransition
 * Coordinates the full-screen cinematic transition when BYTE jumps towards the camera:
 * - Expanding circular aperture reveal uncovering the underlying warm white portfolio
 * - Radial ambient light burst
 * - Particle sparkle dispersion
 */
export default function CinematicTransition({ isTransitioning, onTransitionComplete }) {
  if (!isTransitioning) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onTransitionComplete}
      className="fixed inset-0 z-[120] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* Expanding Iris Mask: Radial Aperture Reveal */}
      <motion.div
        initial={{
          clipPath: 'circle(0% at 50% 55%)',
        }}
        animate={{
          clipPath: 'circle(150% at 50% 55%)',
        }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-transparent"
      />

      {/* Warm Amber Energy Burst radiating outward */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.8, 3.2], opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-96 h-96 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 blur-[80px]"
      />

      {/* Bright Central Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-white"
      />
    </motion.div>
  );
}

