import { useState, useMemo } from "react";
import {
  Code2,
  Globe,
  Database,
  BrainCircuit,
  Wrench,
  Layers,
  Search,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { skillCategories, projectsData } from "../data/portfolioData";
import { fadeUp, VIEW } from "../hooks/useAnimations";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSkillHighlight, setActiveSkillHighlight] = useState(null);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case "Globe":
        return <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case "BrainCircuit":
        return (
          <BrainCircuit className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        );
      case "Database":
        return (
          <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        );
      case "Wrench":
        return (
          <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        );
      case "Layers":
        return <Layers className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      default:
        return <Cpu className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
    }
  };

  const filteredCategories = useMemo(() => {
    return skillCategories
      .filter(
        (cat) => selectedCategory === "all" || cat.id === selectedCategory,
      )
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const q = searchQuery.toLowerCase();
        const activeMatches = cat.activelyUsed.filter((s) =>
          s.toLowerCase().includes(q),
        );
        const exploringMatches = cat.exploring.filter((s) =>
          s.toLowerCase().includes(q),
        );

        return {
          ...cat,
          activelyUsed: activeMatches,
          exploring: exploringMatches,
        };
      })
      .filter((cat) => cat.activelyUsed.length > 0 || cat.exploring.length > 0);
  }, [selectedCategory, searchQuery]);

  const relatedProjectsForSkill = useMemo(() => {
    if (!activeSkillHighlight) return [];
    const skillNorm = activeSkillHighlight.toLowerCase();
    return projectsData.filter((project) =>
      project.technologies.some(
        (tech) =>
          tech.toLowerCase().includes(skillNorm) ||
          skillNorm.includes(tech.toLowerCase()),
      ),
    );
  }, [activeSkillHighlight]);

  const totalSkillCount = useMemo(() => {
    return skillCategories.reduce(
      (acc, cat) => acc + cat.activelyUsed.length + cat.exploring.length,
      0,
    );
  }, []);

  return (
    <section
      id="skills"
      className="py-24 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06] bg-transparent dark:bg-[#0c0d12]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12 border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-1">
              03
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Skills &amp; Capabilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            Applied technical proficiencies and active areas of exploration across software engineering and AI.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border border-transparent hover:border-black/[0.08] dark:hover:border-white/[0.08]"
              }`}
            >
              All Domains ({totalSkillCount})
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border border-transparent hover:border-black/[0.08] dark:hover:border-white/[0.08]"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. C++, RAG, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-white dark:bg-[#121419] border border-black/[0.1] dark:border-white/[0.08] text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors shadow-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Applied in Projects</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rotate-45 bg-amber-500 inline-block" />
            <span>Research &amp; Exploration</span>
          </span>
          {activeSkillHighlight && (
            <span className="text-amber-700 dark:text-amber-300 ml-auto flex items-center gap-1">
              <span>
                Selected: <strong>{activeSkillHighlight}</strong>
              </span>
              <button
                onClick={() => setActiveSkillHighlight(null)}
                className="text-[10px] underline ml-1 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                (clear)
              </button>
            </span>
          )}
        </div>

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
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#12141a] border border-black/[0.08] dark:border-white/[0.06] flex flex-col justify-between shadow-sm dark:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06] dark:border-white/[0.05]">
                    <div className="flex items-center space-x-3">
                      {idx % 2 === 0 ? (
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
                          {getCategoryIcon(cat.iconName)}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rotate-45 rounded-[3px] bg-sky-500/10 border border-sky-500/25 flex items-center justify-center shrink-0 my-1 mx-1">
                          <span className="-rotate-45">
                            {getCategoryIcon(cat.iconName)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-500 line-clamp-1">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-black/[0.06] dark:border-zinc-800">
                      {cat.activelyUsed.length + cat.exploring.length}
                    </span>
                  </div>

                  {cat.activelyUsed.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400/90 mb-2 flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Applied Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cat.activelyUsed.map((skill) => {
                          const isSelected = activeSkillHighlight === skill;
                          return (
                            <button
                              key={skill}
                              onClick={() =>
                                setActiveSkillHighlight(
                                  isSelected ? null : skill,
                                )
                              }
                              className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-colors text-left cursor-pointer flex items-center gap-1.5 ${
                                isSelected
                                  ? "bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 font-semibold shadow-sm"
                                  : "bg-zinc-50 dark:bg-[#0f1116] border-black/[0.08] dark:border-white/[0.06] text-zinc-800 dark:text-zinc-300 hover:border-amber-500/50 hover:bg-amber-500/5"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{skill}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {cat.exploring.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400/90 mb-2 flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rotate-45 bg-amber-500" />
                        Research &amp; Prototyping
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cat.exploring.map((skill) => {
                          const isSelected = activeSkillHighlight === skill;
                          return (
                            <button
                              key={skill}
                              onClick={() =>
                                setActiveSkillHighlight(
                                  isSelected ? null : skill,
                                )
                              }
                              className={`px-3 py-1.5 text-[11px] font-mono rounded-full border transition-colors text-left cursor-pointer flex items-center gap-1.5 ${
                                isSelected
                                  ? "bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 font-semibold shadow-sm"
                                  : "bg-amber-500/5 dark:bg-[#0f1116]/60 border-amber-500/20 dark:border-amber-500/15 text-zinc-700 dark:text-zinc-400 hover:border-amber-500/40"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rotate-45 bg-amber-500" />
                              <span>{skill}</span>
                            </button>
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

        <AnimatePresence>
          {activeSkillHighlight && relatedProjectsForSkill.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 p-6 rounded-3xl bg-amber-500/[0.08] dark:bg-amber-500/[0.04] border border-amber-500/30 text-xs font-mono"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rotate-45 bg-amber-500" />
                <span className="text-amber-800 dark:text-amber-400 font-semibold">
                  Projects applying '{activeSkillHighlight}':
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {relatedProjectsForSkill.map((proj) => (
                  <a
                    key={proj.id}
                    href={`#project-${proj.id}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white dark:bg-[#141724] border border-amber-500/40 text-zinc-900 dark:text-white transition-colors shadow-xs"
                  >
                    <span className="font-semibold">{proj.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
