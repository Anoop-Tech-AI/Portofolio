import { useState } from 'react';
import {
  ArrowUpRight,
  GitBranch,
  CheckCircle2,
  Clock,
  Cpu,
  Activity,
  Layers,
  Search,
  Database,
  Brain,
  Sparkles,
  Sliders,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import ProjectModal from './ProjectModal';
import { fadeUp, VIEW } from '../hooks/useAnimations';

const RETAIL_STAGE_ICONS = {
  "01": Search,
  "02": Database,
  "03": Brain,
  "04": Sparkles,
  "05": Sliders,
  "06": FileCheck,
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeRetailStage, setActiveRetailStage] = useState('01');
  const [activeMedStage, setActiveMedStage] = useState(null);
  const [showSvgDiagram, setShowSvgDiagram] = useState(false);

  const retailMind = projectsData.find(p => p.id === 'retailmind-ai');
  const medSafe = projectsData.find(p => p.id === 'medsafe-ai');
  const studentCrud = projectsData.find(p => p.id === 'student-management-system');
  const devops = projectsData.find(p => p.id === 'devops-cicd-practice');

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06] bg-transparent dark:bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editorial Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-16 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              04 // ENGINEERING SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
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
              className="relative rounded-2xl bg-white dark:bg-[#12141c] border border-amber-500/30 dark:border-amber-500/20 overflow-hidden shadow-sm dark:shadow-2xl p-6 sm:p-10 transition-all hover:border-amber-500/50"
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.06] dark:bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-8">
                {/* Meta & Title Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.06]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-semibold">
                        FLAGSHIP PROJECT
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-black/[0.06] dark:border-zinc-800 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-amber-500" />
                        {retailMind.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {retailMind.title}
                    </h3>
                    <p className="text-sm sm:text-base text-amber-700 dark:text-amber-300/90 font-medium mt-1">
                      {retailMind.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedProject(retailMind)}
                      className="px-4 py-2 text-xs font-mono rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#161822] dark:hover:bg-[#1d202d] text-zinc-800 dark:text-zinc-200 border border-black/[0.08] dark:border-white/[0.08] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Pipeline Specs</span>
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={retailMind.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#161822] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/[0.08] dark:border-white/[0.08] transition-colors"
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
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold">
                        Problem Statement
                      </h4>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {retailMind.problemStatement}
                      </p>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold">
                        Engineered Solution
                      </h4>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {retailMind.solution}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#0e1017] border border-black/[0.08] dark:border-white/[0.06] text-xs">
                      <span className="text-amber-700 dark:text-amber-400 font-mono font-semibold block mb-1">
                        Anoop's Contribution:
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {retailMind.contribution}
                      </p>
                    </div>

                    {/* Interactive diagram toggle button */}
                    <button
                      onClick={() => setShowSvgDiagram(prev => !prev)}
                      className="text-xs font-mono text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1.5 pt-1 cursor-pointer font-medium"
                    >
                      <span>{showSvgDiagram ? "Hide Vector Architecture Schematic ▲" : "View Technical Architecture Flow Diagram ▼"}</span>
                    </button>
                  </div>

                  {/* Right: Interactive 6-Stage Architecture Flow Diagram */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider pb-1">
                      <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold">
                        <Cpu className="w-3.5 h-3.5" />
                        Interactive Multi-Agent Pipeline
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">6 Stages • Click or hover</span>
                    </div>

                    {/* Staggered sequential stages with connecting indicators and custom icons */}
                    <div className="space-y-2 p-4 rounded-xl bg-zinc-50 dark:bg-[#0d0f15] border border-black/[0.08] dark:border-white/[0.06] relative">
                      {retailMind.architecture.map((step, idx) => {
                        const isHovered = activeRetailStage === step.step;
                        const StageIcon = RETAIL_STAGE_ICONS[step.step] || Cpu;

                        return (
                          <motion.div
                            key={step.step}
                            initial={{ opacity: 0, x: -14 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={VIEW}
                            transition={{ duration: 0.35, delay: 0.15 + idx * 0.08, ease: 'easeOut' }}
                            onMouseEnter={() => setActiveRetailStage(step.step)}
                            onClick={() => setActiveRetailStage(step.step)}
                            whileHover={{ scale: 1.015 }}
                            className={`p-2.5 rounded-lg border transition-all flex items-start space-x-3 text-xs cursor-pointer ${isHovered
                                ? 'bg-amber-500/10 dark:bg-[#181a26] border-amber-500/60 shadow-sm'
                                : 'bg-white dark:bg-[#13151e] border-black/[0.06] dark:border-white/[0.04]'
                              }`}
                          >
                            <div className={`w-7 h-7 rounded-md font-mono text-[11px] flex items-center justify-center shrink-0 transition-colors ${isHovered
                                ? 'bg-amber-500 text-black font-bold'
                                : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20'
                              }`}>
                              <StageIcon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className={`font-semibold block transition-colors ${isHovered ? 'text-amber-800 dark:text-amber-300 font-bold' : 'text-zinc-900 dark:text-white'
                                  }`}>
                                  {step.name}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-400">
                                  Step {step.step}
                                </span>
                              </div>
                              <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                                {step.desc}
                              </span>
                            </div>
                            {idx < retailMind.architecture.length - 1 && (
                              <span className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] self-center">↓</span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Optional SVG Technical Architecture Schematic */}
                <AnimatePresence>
                  {showSvgDiagram && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4"
                    >
                      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#0c0e14] border border-amber-500/20 text-zinc-900 dark:text-zinc-100">
                        <div className="flex items-center justify-between mb-3 text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold">
                          <span>SYSTEM ARCHITECTURE TOPOLOGY // VECTOR RAG</span>
                          <span className="text-[10px] text-zinc-500">BGE-M3 + ChromaDB + LangGraph</span>
                        </div>
                        <img
                          src="/retailmind-architecture.svg"
                          alt="RetailMind-AI System Architecture"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.06]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2 font-semibold">
                    Technologies & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {retailMind.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-100 dark:bg-[#151722] text-zinc-800 dark:text-zinc-300 border border-black/[0.08] dark:border-white/[0.06] cursor-default shadow-xs"
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
              className="relative rounded-2xl bg-white dark:bg-[#12151f] border border-sky-500/30 dark:border-sky-500/20 overflow-hidden shadow-sm dark:shadow-xl p-6 sm:p-9 transition-all hover:border-sky-500/50"
            >
              <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-black/[0.08] dark:border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30 flex items-center gap-1 font-semibold">
                        <Activity className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                        HEALTHCARE AI
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-black/[0.06] dark:border-zinc-800">
                        {medSafe.status}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {medSafe.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-700 dark:text-sky-300 font-medium mt-0.5">
                      {medSafe.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedProject(medSafe)}
                      className="px-3.5 py-1.5 text-xs font-mono rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#161a27] dark:hover:bg-[#1d2233] text-zinc-800 dark:text-zinc-200 border border-black/[0.08] dark:border-white/[0.08] transition-colors cursor-pointer"
                    >
                      View Specs
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={medSafe.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#161a27] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/[0.08] dark:border-white/[0.08]"
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
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1 font-bold">Problem & Impact</h4>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{medSafe.problemStatement}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1 font-bold">Automated Safety Solution</h4>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{medSafe.solution}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-[#0e111a] border border-black/[0.08] dark:border-white/[0.06] text-xs">
                      <span className="text-sky-700 dark:text-sky-400 font-mono font-semibold block mb-0.5">Contribution:</span>
                      <span className="text-zinc-600 dark:text-zinc-400">{medSafe.contribution}</span>
                    </div>
                  </div>

                  {/* Architecture sequence with clinical pipeline animation */}
                  <div className="lg:col-span-5 p-4 rounded-xl bg-zinc-50 dark:bg-[#0e111a] border border-black/[0.08] dark:border-white/[0.06] space-y-2">
                    <span className="text-xs font-mono text-sky-700 dark:text-sky-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5 font-bold">
                      <Layers className="w-3 h-3 text-sky-600 dark:text-sky-400" />
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
                          className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${isHovered
                              ? 'bg-sky-500/10 dark:bg-[#181d2e] border-sky-500/50 shadow-sm'
                              : 'bg-white dark:bg-[#141724] border-black/[0.06] dark:border-white/[0.04]'
                            }`}
                        >
                          <span className="font-mono text-sky-700 dark:text-sky-300 mr-2 font-bold">{node.step}.</span>
                          <span className={`font-semibold ${isHovered ? 'text-sky-800 dark:text-sky-200' : 'text-zinc-900 dark:text-zinc-200'}`}>
                            {node.name}:
                          </span>
                          <span className="text-zinc-600 dark:text-zinc-400 ml-1.5">{node.desc}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Tech pills */}
                <div className="pt-3 border-t border-black/[0.08] dark:border-white/[0.06] flex flex-wrap gap-1.5">
                  {medSafe.technologies.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 py-0.5 text-xs font-mono rounded bg-zinc-100 dark:bg-[#161a27] text-zinc-800 dark:text-zinc-300 border border-black/[0.08] dark:border-white/[0.06] cursor-default"
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
                whileHover={{ y: -3, borderColor: 'rgba(16,185,129,0.4)' }}
                className="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#121419] border border-black/[0.08] dark:border-white/[0.06] transition-all flex flex-col justify-between shadow-sm dark:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {studentCrud.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      {studentCrud.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-1">
                    {studentCrud.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400/90 mb-3 font-medium">
                    {studentCrud.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                    {studentCrud.solution}
                  </p>

                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-[#0e1014] border border-black/[0.06] dark:border-white/[0.05] text-xs mb-4">
                    <span className="text-zinc-500 font-mono block mb-0.5 font-semibold">CONTRIBUTION:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">{studentCrud.contribution}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {studentCrud.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border border-black/[0.06] dark:border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <button
                      onClick={() => setSelectedProject(studentCrud)}
                      className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-mono flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <span>Inspect Endpoints</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={studentCrud.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
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
                whileHover={{ y: -3, borderColor: 'rgba(168,85,247,0.4)' }}
                className="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#121419] border border-black/[0.08] dark:border-white/[0.06] transition-all flex flex-col justify-between shadow-sm dark:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {devops.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3" />
                      {devops.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-1">
                    {devops.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-700 dark:text-purple-400/90 mb-3 font-medium">
                    {devops.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                    {devops.solution}
                  </p>

                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-[#0e1014] border border-black/[0.06] dark:border-white/[0.05] text-xs mb-4">
                    <span className="text-zinc-500 font-mono block mb-0.5 font-semibold">INFRASTRUCTURE WORKFLOW:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Git Push → Jenkins Pipeline → Maven Build → Docker Container → Minikube Pod</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {devops.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border border-black/[0.06] dark:border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <button
                      onClick={() => setSelectedProject(devops)}
                      className="text-purple-700 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 font-mono flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <span>Pipeline Manifests</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={devops.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
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
