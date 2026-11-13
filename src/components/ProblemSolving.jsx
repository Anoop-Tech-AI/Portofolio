import {
  Binary,
  Cpu,
  Terminal,
  Target,
  Code2,
  ExternalLink,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { problemSolvingData } from "../data/portfolioData";
import { fadeUp, VIEW } from "../hooks/useAnimations";

export default function ProblemSolving() {
  const getPillarIcon = (icon) => {
    switch (icon) {
      case "Cpu":
        return <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case "Terminal":
        return (
          <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        );
      case "Binary":
        return <Binary className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case "Target":
        return <Target className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      default:
        return <Code2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
    }
  };

  return (
    <section
      id="problem-solving"
      className="py-24 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              05
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Problem Solving &amp; DSA
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            Algorithms, data structures, and competitive programming foundations in C++.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {problemSolvingData.pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              custom={0.1 + idx * 0.08}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] flex flex-col justify-between shadow-sm dark:shadow-lg"
            >
              <div>
                {idx % 2 === 0 ? (
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-4">
                    {getPillarIcon(pillar.icon)}
                  </div>
                ) : (
                  <div className="w-8 h-8 rotate-45 rounded-[3px] bg-sky-500/10 border border-sky-500/25 flex items-center justify-center mb-4 my-1 mx-1">
                    <span className="-rotate-45">
                      {getPillarIcon(pillar.icon)}
                    </span>
                  </div>
                )}
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 tracking-tight font-sans">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#111319] border border-black/[0.08] dark:border-white/[0.06] mb-12 shadow-sm dark:shadow-xl"
        >
          <div className="flex items-center space-x-2.5 text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-6 font-bold">
            <span className="w-2 h-2 rotate-45 bg-amber-500" />
            <span>Problem Solving Workflow</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemSolvingData.approachSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.35, delay: 0.15 + idx * 0.09 }}
                className="space-y-2.5 border-l border-black/[0.08] dark:border-white/[0.06] pl-4"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                  {step.step}
                </div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="p-7 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-[#0f1116] border border-black/[0.08] dark:border-white/[0.06]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-black/[0.06] dark:border-white/[0.05]">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-700 dark:text-zinc-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Coding Platforms &amp; Practice</span>
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              C++ Standard Template Library • Ongoing Practice
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problemSolvingData.platforms.map((platform, idx) => (
              <motion.a
                key={platform.name}
                href={platform.placeholder}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.35, delay: 0.1 + idx * 0.07 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#14161f] border border-black/[0.08] dark:border-white/[0.06] text-left shadow-xs cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rotate-45 bg-amber-500/70" />
                    <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                      {platform.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 block mb-3 font-mono">
                  {platform.status}
                </span>
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-[#0c0d12] border border-black/[0.06] dark:border-white/[0.05]">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span>{platform.focus}</span>
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
