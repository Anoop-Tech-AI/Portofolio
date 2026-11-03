import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import InteractiveTerminal from './InteractiveTerminal';

/* ─── Animation variants ─── */
const HEADLINE_LINES = [
  { text: 'I BUILD SOFTWARE.', color: 'text-zinc-100' },
  { text: 'I EXPLORE INTELLIGENCE.', color: 'text-amber-400' },
  { text: 'I SOLVE PROBLEMS.', color: 'text-zinc-500' },
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

export default function Hero({ onOpenResume }) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[480px] h-[320px] bg-amber-500/[0.05] rounded-full blur-[130px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 w-[380px] h-[280px] bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { text: 'KMIT, Hyderabad (2024 – 2028)', dot: true },
                { text: 'Seeking Internships', accent: true },
              ].map((pill, i) => (
                <motion.div
                  key={pill.text}
                  custom={i}
                  variants={pillVariant}
                  initial="hidden"
                  animate="visible"
                  className={
                    pill.accent
                      ? 'inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300'
                      : 'inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300'
                  }
                >
                  {pill.dot && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  )}
                  <span>{pill.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Heading Block */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-400 font-semibold mb-3"
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

            {/* Subtitle */}
            <motion.div
              variants={subtitleVariant}
              initial="hidden"
              animate="visible"
              className="space-y-2 border-l-2 border-amber-500/60 pl-4 py-0.5"
            >
              <p className="text-sm sm:text-base font-medium text-zinc-200">
                Computer Science &amp; Engineering Student •{' '}
                <span className="text-amber-300">KMIT, Hyderabad</span>
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                Software Engineering | Artificial Intelligence &amp; Machine Learning | Data Structures &amp; Algorithms
              </p>
            </motion.div>

            {/* Bio intro */}
            <motion.p
              variants={descVariant}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl"
            >
              {personalInfo.bioIntro}
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {[
                {
                  type: 'link',
                  href: '#projects',
                  label: 'Explore Projects',
                  icon: <ArrowRight className="w-3.5 h-3.5" />,
                  cls: 'bg-amber-500 hover:bg-amber-400 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.28)] hover:shadow-[0_0_28px_rgba(245,158,11,0.44)]',
                },
                {
                  type: 'button',
                  label: 'My Resume',
                  icon: <Download className="w-3.5 h-3.5 text-amber-400" />,
                  cls: 'bg-[#14161d] hover:bg-[#1a1d26] text-zinc-200 hover:text-white border border-white/[0.08] hover:border-white/[0.18]',
                  onClick: onOpenResume,
                },
                {
                  type: 'link',
                  href: '#contact',
                  label: 'Contact Me',
                  icon: <Mail className="w-3.5 h-3.5" />,
                  cls: 'bg-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-transparent',
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
              className="flex items-center space-x-4 pt-3 border-t border-white/[0.06] text-xs font-mono text-zinc-400"
            >
              <span className="text-zinc-500 uppercase tracking-widest text-[11px]">Links:</span>
              {[
                { href: personalInfo.socials.github, icon: <GithubIcon className="w-3.5 h-3.5" />, label: 'GitHub', color: 'hover:text-amber-400' },
                { href: personalInfo.socials.linkedin, icon: <LinkedinIcon className="w-3.5 h-3.5" />, label: 'LinkedIn', color: 'hover:text-sky-400' },
                { href: personalInfo.socials.email, icon: <Mail className="w-3.5 h-3.5" />, label: 'Email', color: 'hover:text-zinc-200' },
              ].map((s, i) => (
                <span key={s.label} className="flex items-center space-x-1">
                  {i > 0 && <span className="text-zinc-700 mr-2">•</span>}
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

          {/* ── RIGHT COLUMN: Terminal with float ── */}
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

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-zinc-600 hidden sm:flex flex-col items-center"
      >
        <a href="#about" aria-label="Scroll to About section" className="hover:text-zinc-400 transition-colors">
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
