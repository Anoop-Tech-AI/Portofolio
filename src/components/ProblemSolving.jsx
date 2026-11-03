import { 
  Binary, 
  Cpu, 
  Terminal, 
  Target, 
  Code2, 
  ExternalLink, 
  Zap
} from 'lucide-react';
import { problemSolvingData } from '../data/portfolioData';

export default function ProblemSolving() {
  const getPillarIcon = (icon) => {
    switch (icon) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'Binary': return <Binary className="w-4 h-4 text-sky-400" />;
      case 'Target': return <Target className="w-4 h-4 text-rose-400" />;
      default: return <Code2 className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="problem-solving" className="py-24 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
              05 // COMPUTATIONAL RIGOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Problem Solving & DSA
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            Mathematical abstractions, asymptotic bounds, and competitive coding in modern C++.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {problemSolvingData.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#12141a] border border-white/[0.06] hover:border-white/[0.14] transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="p-2 rounded-lg bg-[#0e1015] border border-white/[0.06] w-fit mb-3.5">
                  {getPillarIcon(pillar.icon)}
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors tracking-tight">
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
        <div className="p-6 sm:p-8 rounded-xl bg-[#111319] border border-white/[0.06] mb-12">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>Disciplined Problem Solving Protocol</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemSolvingData.approachSteps.map((step) => (
              <div key={step.step} className="space-y-2 border-l border-white/[0.06] pl-4">
                <span className="text-xl font-bold font-mono text-zinc-600 block">
                  {step.step}
                </span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
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
        <div className="p-6 rounded-xl bg-[#0f1116] border border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/[0.05]">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Computational Profiles & Challenge Tracks
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              Continuous Practice • C++ Standard Template Library
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problemSolvingData.platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.placeholder}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#14161f] border border-white/[0.06] hover:border-amber-400/40 hover:bg-[#181b26] transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors font-mono">
                    {platform.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-xs text-zinc-400 block mb-2 font-mono">
                  {platform.status}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono inline-block px-1.5 py-0.5 rounded bg-[#0c0d12] border border-white/[0.05]">
                  {platform.focus}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
