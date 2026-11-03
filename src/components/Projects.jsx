import { useState } from 'react';
import { 
  ArrowUpRight, 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  Cpu,
  Activity,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import { projectsData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import ProjectModal from './ProjectModal';
import { fadeUp, VIEW } from '../hooks/useAnimations';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeRetailStage, setActiveRetailStage] = useState(null);
  const [activeMedStage, setActiveMedStage] = useState(null);

  const retailMind = projectsData.find(p => p.id === 'retailmind-ai');
  const medSafe = projectsData.find(p => p.id === 'medsafe-ai');
  const studentCrud = projectsData.find(p => p.id === 'student-management-system');
  const devops = projectsData.find(p => p.id === 'devops-cicd-practice');

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-white/[0.06] bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-16 border-b border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
              04 // ENGINEERING SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            Individual project architectures demonstrating Agentic AI, RAG retrieval, clinical data normalization, and container orchestration.
          </p>
        </motion.div>

        <div className="space-y-14">
          
          {/* ========================================================
              SHOWCASE 1: RetailMind-AI (FLAGSHIP SHOWCASE)
             ======================================================== */}
          {retailMind && (
            <motion.div 
              id={`project-${retailMind.id}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              className="relative rounded-2xl bg-[#12141c] border border-amber-500/20 overflow-hidden shadow-2xl p-6 sm:p-10 transition-all hover:border-amber-500/40"
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-8">
                {/* Meta & Title Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        FLAGSHIP PROJECT
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {retailMind.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {retailMind.title}
                    </h3>
                    <p className="text-sm sm:text-base text-amber-300/90 font-medium mt-1">
                      {retailMind.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedProject(retailMind)}
                      className="px-4 py-2 text-xs font-mono rounded-lg bg-[#161822] hover:bg-[#1d202d] text-zinc-200 border border-white/[0.08] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pipeline Specs</span>
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={retailMind.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#161822] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors"
                      title="GitHub Repository (Placeholder)"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                {/* Two-Column Problem & Architecture Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Problem & Solution Description */}
                  <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                        Problem Statement
                      </h4>
                      <p className="text-zinc-300 leading-relaxed">
                        {retailMind.problemStatement}
                      </p>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                        Engineered Solution
                      </h4>
                      <p className="text-zinc-300 leading-relaxed">
                        {retailMind.solution}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.06] text-xs">
                      <span className="text-amber-400 font-mono font-semibold block mb-1">
                        Anoop's Contribution:
                      </span>
                      <p className="text-zinc-400 leading-relaxed">
                        {retailMind.contribution}
                      </p>
                    </div>
                  </div>

                  {/* Right: Interactive 6-Stage Architecture Flow Diagram */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-wider pb-1">
                      <span className="flex items-center gap-1.5 text-amber-400">
                        <Cpu className="w-3.5 h-3.5" />
                        Sequential Architecture Pipeline
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">6 Stages • Hover to inspect</span>
                    </div>

                    {/* Staggered sequential stages with connecting indicators */}
                    <div className="space-y-2 p-4 rounded-xl bg-[#0d0f15] border border-white/[0.06] relative">
                      {retailMind.architecture.map((step, idx) => {
                        const isHovered = activeRetailStage === step.step;
                        return (
                          <motion.div 
                            key={step.step}
                            initial={{ opacity: 0, x: -14 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={VIEW}
                            transition={{ duration: 0.35, delay: 0.15 + idx * 0.08, ease: 'easeOut' }}
                            onMouseEnter={() => setActiveRetailStage(step.step)}
                            onMouseLeave={() => setActiveRetailStage(null)}
                            whileHover={{ scale: 1.015 }}
                            className={`p-2.5 rounded-lg border transition-all flex items-start space-x-3 text-xs cursor-pointer ${
                              isHovered 
                                ? 'bg-[#181a26] border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                                : 'bg-[#13151e] border-white/[0.04]'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-md font-mono text-[11px] flex items-center justify-center shrink-0 transition-colors ${
                              isHovered
                                ? 'bg-amber-500 text-black font-bold'
                                : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            }`}>
                              {step.step}
                            </span>
                            <div className="flex-1">
                              <span className={`font-semibold block transition-colors ${
                                isHovered ? 'text-amber-300' : 'text-white'
                              }`}>
                                {step.name}
                              </span>
                              <span className="text-[11px] text-zinc-400">
                                {step.desc}
                              </span>
                            </div>
                            {idx < retailMind.architecture.length - 1 && (
                              <span className="text-zinc-600 font-mono text-[10px] self-center">↓</span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                    Technologies & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {retailMind.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-[#151722] text-zinc-300 border border-white/[0.06] cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================
              SHOWCASE 2: MedSafe AI (HEALTHCARE CASE STUDY)
             ======================================================== */}
          {medSafe && (
            <motion.div 
              id={`project-${medSafe.id}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              className="relative rounded-2xl bg-[#12151f] border border-sky-500/20 overflow-hidden shadow-xl p-6 sm:p-9 transition-all hover:border-sky-500/40"
            >
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-sky-400" />
                        HEALTHCARE AI
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {medSafe.status}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {medSafe.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-300 font-medium mt-0.5">
                      {medSafe.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedProject(medSafe)}
                      className="px-3.5 py-1.5 text-xs font-mono rounded-lg bg-[#161a27] hover:bg-[#1d2233] text-zinc-200 border border-white/[0.08] transition-colors cursor-pointer"
                    >
                      View Specs
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={medSafe.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#161a27] text-zinc-400 hover:text-white border border-white/[0.08]"
                      title="GitHub Repository (Placeholder)"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </motion.a>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs sm:text-sm">
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">Problem & Impact</h4>
                      <p className="text-zinc-300 leading-relaxed">{medSafe.problemStatement}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">Automated Safety Solution</h4>
                      <p className="text-zinc-300 leading-relaxed">{medSafe.solution}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0e111a] border border-white/[0.06] text-xs">
                      <span className="text-sky-400 font-mono font-semibold block mb-0.5">Contribution:</span>
                      <span className="text-zinc-400">{medSafe.contribution}</span>
                    </div>
                  </div>

                  {/* Architecture sequence with clinical pipeline animation */}
                  <div className="lg:col-span-5 p-4 rounded-xl bg-[#0e111a] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-sky-400" />
                      Clinical Document Flow
                    </span>
                    {medSafe.architecture.map((node, i) => {
                      const isHovered = activeMedStage === node.step;
                      return (
                        <motion.div 
                          key={node.step} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={VIEW}
                          transition={{ duration: 0.3, delay: 0.12 + i * 0.07 }}
                          onMouseEnter={() => setActiveMedStage(node.step)}
                          onMouseLeave={() => setActiveMedStage(null)}
                          className={`p-2 rounded border text-xs transition-colors cursor-pointer ${
                            isHovered
                              ? 'bg-[#181d2e] border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.15)]'
                              : 'bg-[#141724] border-white/[0.04]'
                          }`}
                        >
                          <span className="font-mono text-sky-300 mr-2">{node.step}.</span>
                          <span className={`font-semibold ${isHovered ? 'text-sky-200' : 'text-zinc-200'}`}>
                            {node.name}:
                          </span>
                          <span className="text-zinc-400 ml-1.5">{node.desc}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Tech pills */}
                <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {medSafe.technologies.map((t) => (
                    <motion.span 
                      key={t} 
                      whileHover={{ scale: 1.05 }}
                      className="px-2 py-0.5 text-xs font-mono rounded bg-[#161a27] text-zinc-300 border border-white/[0.06] cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================
              SHOWCASES 3 & 4: STUDENT CRUD & DEVOPS PRACTICE (2-COL)
             ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Student Management System */}
            {studentCrud && (
              <motion.div 
                id={`project-${studentCrud.id}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEW}
                whileHover={{ y: -3, borderColor: 'rgba(16,185,129,0.3)' }}
                className="p-6 sm:p-7 rounded-xl bg-[#121419] border border-white/[0.06] transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-400">
                      {studentCrud.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {studentCrud.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                    {studentCrud.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400/90 mb-3">
                    {studentCrud.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {studentCrud.solution}
                  </p>

                  <div className="p-3 rounded-lg bg-[#0e1014] border border-white/[0.05] text-xs mb-4">
                    <span className="text-zinc-500 font-mono block mb-0.5">CONTRIBUTION:</span>
                    <span className="text-zinc-300">{studentCrud.contribution}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {studentCrud.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <button
                      onClick={() => setSelectedProject(studentCrud)}
                      className="text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect Endpoints</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={studentCrud.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-white"
                      title="GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DevOps & CI/CD Practice */}
            {devops && (
              <motion.div 
                id={`project-${devops.id}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEW}
                whileHover={{ y: -3, borderColor: 'rgba(168,85,247,0.3)' }}
                className="p-6 sm:p-7 rounded-xl bg-[#121419] border border-white/[0.06] transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-400">
                      {devops.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {devops.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                    {devops.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400/90 mb-3">
                    {devops.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {devops.solution}
                  </p>

                  <div className="p-3 rounded-lg bg-[#0e1014] border border-white/[0.05] text-xs mb-4">
                    <span className="text-zinc-500 font-mono block mb-0.5">INFRASTRUCTURE WORKFLOW:</span>
                    <span className="text-zinc-300">Git Push → Jenkins Pipeline → Maven Build → Docker Container → Minikube Pod</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {devops.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <button
                      onClick={() => setSelectedProject(devops)}
                      className="text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <span>Pipeline Manifests</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={devops.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-white"
                      title="GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>

      {/* Modal for Deep Pipeline Specs */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
