import { X, GitBranch, CheckCircle2, Clock } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#11131a] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-zinc-800/80">
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
            <p className="text-xs sm:text-sm text-cyan-300/90 font-medium mt-0.5">
              {project.subtitle}
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Description */}
        <div className="py-5 space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Project Overview</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Pipeline Flow */}
          {project.architecture && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span>Execution Pipeline & Architecture</span>
              </div>
              
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {project.architecture.map((step, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center space-x-2 text-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-zinc-200 truncate">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Status Note */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed flex items-center space-x-2.5">
            {project.statusType === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>
              <strong>Development Status:</strong> {project.status}. Source repository and implementation details are maintained under development guidelines.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
