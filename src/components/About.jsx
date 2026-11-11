import { Sparkles, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { personalInfo } from "../data/portfolioData";
import { fadeUp, slideLeft, VIEW } from "../hooks/useAnimations";

export default function About() {
  const paragraphs = personalInfo.aboutParagraphs || [
    "I am an undergraduate Computer Science and Engineering student at Keshav Memorial Institute of Technology (KMIT), Hyderabad, graduating in 2028. My engineering journey centers on building reliable backends, exploring modern AI systems, and sharpening algorithmic problem solving.",
    "What excites me most about software is understanding what happens beneath the syntax. Rather than treating libraries as black boxes, I focus on first principles — mastering memory management and computational complexity in C++, designing clean RESTful microservices in Node.js and FastAPI, and exploring vector embeddings.",
    "In Artificial Intelligence, I focus on practical architectures: Retrieval-Augmented Generation (RAG) that grounds LLMs in verified facts, and multi-agent systems using LangGraph to break complex workflows into verifiable autonomous steps.",
    "My goal is to grow into a disciplined software engineer capable of designing scalable, fault-tolerant systems and context-aware applications that create tangible impact.",
  ];

  return (
    <section
      id="about"
      className="py-24 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06]"
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
              01 
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              About Me
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
            Undergraduate software developer at KMIT Hyderabad, building
            resilient backends and intelligent systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEW}
            custom={0.1}
            className="lg:col-span-8 space-y-5 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              "Code is more than syntax — it's reasoning materialized."
            </h3>

            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-zinc-700 dark:text-zinc-300">
                {p}
              </p>
            ))}

            <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Engineering Pillars:
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-[#12141a] border border-black/[0.06] dark:border-white/[0.06]">
                First Principles
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-[#12141a] border border-black/[0.06] dark:border-white/[0.06]">
                Asymptotic Discipline
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-[#12141a] border border-black/[0.06] dark:border-white/[0.06]">
                Practical RAG & Agents
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEW}
            custom={0.15}
            className="lg:col-span-4 space-y-4"
          >
            <div className="p-6 rounded-2xl bg-white dark:bg-[#12141b] border border-black/[0.08] dark:border-white/[0.06] space-y-4 shadow-sm dark:shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
                  Academic Card
                </span>
                <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 block font-mono text-[11px]">
                    INSTITUTION
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {personalInfo.institution}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 block font-mono text-[11px]">
                    PROGRAM & BRANCH
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200">
                    B.Tech in Computer Science & Engineering
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 block font-mono text-[11px]">
                    EXPECTED GRADUATION
                  </span>
                  <span className="text-amber-700 dark:text-amber-400 font-mono font-bold">
                    2024 – 2028
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 block font-mono text-[11px]">
                    LOCATION
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-300">
                    {personalInfo.location}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 block font-mono text-[11px]">
                    CORE FOCUS
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-300 font-mono">
                    Software Engineering • AI/ML • DSA
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                  ACADEMIC STATUS
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-black/[0.06] dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 text-[11px] font-mono">
                  {personalInfo.cgpa}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/[0.05] dark:bg-amber-500/[0.03] text-xs font-mono space-y-1">
              <p className="text-amber-900 dark:text-amber-300 font-medium italic">
                "Understanding technologies from first principles rather than
                treating frameworks as black boxes."
              </p>
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                — Engineering Philosophy
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
