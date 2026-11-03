import { 
  Binary, 
  Cpu, 
  Terminal, 
  Target, 
  Code2, 
  ExternalLink, 
  Zap, 
  Award
} from 'lucide-react';
import { problemSolvingData } from '../data/portfolioData';

export default function ProblemSolving() {
  const getPillarIcon = (icon) => {
    switch (icon) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Binary': return <Binary className="w-5 h-5 text-indigo-400" />;
      case 'Target': return <Target className="w-5 h-5 text-amber-400" />;
      default: return <Code2 className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="problem-solving" className="py-24 relative z-10 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Binary className="w-3.5 h-3.5" />
            <span>Core Computer Science Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Problem Solving & DSA
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-2xl">
            {problemSolvingData.description}
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3" />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {problemSolvingData.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#11131a]/80 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 w-fit mb-4 group-hover:scale-105 transition-transform">
                  {getPillarIcon(pillar.icon)}
                </div>
                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Algorithmic Methodology Workflow */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#11131a]/60 border border-zinc-800/80 shadow-xl backdrop-blur-md mb-14">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-6">
            <Zap className="w-4 h-4" />
            <span>Systematic Problem Solving Methodology</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemSolvingData.approachSteps.map((step) => (
              <div key={step.step} className="relative space-y-2">
                <span className="text-2xl font-black font-mono text-zinc-800 select-none">
                  {step.step}
                </span>
                <h4 className="text-sm font-semibold text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coding Platform Profiles / Placeholders */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Competitive Profiles & Platforms</span>
          </div>
          <p className="text-xs text-zinc-400 max-w-lg mx-auto mb-6">
            Tracking algorithmic challenges, contest ratings, and problem sets across leading computational platforms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problemSolvingData.platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.placeholder}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-cyan-500/40 hover:bg-zinc-800/80 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {platform.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block mb-2">
                  {platform.status}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono inline-block px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                  Profile Placeholder
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
