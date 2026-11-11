import { motion } from "motion/react";
import { developmentTimeline } from "../data/portfolioData";
import { fadeUp, VIEW } from "../hooks/useAnimations";

export default function Timeline() {
  return (
    <section
      id="journey"
      className="py-24 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06] bg-transparent dark:bg-[#0a0b0e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-16 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              02
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              My Development Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            The progression of technical foundations, system architectures, and intelligent software engineering.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-amber-500/50 via-black/[0.1] dark:via-white/[0.1] to-transparent -translate-x-1/2"
          />

          <div className="space-y-12 sm:space-y-16">
            {developmentTimeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={VIEW}
                    transition={{
                      duration: 0.35,
                      delay: 0.15 + index * 0.08,
                      ease: "backOut",
                    }}
                    className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10"
                  >
                    {isEven ? (
                      <div className="w-9 h-9 rounded-full bg-white dark:bg-[#13151c] border-2 border-amber-500/70 flex items-center justify-center text-amber-500 shadow-md dark:shadow-[0_0_14px_rgba(245,158,11,0.3)]">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rotate-45 rounded-[3px] bg-white dark:bg-[#13151c] border-2 border-amber-500/70 flex items-center justify-center text-amber-500 shadow-md dark:shadow-[0_0_14px_rgba(245,158,11,0.3)]">
                        <span className="w-2.5 h-2.5 -rotate-45 bg-amber-500 rounded-[1px]" />
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 28 : -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEW}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full"
                  >
                    <motion.div
                      whileHover={{
                        y: -5,
                        borderColor: "rgba(245,158,11,0.5)",
                      }}
                      className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] transition-all duration-300 shadow-sm dark:shadow-xl hover:shadow-2xl group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.04]">
                        <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rotate-45 bg-amber-500" />
                          <span>{item.year}</span>
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                          {item.status}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1 mb-3">
                        {item.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-3 border-t border-black/[0.06] dark:border-white/[0.04]">
                        {item.skillsGained.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ y: -1, scale: 1.05 }}
                            className="text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-100 dark:bg-[#0b0c10] text-zinc-700 dark:text-zinc-400 border border-black/[0.06] dark:border-white/[0.05] cursor-default transition-all hover:border-amber-500/40 hover:text-amber-800 dark:hover:text-amber-300"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
