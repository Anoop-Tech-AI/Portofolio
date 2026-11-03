import { 
  ArrowRight, 
  Download, 
  Mail, 
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import InteractiveTerminal from './InteractiveTerminal';

export default function Hero({ onOpenResume }) {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Editorial Grid & Subtle Ambience */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[420px] h-[300px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[380px] h-[280px] bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Asymmetric Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Identity & Typography */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status and Location Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>KMIT, Hyderabad (2024 – 2028)</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
                <span>Seeking Internships</span>
              </div>
            </div>

            {/* Salutation */}
            <div>
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-400 font-semibold mb-2">
                HELLO, I'M ANOOP.
              </p>
              
              {/* Bold Triad Manifesto Headline */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08] uppercase">
                <span className="block text-zinc-100">I BUILD SOFTWARE.</span>
                <span className="block text-amber-400">I EXPLORE INTELLIGENCE.</span>
                <span className="block text-zinc-400">I SOLVE PROBLEMS.</span>
              </h1>
            </div>

            {/* Subtitle & Role */}
            <div className="space-y-2 border-l-2 border-amber-500/60 pl-4 py-0.5">
              <p className="text-sm sm:text-base font-medium text-zinc-200">
                Computer Science & Engineering Student • <span className="text-amber-300">KMIT, Hyderabad</span>
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                Software Engineering | Artificial Intelligence & Machine Learning | Data Structures & Algorithms
              </p>
            </div>

            {/* Authentic personal intro */}
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-xl">
              {personalInfo.bioIntro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-[#14161d] hover:bg-[#1a1d26] text-zinc-200 hover:text-white font-medium text-xs uppercase tracking-wider border border-white/[0.08] hover:border-white/[0.18] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>My Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-4 py-3 rounded-lg bg-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center space-x-4 pt-3 border-t border-white/[0.06] text-xs font-mono text-zinc-400">
              <span className="text-zinc-500 uppercase tracking-widest text-[11px]">Links:</span>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                title="GitHub Profile (Placeholder)"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                title="LinkedIn Profile (Placeholder)"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href={personalInfo.socials.email}
                className="hover:text-zinc-200 transition-colors flex items-center gap-1.5"
                title="Email Anoop"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Interactive Developer Workspace / Live Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <InteractiveTerminal />
          </motion.div>

        </div>

      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-zinc-600 hidden sm:flex flex-col items-center">
        <a href="#about" aria-label="Scroll to About section" className="hover:text-zinc-400 transition-colors">
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
