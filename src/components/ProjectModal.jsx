import { X, GitBranch, CheckCircle2, Clock } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#12141c] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle accent blur */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/[0.08] dark:bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div>
            <div className="flex items-center space-x-2.5 mb-1.5">
              <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${project.badgeColor}`}>
                {project.status}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                {project.category}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300/90 font-medium mt-0.5">
              {project.subtitle}
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Description */}
        <div className="py-5 space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2 font-bold">Problem Statement</h4>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.problemStatement || project.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2 font-bold">Technical Solution</h4>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.solution || project.summary}
            </p>
          </div>

          {/* Architecture Pipeline Flow */}
          {project.architecture && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-3 font-bold">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Execution Architecture & Stages</span>
              </div>
              
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#0c0d12] border border-black/[0.06] dark:border-white/[0.06] space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  {project.architecture.map((item, idx) => {
                    const stepNum = typeof item === 'object' ? item.step : `0${idx + 1}`;
                    const stepName = typeof item === 'object' ? item.name : item;
                    const stepDesc = typeof item === 'object' ? item.desc : null;

                    return (
                      <div 
                        key={idx}
                        className="p-2.5 rounded-lg bg-white dark:bg-[#14161f] border border-black/[0.06] dark:border-white/[0.04] flex items-start space-x-3 text-xs"
                      >
                        <span className="w-6 h-6 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-mono text-[10px] flex items-center justify-center shrink-0 font-bold">
                          {stepNum}
                        </span>
                        <div>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-200 block">{stepName}</span>
                          {stepDesc && <span className="text-[11px] text-zinc-600 dark:text-zinc-400">{stepDesc}</span>}
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
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#0e1017] border border-black/[0.06] dark:border-white/[0.06] text-xs">
              <span className="font-mono text-amber-700 dark:text-amber-400 font-semibold block mb-1">Anoop's Contribution:</span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{project.contribution}</p>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2.5 font-bold">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-100 dark:bg-[#14161f] border border-black/[0.08] dark:border-white/[0.06] text-zinc-800 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Status Note */}
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#0e1017] border border-black/[0.06] dark:border-white/[0.06] text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-center space-x-2.5">
            {project.statusType === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            )}
            <span>
              <strong>Development Status:</strong> {project.status}. Maintained under active repository standards.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-lg bg-zinc-900 dark:bg-zinc-800 text-white hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
