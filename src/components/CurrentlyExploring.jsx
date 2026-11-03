import { Compass } from 'lucide-react';
import { currentlyExploring } from '../data/portfolioData';

export default function CurrentlyExploring() {
  return (
    <section id="exploring" className="py-24 relative z-10 bg-[#0c0e14]/40 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Active Research & Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Currently Exploring
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl">
            Emerging technologies, intelligent agent architectures, and computational frontiers under active study.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3" />
        </div>

        {/* Exploring Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentlyExploring.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#11131a]/80 border border-zinc-800/80 hover:border-cyan-500/30 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-400">
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Active Track</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
