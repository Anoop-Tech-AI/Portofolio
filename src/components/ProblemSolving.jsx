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
        {/* Editorial Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              05 // COMPUTATIONAL RIGOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Problem Solving & DSA
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            Mathematical abstractions, asymptotic bounds, and competitive coding
            in modern C++.
          </p>
        </motion.div>

        {/* 4 Pillars Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {problemSolvingData.pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              custom={0.1 + idx * 0.08}
              whileHover={{ y: -3, borderColor: "rgba(245,158,11,0.4)" }}
              className="p-5 rounded-xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] transition-all flex flex-col justify-between group shadow-sm dark:shadow-lg"
            >
              <div>
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-[#0e1015] border border-black/[0.06] dark:border-white/[0.06] w-fit mb-3.5 group-hover:border-amber-500/40 transition-colors">
                  {getPillarIcon(pillar.icon)}
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Algorithmic Methodology Workflow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#111319] border border-black/[0.08] dark:border-white/[0.06] mb-12 shadow-sm dark:shadow-xl"
        >
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-6 font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Disciplined Problem Solving Protocol</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemSolvingData.approachSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.35, delay: 0.15 + idx * 0.09 }}
                className="space-y-2 border-l border-black/[0.08] dark:border-white/[0.06] pl-4"
              >
                <span className="text-xl font-bold font-mono text-zinc-400 dark:text-zinc-600 block">
                  {step.step}
                </span>
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

        {/* Coding Platform Profiles / Placeholders */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="p-6 rounded-xl bg-zinc-50 dark:bg-[#0f1116] border border-black/[0.08] dark:border-white/[0.06]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-black/[0.06] dark:border-white/[0.05]">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-700 dark:text-zinc-400 font-bold">
              Computational Profiles & Challenge Tracks
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              Continuous Practice • C++ Standard Template Library
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
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-4 rounded-xl bg-white dark:bg-[#14161f] border border-black/[0.08] dark:border-white/[0.06] hover:border-amber-500/50 hover:bg-zinc-50 dark:hover:bg-[#181b26] transition-all text-left group shadow-xs cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors font-mono">
                    {platform.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 block mb-2 font-mono">
                  {platform.status}
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono inline-block px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-[#0c0d12] border border-black/[0.06] dark:border-white/[0.05]">
                  {platform.focus}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
