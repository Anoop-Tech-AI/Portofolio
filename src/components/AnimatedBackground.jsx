import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useAnimations';

export default function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Subtle moving editorial grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-50" />

      {/* 2. Ambient shifting orbs (GPU-accelerated transforms) */}
      {!shouldReduceMotion ? (
        <>
          {/* Amber primary warm glow - slow organic drift */}
          <motion.div
            className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-amber-500/[0.035] blur-[140px]"
            animate={{
              x: [0, 45, 0],
              y: [0, -35, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Sky secondary cool glow - counter-drifting */}
          <motion.div
            className="absolute top-2/3 -right-24 w-[600px] h-[600px] rounded-full bg-sky-500/[0.025] blur-[160px]"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Deep center ambient warmth */}
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-amber-600/[0.02] blur-[150px]"
            animate={{
              x: [0, -30, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-amber-500/[0.03] blur-[140px]" />
          <div className="absolute top-2/3 -right-24 w-[600px] h-[600px] rounded-full bg-sky-500/[0.02] blur-[160px]" />
        </>
      )}

      {/* 3. Subtle editorial geometric markings (crosshairs / grid points) */}
      <div className="absolute top-20 right-12 text-white/[0.04] font-mono text-[10px] select-none hidden lg:block">
        + 17.3850° N, 78.4867° E // HYD
      </div>
      <div className="absolute bottom-16 left-8 text-white/[0.03] font-mono text-[10px] select-none hidden lg:block">
        + ARCH_SYS_2028
      </div>

      {/* 4. Fine noise texture overlay */}
      <div className="absolute inset-0 noise-overlay opacity-25" />
    </div>
  );
}
