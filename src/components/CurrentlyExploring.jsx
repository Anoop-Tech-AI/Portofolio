import { currentlyExploring } from '../data/portfolioData';

export default function CurrentlyExploring() {
  return (
    <section id="exploring" className="py-20 relative z-10 border-t border-white/[0.06] bg-[#090a0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-10 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
              ACTIVE FRONTIERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Currently Exploring
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            Architectures, algorithms, and models under ongoing exploration and research.
          </p>
        </div>

        {/* Exploring Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentlyExploring.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#12141a] border border-white/[0.06] hover:border-amber-400/30 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0e1015] border border-white/[0.06] text-amber-300">
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors font-mono">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Active Track</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
