import { developmentTimeline } from '../data/portfolioData';

export default function Timeline() {
  return (
    <section id="journey" className="py-24 relative z-10 border-t border-white/[0.06] bg-[#0a0b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-16 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
              02 // CHRONOLOGICAL MILESTONES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              My Development Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            The progression of technical foundations, system architectures, and intelligent software engineering.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative">
          {/* Vertical spine line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px bg-white/[0.08] -translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {developmentTimeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-start ${isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                >
                  {/* Central Node Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#13151c] border border-amber-500/40 flex items-center justify-center text-amber-400 z-10 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  </div>

                  {/* Content Card (Left or Right on desktop) */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                    <div className="p-6 rounded-xl bg-[#12141a] border border-white/[0.06] hover:border-amber-500/30 transition-all duration-300 shadow-xl group">

                      {/* Meta header */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/[0.04]">
                        <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {item.year}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                          {item.status}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5 mb-3">
                        {item.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Gained Skills / Focus Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                        {item.skillsGained.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0b0c10] text-zinc-400 border border-white/[0.05]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Empty counterpart spacer for symmetry */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
