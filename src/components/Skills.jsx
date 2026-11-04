import { useState, useMemo } from 'react';
import { 
  Code2, 
  Globe, 
  Database, 
  BrainCircuit, 
  Wrench, 
  Layers, 
  Search, 
  Cpu,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { skillCategories, projectsData } from '../data/portfolioData';
import { fadeUp, VIEW } from '../hooks/useAnimations';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillHighlight, setActiveSkillHighlight] = useState(null);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Globe': return <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'Database': return <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      default: return <Cpu className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
    }
  };

  const filteredCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const q = searchQuery.toLowerCase();
        const activeMatches = cat.activelyUsed.filter((s) => s.toLowerCase().includes(q));
        const exploringMatches = cat.exploring.filter((s) => s.toLowerCase().includes(q));
        
        return {
          ...cat,
          activelyUsed: activeMatches,
          exploring: exploringMatches
        };
      })
      .filter((cat) => cat.activelyUsed.length > 0 || cat.exploring.length > 0);
  }, [selectedCategory, searchQuery]);

  // Find projects that use this skill
  const relatedProjectsForSkill = useMemo(() => {
    if (!activeSkillHighlight) return [];
    const skillNorm = activeSkillHighlight.toLowerCase();
    return projectsData.filter((project) => 
      project.technologies.some((tech) => tech.toLowerCase().includes(skillNorm) || skillNorm.includes(tech.toLowerCase()))
    );
  }, [activeSkillHighlight]);

  const totalSkillCount = useMemo(() => {
    return skillCategories.reduce(
      (acc, cat) => acc + cat.activelyUsed.length + cat.exploring.length, 
      0
    );
  }, []);

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              03 // TECHNICAL TOOLING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Skills & Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            Cataloging {totalSkillCount} languages, systems, and AI frameworks separated by production usage and active research.
          </p>
        </motion.div>

        {/* Legend & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-[#121419] border border-black/[0.08] dark:border-white/[0.06]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.03]'
              }`}
            >
              All Categories ({totalSkillCount})
            </motion.button>
            {skillCategories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.03]'
                }`}
              >
                {cat.title}
              </motion.button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by keyword (e.g. C++, RAG, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-[#121419] border border-black/[0.1] dark:border-white/[0.08] text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Legend indicator bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Actively Used in Projects</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span>Currently Exploring / Prototyping</span>
          </span>
          {activeSkillHighlight && (
            <span className="text-amber-700 dark:text-amber-300 ml-auto flex items-center gap-1">
              <span>Selected: <strong>{activeSkillHighlight}</strong></span>
              <button 
                onClick={() => setActiveSkillHighlight(null)}
                className="text-[10px] underline ml-1 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                (clear)
              </button>
            </span>
          )}
        </div>

        {/* Categories Grid with Staggered Entrance */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -3, borderColor: 'rgba(245,158,11,0.4)' }}
                className="p-6 rounded-xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] transition-all flex flex-col justify-between group shadow-sm dark:shadow-lg"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.06] dark:border-white/[0.05]">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-[#0e1015] border border-black/[0.06] dark:border-white/[0.06]">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-black/[0.06] dark:border-zinc-800">
                      {cat.activelyUsed.length + cat.exploring.length}
                    </span>
                  </div>

                  {/* Actively Used Technologies */}
                  {cat.activelyUsed.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400/90 mb-2 flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Actively Applied
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.activelyUsed.map((skill) => {
                          const isSelected = activeSkillHighlight === skill;
                          return (
                            <motion.button
                              key={skill}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => setActiveSkillHighlight(isSelected ? null : skill)}
                              className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 font-semibold shadow-sm'
                                  : 'bg-zinc-50 dark:bg-[#0f1116] border-black/[0.08] dark:border-white/[0.06] text-zinc-800 dark:text-zinc-300 hover:border-black/[0.2] dark:hover:border-white/[0.2] hover:text-black dark:hover:text-white'
                              }`}
                            >
                              {skill}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Exploring Technologies */}
                  {cat.exploring.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400/90 mb-2 flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Exploring & Researching
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.exploring.map((skill) => {
                          const isSelected = activeSkillHighlight === skill;
                          return (
                            <motion.button
                              key={skill}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => setActiveSkillHighlight(isSelected ? null : skill)}
                              className={`px-2 py-0.5 text-[11px] font-mono rounded-md border transition-all text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 font-semibold shadow-sm'
                                  : 'bg-amber-500/5 dark:bg-[#0f1116]/60 border-amber-500/20 dark:border-amber-500/15 text-zinc-700 dark:text-zinc-400 hover:border-amber-500/40 hover:text-amber-800 dark:hover:text-amber-300'
                              }`}
                            >
                              {skill}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skill to Project Connection Card with Animation */}
        <AnimatePresence>
          {activeSkillHighlight && relatedProjectsForSkill.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 p-5 rounded-xl bg-amber-500/[0.08] dark:bg-amber-500/[0.04] border border-amber-500/30 text-xs font-mono"
            >
              <span className="text-amber-800 dark:text-amber-400 font-semibold block mb-2">
                Projects applying '{activeSkillHighlight}':
              </span>
              <div className="flex flex-wrap gap-2">
                {relatedProjectsForSkill.map((proj) => (
                  <motion.a
                    key={proj.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={`#project-${proj.id}`}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-white dark:bg-[#13151c] border border-black/[0.1] dark:border-white/[0.1] text-zinc-800 dark:text-zinc-200 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-500/50 transition-colors shadow-sm"
                  >
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
