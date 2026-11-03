import { useState } from 'react';
import { 
  FolderGit2, 
  ArrowUpRight, 
  GitBranch, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'AI / Machine Learning', 'AI & Full-Stack', 'Backend & Database', 'DevOps & Cloud'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative z-10 bg-[#0c0e14]/50 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Applied Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-2xl">
            Selected engineering projects demonstrating autonomous AI agents, retrieval-augmented generation, backend REST architectures, and containerized deployment workflows.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeFilter === filter
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#11131a]/90 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between shadow-xl overflow-hidden hover:-translate-y-1"
            >
              {/* Ambient hover top glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 group-hover:bg-cyan-500/10 rounded-full blur-2xl transition-all pointer-events-none" />

              <div>
                {/* Meta line: category + status badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-zinc-400">
                    {project.category}
                  </span>
                  <span className={`inline-flex items-center space-x-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${project.badgeColor}`}>
                    {project.statusType === 'completed' ? (
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    <span>{project.status}</span>
                  </span>
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400/90 font-medium mt-1 mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Architecture Highlights for Pipeline Projects */}
                {project.architecture && (
                  <div className="mb-5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="flex items-center space-x-1.5 text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      <GitBranch className="w-3 h-3 text-cyan-400" />
                      <span>Pipeline Architecture:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-300 font-mono">
                      {project.architecture.map((node, i) => (
                        <span key={i} className="inline-flex items-center">
                          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                            {node}
                          </span>
                          {i < project.architecture.length - 1 && (
                            <span className="text-zinc-600 mx-1">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Section: Tech Stack & Action Button */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-zinc-900/90 text-zinc-400 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-zinc-400 italic">
                    {project.statusType === 'completed' ? 'Verified Implementation' : 'In Active Iteration'}
                  </span>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
