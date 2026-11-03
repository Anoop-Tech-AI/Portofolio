import { useState, useMemo } from 'react';
import { 
  Code2, 
  Globe, 
  Database, 
  BrainCircuit, 
  Wrench, 
  Layers, 
  Search, 
  Terminal,
  Cpu
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4 text-sky-400" />;
      case 'Globe': return <Globe className="w-4 h-4 text-emerald-400" />;
      case 'Database': return <Database className="w-4 h-4 text-amber-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-4 h-4 text-cyan-400" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-purple-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-rose-400" />;
      default: return <Cpu className="w-4 h-4 text-zinc-400" />;
    }
  };

  const filteredCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const matchingSkills = cat.skills.filter((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return {
          ...cat,
          skills: matchingSkills
        };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [selectedCategory, searchQuery]);

  const totalSkillCount = useMemo(() => {
    return skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl">
            A comprehensive catalog of {totalSkillCount} languages, frameworks, AI architectures, and computer science fundamentals.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3" />
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800 max-w-full overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              All ({totalSkillCount})
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills (e.g. RAG, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-[#11131a]/80 border border-zinc-800/80 hover:border-zinc-700/90 transition-all duration-200 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/70 mb-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 leading-tight">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                    {cat.skills.length}
                  </span>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900/90 text-zinc-300 border border-zinc-800 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-zinc-800/80 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-zinc-500 text-sm">
            No technical skills found matching "{searchQuery}".
          </div>
        )}

      </div>
    </section>
  );
}
