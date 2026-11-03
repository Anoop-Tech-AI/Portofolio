import { Compass, Lightbulb, GraduationCap, MapPin, Target, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const pillars = [
    {
      icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
      title: "First-Principles Understanding",
      description: "Believing in understanding technologies deeply from architectural foundations rather than merely consuming high-level abstractions."
    },
    {
      icon: <Target className="w-5 h-5 text-cyan-400" />,
      title: "Intelligent & Scalable Systems",
      description: "Dedicated to designing systems where modern software design patterns converge with machine learning and autonomous agent pipelines."
    },
    {
      icon: <Compass className="w-5 h-5 text-teal-400" />,
      title: "Continuous Exploration",
      description: "Consistently expanding technical horizons through hands-on development, open problem-solving, and state-of-the-art AI paradigms."
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Background & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#11131a]/80 border border-zinc-800/80 shadow-xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center space-x-3 text-xs font-mono text-cyan-400/90 mb-5 pb-3 border-b border-zinc-800/80">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
                <span>anoop@portfolio:~$ cat narrative.md</span>
              </div>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                {personalInfo.aboutParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quick Info Strip */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-xs text-zinc-300">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Institution</span>
                    <span className="font-medium text-white">{personalInfo.institution}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs text-zinc-300">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-teal-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Location</span>
                    <span className="font-medium text-white">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Core Philosophy Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 px-1">
              Engineering Mindset
            </div>

            {pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-[#11131a]/60 border border-zinc-800/70 hover:border-zinc-700 hover:bg-[#11131a] transition-all group"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 shrink-0 group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Aspirations Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/20 via-zinc-900/40 to-indigo-950/20 border border-cyan-500/20 text-xs">
              <span className="text-cyan-400 font-semibold block mb-1">Career Aspiration:</span>
              <p className="text-zinc-300 leading-relaxed">
                Aiming to design high-throughput, fault-tolerant backends and intelligent autonomous systems that translate complex technical logic into seamless software experiences.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
