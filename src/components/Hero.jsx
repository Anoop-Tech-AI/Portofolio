import { ArrowRight, Download, Mail, ChevronDown, Code2, BrainCircuit, Binary } from 'lucide-react';
import { motion } from 'motion/react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import InteractiveTerminal from './InteractiveTerminal';

/* ─── Animation variants ─── */
const HEADLINE_LINES = [
  { text: 'I BUILD SOFTWARE.', color: 'text-zinc-900 dark:text-zinc-100' },
  { text: 'I EXPLORE INTELLIGENCE.', color: 'text-amber-600 dark:text-amber-400' },
  { text: 'I SOLVE PROBLEMS.', color: 'text-zinc-500 dark:text-zinc-500' },
];

const lineVariant = {
  hidden: { opacity: 0, y: 32, skewX: -2 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    skewX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.14 },
  }),
};

const pillVariant = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'backOut', delay: 0.1 + i * 0.08 },
  }),
};

const subtitleVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.75 } },
};

const descVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.88 } },
};

const btnVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'backOut', delay: 1.0 + i * 0.1 },
  }),
};

const socialVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 1.38 } },
};

const terminalVariant = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};

const floatVariant = {
  float: {
    y: [0, -8, 0],
    transition: { duration: 5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
  },
};

const INTEREST_ICONS = [Code2, BrainCircuit, Binary];

export default function Hero({ onOpenResume }) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 dark:opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[480px] h-[320px] bg-amber-500/[0.06] dark:bg-amber-500/[0.05] rounded-full blur-[130px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 w-[380px] h-[280px] bg-sky-500/[0.04] dark:bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ── LEFT COLUMN: High-Impact Personal Identity ── */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { text: 'KMIT, Hyderabad (Class of 2028)', dot: true },
                { text: 'Seeking Software & AI Internships', accent: true },
              ].map((pill, i) => (
                <motion.div
                  key={pill.text}
                  custom={i}
                  variants={pillVariant}
                  initial="hidden"
                  animate="visible"
                  className={
                    pill.accent
                      ? 'inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 dark:border-amber-500/20 text-xs font-mono text-amber-800 dark:text-amber-300 font-medium'
                      : 'inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-zinc-700 dark:text-zinc-300'
                  }
                >
                  {pill.dot && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block animate-pulse" />
                  )}
                  <span>{pill.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Name & Headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-700 dark:text-amber-400 font-bold mb-3"
              >
                HELLO, I'M ANOOP.
              </motion.p>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.08] uppercase overflow-hidden">
                {HEADLINE_LINES.map((line, i) => (
                  <motion.span
                    key={line.text}
                    className={`block ${line.color}`}
                    custom={i}
                    variants={lineVariant}
                    initial="hidden"
                    animate="visible"
                  >
                    {line.text}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Professional Identity Subtitle */}
            <motion.div
              variants={subtitleVariant}
              initial="hidden"
              animate="visible"
              className="space-y-1 border-l-2 border-amber-500/70 pl-4 py-0.5"
            >
              <p className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200">
                Computer Science &amp; Engineering Student •{' '}
                <span className="text-amber-700 dark:text-amber-300 font-bold">KMIT, Hyderabad</span>
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                B.Tech CSE • Expected Graduation: 2028
              </p>
            </motion.div>

            {/* Strong Single Introduction */}
            <motion.p
              variants={descVariant}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-xl"
            >
              {personalInfo.bioIntro}
            </motion.p>

            {/* 3 Core Professional Interests */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1"
            >
              {personalInfo.interests.map((interest, idx) => {
                const Icon = INTEREST_ICONS[idx] || Code2;
                return (
                  <div
                    key={interest.title}
                    className="p-3 rounded-xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] shadow-xs hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-1 text-xs font-mono font-bold text-zinc-900 dark:text-white">
                      <Icon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{interest.title}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                      {interest.desc}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {[
                {
                  type: 'link',
                  href: '#projects',
                  label: 'Explore My Work',
                  icon: <ArrowRight className="w-3.5 h-3.5" />,
                  cls: 'bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-[0_4px_16px_rgba(245,158,11,0.28)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.44)]',
                },
                {
                  type: 'button',
                  label: 'Download Resume',
                  icon: <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
                  cls: 'bg-white hover:bg-zinc-100 dark:bg-[#14161d] dark:hover:bg-[#1a1d26] text-zinc-800 dark:text-zinc-200 border border-black/[0.1] dark:border-white/[0.08] hover:border-black/[0.2] dark:hover:border-white/[0.18]',
                  onClick: onOpenResume,
                },
                {
                  type: 'link',
                  href: '#contact',
                  label: 'Contact Me',
                  icon: <Mail className="w-3.5 h-3.5" />,
                  cls: 'bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent',
                },
              ].map((btn, i) => (
                <motion.div
                  key={btn.label}
                  custom={i}
                  variants={btnVariant}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {btn.type === 'link' ? (
                    <a
                      href={btn.href}
                      className={`inline-flex items-center space-x-2 px-5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all ${btn.cls}`}
                    >
                      <span>{btn.label}</span>
                      {btn.icon}
                    </a>
                  ) : (
                    <button
                      onClick={btn.onClick}
                      className={`inline-flex items-center space-x-2 px-5 py-3 rounded-lg text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${btn.cls}`}
                    >
                      {btn.icon}
                      <span>{btn.label}</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              variants={socialVariant}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-4 pt-3 border-t border-black/[0.08] dark:border-white/[0.06] text-xs font-mono text-zinc-600 dark:text-zinc-400"
            >
              <span className="text-zinc-500 uppercase tracking-widest text-[11px] font-semibold">Connect:</span>
              {[
                { href: personalInfo.socials.github, icon: <GithubIcon className="w-3.5 h-3.5" />, label: 'GitHub', color: 'hover:text-amber-600 dark:hover:text-amber-400' },
                { href: personalInfo.socials.linkedin, icon: <LinkedinIcon className="w-3.5 h-3.5" />, label: 'LinkedIn', color: 'hover:text-sky-600 dark:hover:text-sky-400' },
                { href: personalInfo.socials.email, icon: <Mail className="w-3.5 h-3.5" />, label: 'Email', color: 'hover:text-zinc-900 dark:hover:text-zinc-200' },
              ].map((s, i) => (
                <span key={s.label} className="flex items-center space-x-1">
                  {i > 0 && <span className="text-zinc-400 dark:text-zinc-700 mr-2">•</span>}
                  <a
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 transition-colors ${s.color}`}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Terminal Workspace ── */}
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-zinc-600 hidden sm:flex flex-col items-center"
      >
        <a href="#about" aria-label="Scroll to About section" className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors">
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
