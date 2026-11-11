import ThreeBackground from "./ThreeBackground";

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <ThreeBackground />

      <div className="absolute inset-0 bg-editorial-grid opacity-50 dark:opacity-30" />

      <div className="absolute top-20 right-12 text-zinc-900/[0.08] dark:text-white/[0.04] font-mono text-[10px] select-none hidden lg:block tracking-widest">
        + 17.3850° N, 78.4867° E
      </div>
      <div className="absolute bottom-16 left-8 text-zinc-900/[0.07] dark:text-white/[0.03] font-mono text-[10px] select-none hidden lg:block tracking-widest">
        + CSE_KMIT_CLASS_2028
      </div>

      <div className="absolute inset-0 noise-overlay opacity-20 dark:opacity-25" />
    </div>
  );
}
