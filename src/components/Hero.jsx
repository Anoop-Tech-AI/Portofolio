import {
  ArrowRight,
  Mail,
  ChevronDown,
  Code2,
  BrainCircuit,
  Binary,
} from "lucide-react";
import { motion } from "motion/react";
import { personalInfo } from "../data/portfolioData";
import InteractiveTerminal from "./InteractiveTerminal";

const lineVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2 + i * 0.12,
    },
  }),
};

const pillVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "backOut", delay: 0.1 },
  },
};

const subtitleVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
  },
};

const descVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.55 } },
};

const btnVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "backOut", delay: 0.65 + i * 0.1 },
  }),
};

const terminalVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const floatVariant = {
  float: {
    y: [0, -6, 0],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const INTEREST_ICONS = [Code2, BrainCircuit, Binary];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-editorial-grid opacity-60 dark:opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[420px] h-[280px] bg-amber-500/[0.06] dark:bg-amber-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[340px] h-[240px] bg-sky-500/[0.04] dark:bg-sky-500/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              variants={pillVariant}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-zinc-700 dark:text-zinc-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>B.Tech CSE • KMIT Hyderabad (2024 – 2028)</span>
            </motion.div>

            <div>
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-700 dark:text-amber-400 font-bold mb-2"
              >
                HELLO, I'M ANOOP
              </motion.p>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] uppercase overflow-hidden">
                <motion.span
                  custom={0}
                  variants={lineVariant}
                  initial="hidden"
                  animate="visible"
                  className="block text-zinc-900 dark:text-zinc-100"
                >
                  I BUILD SOFTWARE.
                </motion.span>
                <motion.span
                  custom={1}
                  variants={lineVariant}
                  initial="hidden"
                  animate="visible"
                  className="block text-amber-600 dark:text-amber-400"
                >
                  I SOLVE PROBLEMS.
                </motion.span>
              </h1>
            </div>

            <motion.div
              variants={subtitleVariant}
              initial="hidden"
              animate="visible"
              className="space-y-0.5 border-l-2 border-amber-500/70 pl-4 py-0.5"
            >
              <p className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200">
                Computer Science &amp; Engineering Student •{" "}
                <span className="text-amber-700 dark:text-amber-300 font-bold">
                  KMIT, Hyderabad
                </span>
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                Undergraduate • Expected Graduation: 2028
              </p>
            </motion.div>

            <motion.p
              variants={descVariant}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-xl"
            >
              {personalInfo.bioIntro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"
            >
              {personalInfo.interests.map((interest, idx) => {
                const Icon = INTEREST_ICONS[idx] || Code2;
                return (
                  <div
                    key={interest.title}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] shadow-xs transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg hover:border-amber-500/50 hover:bg-amber-500/[0.03] cursor-default flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2.5 mb-2.5">
                        {idx === 0 && (
                          <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          </div>
                        )}
                        {idx === 1 && (
                          <div className="w-6 h-6 rotate-45 rounded-[2px] bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0 my-0.5 mx-0.5">
                            <Icon className="w-3 h-3 text-sky-600 dark:text-sky-400 -rotate-45" />
                          </div>
                        )}
                        {idx === 2 && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        )}
                        <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
                          {interest.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {interest.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.div
                custom={0}
                variants={btnVariant}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="#projects"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-[0_4px_16px_rgba(245,158,11,0.28)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.44)] hover:-translate-y-0.5"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              <motion.div
                custom={1}
                variants={btnVariant}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all bg-zinc-100 hover:bg-zinc-200 dark:bg-[#14161d] dark:hover:bg-[#1a1d26] text-zinc-800 dark:text-zinc-200 border border-black/[0.1] dark:border-white/[0.08] hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Contact Me</span>
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={terminalVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 w-full flex justify-center"
          >
            <motion.div
              variants={floatVariant}
              animate="float"
              className="w-full"
            >
              <InteractiveTerminal />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-zinc-600 hidden sm:flex flex-col items-center"
      >
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
