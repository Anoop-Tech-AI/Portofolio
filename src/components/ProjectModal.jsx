import { useEffect } from "react";
import { X, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#12141c] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.06] dark:bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${project.badgeColor}`}
              >
                {project.status}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                {project.category}
              </span>
            </div>
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
            >
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300/90 font-medium mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* All 8 Progressive Disclosure Specifications */}
        <div className="py-6 space-y-6 text-xs sm:text-sm">
          {/* 1. Problem Statement */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold flex items-center gap-1.5">
              <span className="text-amber-600 dark:text-amber-400">01.</span>
              Problem Statement
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-[#0e1017] p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06]">
              {project.problemStatement}
            </p>
          </div>

          {/* 2. Proposed Solution */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold flex items-center gap-1.5">
              <span className="text-amber-600 dark:text-amber-400">02.</span>
              Proposed Technical Solution
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-[#0e1017] p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06]">
              {project.solution}
            </p>
          </div>

          {/* 3. Architecture & Execution Stages */}
          {project.architecture && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2 font-bold flex items-center gap-1.5">
                <span className="text-amber-600 dark:text-amber-400">03.</span>
                System Architecture &amp; Stages
              </h4>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#0c0d12] border border-black/[0.06] dark:border-white/[0.06] space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  {project.architecture.map((item, idx) => {
                    const stepNum =
                      typeof item === "object" ? item.step : `0${idx + 1}`;
                    const stepName =
                      typeof item === "object" ? item.name : item;
                    const stepDesc =
                      typeof item === "object" ? item.desc : null;

                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-white dark:bg-[#14161f] border border-black/[0.06] dark:border-white/[0.04] flex items-start space-x-3 text-xs"
                      >
                        <span className="w-6 h-6 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-mono text-[10px] flex items-center justify-center shrink-0 font-bold">
                          {stepNum}
                        </span>
                        <div>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                            {stepName}
                          </span>
                          {stepDesc && (
                            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 block">
                              {stepDesc}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 4. Technologies Used */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2 font-bold flex items-center gap-1.5">
              <span className="text-amber-600 dark:text-amber-400">04.</span>
              Technologies &amp; Libraries
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-[#14161f] border border-black/[0.08] dark:border-white/[0.06] text-zinc-800 dark:text-zinc-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Anoop's Contribution */}
          {project.contribution && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold flex items-center gap-1.5">
                <span className="text-amber-600 dark:text-amber-400">05.</span>
                My Engineering Contribution
              </h4>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-[#0e1017] p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06]">
                {project.contribution}
              </p>
            </div>
          )}

          {/* 6. Implementation Details */}
          {project.implementationDetails && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold flex items-center gap-1.5">
                <span className="text-amber-600 dark:text-amber-400">06.</span>
                Implementation Details
              </h4>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-[#0e1017] p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06]">
                {project.implementationDetails}
              </p>
            </div>
          )}

          {/* 7. Challenges & Trade-offs */}
          {project.challenges && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold flex items-center gap-1.5">
                <span className="text-amber-600 dark:text-amber-400">07.</span>
                Technical Challenges
              </h4>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-[#0e1017] p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06]">
                {project.challenges}
              </p>
            </div>
          )}

          {/* 8. Future Improvements */}
          {project.futureImprovements && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold flex items-center gap-1.5">
                <span className="text-amber-600 dark:text-amber-400">08.</span>
                Future Roadmap &amp; Improvements
              </h4>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-[#0e1017] p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06]">
                {project.futureImprovements}
              </p>
            </div>
          )}

          {/* Repository & Development Status */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center space-x-2 text-zinc-500">
              {project.statusType === "completed" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              )}
              <span>
                Status: <strong>{project.status}</strong>
              </span>
            </div>

            {project.githubPlaceholder && (
              <a
                href={project.githubPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-zinc-700 dark:text-zinc-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3 ml-0.5 text-zinc-400" />
              </a>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-lg bg-zinc-900 dark:bg-zinc-800 text-white hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
}
