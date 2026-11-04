import { useState } from 'react';
import { 
  ArrowUpRight, 
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
import { motion } from 'motion/react';
import { projectsData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import ProjectModal from './ProjectModal';
import { fadeUp, VIEW } from '../hooks/useAnimations';

const RETAIL_STAGES = [
  {
    step: "01",
    name: "Query Understanding",
    icon: Search,
    shortDesc: "Deconstructs natural language intent, constraints, and budget.",
    purpose: "Analyzes raw user input to isolate product category, price ceiling, and mandatory attributes while discarding noisy filler words.",
    input: "Raw natural language user query (e.g., 'lightweight wireless mouse for coding under $50')",
    output: "Structured filter JSON with intent tags, budget ceiling, and key required features."
  },
  {
    step: "02",
    name: "RAG Retrieval",
    icon: Database,
    shortDesc: "Dense BGE-M3 vector search over ChromaDB product embeddings.",
    purpose: "Bypasses brittle keyword matching by projecting queries into semantic vector space, retrieving products with true semantic affinity.",
    input: "Structured intent vectors encoded via BGE-M3 model.",
    output: "Top-k candidate catalog items with similarity distance scores."
  },
  {
    step: "03",
    name: "Memory",
    icon: Brain,
    shortDesc: "LangGraph state buffer preserving multi-turn conversational context.",
    purpose: "Maintains ongoing conversation history so follow-up queries ('what about battery life?') retain previous constraints without restarting.",
    input: "Current turn dialogue + historical state buffer.",
    output: "Contextualized conversation state passed to downstream agents."
  },
  {
    step: "04",
    name: "Sentiment & Aspect Analysis",
    icon: Sparkles,
    shortDesc: "Extracts fine-grained review sentiments on specific aspects.",
    purpose: "Analyzes thousands of authentic customer reviews from the Amazon dataset to calculate aspect-level scores (durability, comfort, build quality).",
    input: "Raw review corpus for top candidate items.",
    output: "Aspect score matrix with positive/negative ratio breakdowns."
  },
  {
    step: "05",
    name: "Ranking",
    icon: Sliders,
    shortDesc: "Multi-factor objective ranking balancing constraints and sentiment.",
    purpose: "Synthesizes vector proximity, verified aspect sentiment, rating distributions, and budget constraints into a Pareto-optimal priority list.",
    input: "Candidate items + aspect sentiment scores + user constraints.",
    output: "Ordered recommendation rankings with weighted confidence scores."
  },
  {
    step: "06",
    name: "Explainable Recommendations",
    icon: FileCheck,
    shortDesc: "Synthesizes natural language rationale citing authentic review evidence.",
    purpose: "Generates honest, verifiable buying rationale explaining *why* each product was selected, citing real pros and cons extracted from reviews.",
    input: "Top ranked product + aspect breakdown + user constraints.",
    output: "Audited natural language recommendation with cited evidence."
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const retailMind = projectsData.find(p => p.id === 'retailmind-ai');
  const medSafe = projectsData.find(p => p.id === 'medsafe-ai');
  const studentCrud = projectsData.find(p => p.id === 'student-management-system');
  const devops = projectsData.find(p => p.id === 'devops-cicd-practice');

  const currentStage = RETAIL_STAGES[activeStageIndex];
  const CurrentStageIcon = currentStage.icon;

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06] bg-transparent dark:bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-14 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              04 // ENGINEERING PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            Progressive engineering showcases. Short summaries upfront — click "Explore Project" to inspect detailed architectures and specifications.
          </p>
        </motion.div>

        <div className="space-y-12">
          
          {/* ========================================================
              PROJECT 1: RETAILMIND-AI (FLAGSHIP SHOWCASE)
             ======================================================== */}
          {retailMind && (
            <motion.div 
              id={`project-${retailMind.id}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              className="relative rounded-2xl bg-white dark:bg-[#12141c] border border-amber-500/30 dark:border-amber-500/20 overflow-hidden shadow-sm dark:shadow-2xl p-6 sm:p-9 transition-all hover:border-amber-500/50"
            >
              {/* Subtle ambient light */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.05] dark:bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                
                {/* Header & Meta Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-semibold">
                        FLAGSHIP AI PROJECT
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-black/[0.06] dark:border-zinc-800 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        {retailMind.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {retailMind.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 font-medium mt-0.5">
                      {retailMind.subtitle}
                    </p>
                  </div>

                  {/* Actions: Explore Project & GitHub */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedProject(retailMind)}
                      className="px-4 py-2 text-xs font-mono font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    {retailMind.githubPlaceholder && (
                      <a
                        href={retailMind.githubPlaceholder}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#161822] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/[0.08] dark:border-white/[0.08] transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 1-2 Sentence Punchy Description */}
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
                  {retailMind.shortDescription}
                </p>

                {/* ── INTERACTIVE ARCHITECTURE EXPLORER ── */}
                <div className="pt-2">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      Interactive Architecture Explorer
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      Select stage to inspect purpose
                    </span>
                  </div>

                  {/* Sequential Stage Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
                    {RETAIL_STAGES.map((stg, i) => {
                      const isSelected = activeStageIndex === i;
                      const StageIcon = stg.icon;
                      return (
                        <button
                          key={stg.step}
                          onClick={() => setActiveStageIndex(i)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-200 shadow-xs'
                              : 'bg-zinc-50 dark:bg-[#13151f] border-black/[0.06] dark:border-white/[0.05] text-zinc-700 dark:text-zinc-300 hover:border-amber-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
                              {stg.step}
                            </span>
                            <StageIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold tracking-tight line-clamp-1">
                            {stg.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Stage Inspector Card */}
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#0e1017] border border-black/[0.06] dark:border-white/[0.06] text-xs space-y-2">
                    <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-mono font-bold">
                      <CurrentStageIcon className="w-4 h-4" />
                      <span>Stage {currentStage.step}: {currentStage.name}</span>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {currentStage.purpose}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.04] text-[11px] font-mono">
                      <div>
                        <span className="text-zinc-500 block">INPUT DATA:</span>
                        <span className="text-zinc-700 dark:text-zinc-300">{currentStage.input}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">OUTPUT ARTIFACT:</span>
                        <span className="text-zinc-700 dark:text-zinc-300">{currentStage.output}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technology Stack Pills */}
                <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mr-2 font-semibold">
                    Tech Stack:
                  </span>
                  {retailMind.technologies.map((t) => (
                    <span 
                      key={t}
                      className="px-2.5 py-0.5 text-xs font-mono rounded bg-zinc-100 dark:bg-[#151722] text-zinc-800 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================
              PROJECT 2: MEDSAFE AI (HEALTHCARE CASE STUDY)
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
              <div className="space-y-5">
                
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-black/[0.06] dark:border-white/[0.06]">
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

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {medSafe.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-700 dark:text-sky-300 font-medium mt-0.5">
                      {medSafe.subtitle}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedProject(medSafe)}
                      className="px-4 py-2 text-xs font-mono font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    {medSafe.githubPlaceholder && (
                      <a
                        href={medSafe.githubPlaceholder}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#161a27] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/[0.08] dark:border-white/[0.08]"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 1-2 Sentence Description */}
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
                  {medSafe.shortDescription}
                </p>

                {/* Clinical Pipeline Flow Glance */}
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#0e111a] border border-black/[0.06] dark:border-white/[0.06] text-xs">
                  <span className="text-xs font-mono text-sky-700 dark:text-sky-400 uppercase tracking-wider block mb-2 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Clinical Safety Pipeline
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {medSafe.architecture.map((n) => (
                      <div key={n.step} className="p-2 rounded-lg bg-white dark:bg-[#141724] border border-black/[0.06] dark:border-white/[0.04]">
                        <span className="text-[10px] font-mono text-sky-700 dark:text-sky-300 font-bold block">{n.step}</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-200 block text-[11px] truncate">{n.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mr-2 font-semibold">
                    Tech Stack:
                  </span>
                  {medSafe.technologies.map((t) => (
                    <span 
                      key={t}
                      className="px-2.5 py-0.5 text-xs font-mono rounded bg-zinc-100 dark:bg-[#161a27] text-zinc-800 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================
              PROJECTS 3 & 4: 2-COLUMN GRID (STUDENT CRUD & DEVOPS)
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
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121419] border border-black/[0.08] dark:border-white/[0.06] transition-all flex flex-col justify-between shadow-sm hover:border-emerald-500/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {studentCrud.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      {studentCrud.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      {studentCrud.title}
                    </h3>
                    <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                      {studentCrud.subtitle}
                    </p>
                  </div>

                  {/* 1-2 sentence description */}
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {studentCrud.shortDescription}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {studentCrud.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border border-black/[0.06] dark:border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => setSelectedProject(studentCrud)}
                    className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  {studentCrud.githubPlaceholder && (
                    <a
                      href={studentCrud.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
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
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121419] border border-black/[0.08] dark:border-white/[0.06] transition-all flex flex-col justify-between shadow-sm hover:border-purple-500/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {devops.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3" />
                      {devops.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      {devops.title}
                    </h3>
                    <p className="text-xs font-mono text-purple-700 dark:text-purple-400 mt-0.5">
                      {devops.subtitle}
                    </p>
                  </div>

                  {/* 1-2 sentence description */}
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {devops.shortDescription}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {devops.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border border-black/[0.06] dark:border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => setSelectedProject(devops)}
                    className="text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  {devops.githubPlaceholder && (
                    <a
                      href={devops.githubPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>

      {/* 8-Point Detailed Project Specifications Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
