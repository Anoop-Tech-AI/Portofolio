import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useAnimations";

export default function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-editorial-grid opacity-75 dark:opacity-50" />

      {!shouldReduceMotion ? (
        <>
          <motion.div
            className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-amber-500/[0.045] dark:bg-amber-500/[0.035] blur-[140px]"
            animate={{
              x: [0, 45, 0],
              y: [0, -35, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-2/3 -right-24 w-[600px] h-[600px] rounded-full bg-sky-500/[0.035] dark:bg-sky-500/[0.025] blur-[160px]"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-amber-600/[0.03] dark:bg-amber-600/[0.02] blur-[150px]"
            animate={{
              x: [0, -30, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-amber-500/[0.04] dark:bg-amber-500/[0.03] blur-[140px]" />
          <div className="absolute top-2/3 -right-24 w-[600px] h-[600px] rounded-full bg-sky-500/[0.03] dark:bg-sky-500/[0.02] blur-[160px]" />
        </>
      )}

      <div className="absolute top-20 right-12 text-zinc-900/[0.08] dark:text-white/[0.04] font-mono text-[10px] select-none hidden lg:block tracking-widest">
        + 17.3850° N, 78.4867° E
      </div>
      <div className="absolute bottom-16 left-8 text-zinc-900/[0.07] dark:text-white/[0.03] font-mono text-[10px] select-none hidden lg:block tracking-widest">
        + CSE_KMIT_CLASS_2028
      </div>

      <div className="absolute inset-0 noise-overlay opacity-25 dark:opacity-30" />
    </div>
  );
}
