import { X, GitBranch, CheckCircle2, Clock } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#12141c] border border-white/[0.08] rounded-xl shadow-2xl p-6 sm:p-8 text-zinc-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle accent blur */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center space-x-2.5 mb-1.5">
              <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${project.badgeColor}`}>
                {project.status}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {project.category}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-300/90 font-medium mt-0.5">
              {project.subtitle}
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Description */}
        <div className="py-5 space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Problem Statement</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.problemStatement || project.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Technical Solution</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.solution || project.summary}
            </p>
          </div>

          {/* Architecture Pipeline Flow */}
          {project.architecture && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Execution Architecture & Stages</span>
              </div>
              
              <div className="p-3.5 rounded-xl bg-[#0c0d12] border border-white/[0.06] space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  {project.architecture.map((item, idx) => {
                    const stepNum = typeof item === 'object' ? item.step : `0${idx + 1}`;
                    const stepName = typeof item === 'object' ? item.name : item;
                    const stepDesc = typeof item === 'object' ? item.desc : null;

                    return (
                      <div 
                        key={idx}
                        className="p-2.5 rounded-lg bg-[#14161f] border border-white/[0.04] flex items-start space-x-3 text-xs"
                      >
                        <span className="w-6 h-6 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono text-[10px] flex items-center justify-center shrink-0">
                          {stepNum}
                        </span>
                        <div>
                          <span className="font-semibold text-zinc-200 block">{stepName}</span>
                          {stepDesc && <span className="text-[11px] text-zinc-400">{stepDesc}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Anoop's Contribution */}
          {project.contribution && (
            <div className="p-3 rounded-lg bg-[#0e1017] border border-white/[0.06] text-xs">
              <span className="font-mono text-amber-400 font-semibold block mb-1">Anoop's Contribution:</span>
              <p className="text-zinc-300 leading-relaxed">{project.contribution}</p>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-[#14161f] border border-white/[0.06] text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Status Note */}
          <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.06] text-xs text-zinc-400 leading-relaxed flex items-center space-x-2.5">
            {project.statusType === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>
              <strong>Development Status:</strong> {project.status}. Maintained under active repository standards.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
