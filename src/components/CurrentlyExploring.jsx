import { motion } from "motion/react";
import { currentlyExploring } from "../data/portfolioData";
import { fadeUp, VIEW } from "../hooks/useAnimations";

export default function CurrentlyExploring() {
  return (
    <section
      id="exploring"
      className="py-20 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06] bg-transparent dark:bg-[#090a0d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-10 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              ACTIVE FRONTIERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Currently Exploring
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            Architectures, algorithms, and models under ongoing exploration and
            research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentlyExploring.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              custom={0.1 + idx * 0.08}
              whileHover={{ y: -3, borderColor: "rgba(245,158,11,0.4)" }}
              className="p-5 rounded-xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 font-medium">
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors font-mono">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Active Track</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
