import { motion } from "motion/react";

export default function CinematicTransition({
  isTransitioning,
  onTransitionComplete,
}) {
  if (!isTransitioning) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onTransitionComplete}
      className="fixed inset-0 z-[120] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <motion.div
        animate={{
          x: [-12, 12, -8, 8, -4, 4, 0],
          y: [-8, 8, -5, 5, -2, 2, 0],
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.1, opacity: 0, borderWidth: "24px" }}
        animate={{
          scale: [0.1, 1.5, 3.2],
          opacity: [0, 1, 0],
          borderWidth: ["24px", "8px", "1px"],
        }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-[500px] h-[500px] rounded-full border-cyan-400 shadow-[0_0_80px_rgba(6,182,212,0.9),inset_0_0_60px_rgba(245,158,11,0.8)] pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.6, 2.8], opacity: [0, 0.95, 0] }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-[420px] h-[420px] rounded-full bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-500 blur-[70px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute inset-0 bg-white pointer-events-none"
      />
    </motion.div>
  );
}
