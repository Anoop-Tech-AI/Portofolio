import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolioData';
import { fadeUp, slideLeft, VIEW } from '../hooks/useAnimations';

export default function About() {
  const { personalNarrative } = personalInfo;

  return (
    <section id="about" className="py-24 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12 border-b border-white/[0.08]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
              01 // BACKGROUND & PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              About Me
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            Undergraduate developer at KMIT Hyderabad, learning to engineer resilient backends and intelligent systems.
          </p>
        </motion.div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
            
            {/* Lead Narrative Paragraph */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              custom={0.1}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                "Code is more than syntax — it's reasoning materialized."
              </h3>
              <p className="text-zinc-300">
                {personalNarrative.story}
              </p>
            </motion.div>

            {/* AI & Intelligent Systems Section */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              custom={0.18}
              whileHover={{ y: -2, borderColor: 'rgba(245,158,11,0.25)' }}
              className="p-6 sm:p-7 rounded-xl bg-[#12141a] border border-white/[0.06] space-y-3 transition-colors shadow-lg"
            >
              <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>What draws me to Artificial Intelligence</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {personalNarrative.aiMotivation}
              </p>
            </motion.div>

            {/* Learning Approach & First Principles */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEW}
              custom={0.24}
              className="space-y-4"
            >
              <h4 className="text-base font-semibold text-white tracking-tight">
                My Approach to Learning & Engineering
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {personalNarrative.learningApproach}
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {personalNarrative.aspiration}
              </p>
            </motion.div>

            {/* Core Values Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                {
                  idx: '01',
                  name: 'FIRST PRINCIPLES',
                  desc: 'Deconstructing abstractions to understand memory, state, and algorithmic bounds.'
                },
                {
                  idx: '02',
                  name: 'PRACTICAL DESIGN',
                  desc: 'Prioritizing clean architecture, predictability, and maintainable data contracts.'
                },
                {
                  idx: '03',
                  name: 'CONTINUOUS EXPANSION',
                  desc: 'Consistently building hands-on projects to validate emerging AI and system patterns.'
                }
              ].map((val, i) => (
                <motion.div
                  key={val.idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEW}
                  custom={0.3 + i * 0.08}
                  whileHover={{ y: -3, borderColor: 'rgba(245,158,11,0.3)' }}
                  className="p-4 rounded-lg bg-[#101217] border border-white/[0.05] transition-colors"
                >
                  <span className="text-amber-400 font-mono text-xs block mb-1">
                    {val.idx} / {val.name}
                  </span>
                  <p className="text-xs text-zinc-400">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Editorial Side Rail: Quick Facts & Academic Context */}
          <motion.div 
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEW}
            custom={0.15}
            className="lg:col-span-4 space-y-5"
          >
            
            <div className="p-6 rounded-xl bg-[#12141b] border border-white/[0.06] space-y-5 shadow-xl">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 pb-2 border-b border-white/[0.06]">
                Academic & Profile Card
              </h4>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-zinc-500 block font-mono">INSTITUTION</span>
                  <span className="font-semibold text-zinc-200">{personalInfo.institution}</span>
                </div>

                <div>
                  <span className="text-zinc-500 block font-mono">DEGREE & BRANCH</span>
                  <span className="text-zinc-200">B.Tech in Computer Science & Engineering</span>
                </div>

                <div>
                  <span className="text-zinc-500 block font-mono">GRADUATION TIMELINE</span>
                  <span className="text-amber-400 font-mono">2024 – 2028 (Expected)</span>
                </div>

                <div>
                  <span className="text-zinc-500 block font-mono">LOCATION</span>
                  <span className="text-zinc-300">{personalInfo.location}</span>
                </div>

                <div>
                  <span className="text-zinc-500 block font-mono">PRIMARY STACK</span>
                  <span className="text-zinc-300 font-mono">C++, Python, React, Node.js, FastAPI</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <span className="text-[11px] font-mono text-zinc-500 block mb-1">ACADEMIC RECORD STATUS</span>
                <span className="inline-block px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] font-mono">
                  {personalInfo.cgpa}
                </span>
              </div>
            </div>

            {/* Engineering Manifesto Quote */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] text-xs font-mono space-y-2 transition-all shadow-md"
            >
              <p className="text-amber-300/90 leading-relaxed italic">
                "Understanding technologies deeply rather than simply using them."
              </p>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">— Anoop's Core Engineering Rule</span>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
