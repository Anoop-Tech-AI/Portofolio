import { 
  ArrowRight, 
  Download, 
  Mail, 
  Code2, 
  BrainCircuit, 
  ChevronDown,
  Layers,
  Cpu
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const getInterestIcon = (interest) => {
    if (interest.includes('Artificial')) return <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />;
    if (interest.includes('Full-Stack')) return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
    if (interest.includes('Data Structures')) return <Cpu className="w-3.5 h-3.5 text-teal-400" />;
    return <Code2 className="w-3.5 h-3.5 text-sky-400" />;
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient gradient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-sky-500/10 to-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Availability / Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/90 text-xs text-zinc-300 mb-8 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-zinc-300">B.Tech CSE • KMIT Hyderabad '28</span>
          <span className="text-zinc-600">|</span>
          <span className="text-cyan-400 font-medium">Aspiring Software & AI Engineer</span>
        </div>

        {/* Name Monogram with High-tech typography */}
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-sm font-mono uppercase tracking-[0.35em] text-cyan-400/90 font-semibold">
            {personalInfo.name}
          </h2>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          Building Intelligent <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Solutions Through Code.
          </span>
        </h1>

        {/* Introduction */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 font-normal leading-relaxed mb-10">
          {personalInfo.bioIntro}
        </p>

        {/* Professional Interests Tags */}
        <div className="mb-10">
          <p className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-3">Focus Areas & Interests</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {personalInfo.interests.map((interest) => (
              <div 
                key={interest}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#121520]/80 border border-zinc-800/80 text-xs font-medium text-zinc-200 hover:border-zinc-700 transition-colors shadow-sm"
              >
                {getInterestIcon(interest)}
                <span>{interest}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          {/* Explore My Work */}
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-black font-semibold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] cursor-pointer"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Download Resume */}
          <button
            onClick={onOpenResume}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-sm border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </button>

          {/* Contact Me */}
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-transparent hover:bg-zinc-900/50 text-zinc-300 hover:text-white font-medium text-sm border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-zinc-800/60 max-w-md mx-auto">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2">Connect:</span>
          
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-cyan-500/50 hover:bg-zinc-800 transition-all"
            title="GitHub (Placeholder URL)"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-sky-400 hover:border-sky-500/50 hover:bg-zinc-800 transition-all"
            title="LinkedIn (Placeholder URL)"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.socials.email}
            className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-zinc-800 transition-all"
            title="Send Email"
            aria-label="Email Anoop"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-600 flex flex-col items-center">
        <a href="#about" aria-label="Scroll to About section" className="hover:text-zinc-400 transition-colors">
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
