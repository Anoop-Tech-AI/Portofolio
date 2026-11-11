import { motion } from "motion/react";
import { personalInfo } from "../data/portfolioData";
import { fadeUp, slideLeft, VIEW } from "../hooks/useAnimations";

export default function About() {
  const paragraphs = personalInfo.aboutParagraphs || [
    "I am an undergraduate Computer Science and Engineering student at Keshav Memorial Institute of Technology (KMIT), Hyderabad, graduating in 2028. I enjoy building web applications, exploring artificial intelligence, and working on data structures and algorithms.",
    "I like understanding how things work under the hood, writing clean and maintainable code in C++, JavaScript, and Python, and creating practical projects from backend APIs to responsive user interfaces.",
    "My goal is to continuously learn, sharpen my problem-solving skills, and grow into a skilled software engineer building useful software.",
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
            Undergraduate software developer at KMIT Hyderabad, building practical web apps and exploring AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEW}
            custom={0.1}
            className="lg:col-span-7 space-y-6 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed"
          >
            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {p}
              </p>
            ))}

            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-xs font-mono font-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>KMIT 2024 - 2028</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default">
                <span className="w-1.5 h-1.5 rotate-45 bg-sky-500" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEW}
            custom={0.15}
            className="lg:col-span-5"
          >
            <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#12141b] border border-black/[0.08] dark:border-white/[0.06] space-y-6 shadow-sm dark:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-500/50 group">
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold">
                    Education & Background
                  </h3>
                </div>
                <div className="w-6 h-6 rotate-45 rounded-[2px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 -rotate-45 bg-amber-500" />
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-400 dark:text-zinc-500 block text-[11px] mb-1">
                    INSTITUTION
                  </span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-sans block">
                    {personalInfo.institution}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 dark:text-zinc-500 block text-[11px] mb-1">
                    PROGRAM
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-sans font-medium text-xs sm:text-sm block">
                    B.Tech in Computer Science and Engineering
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[11px] mb-1">
                      PERIOD
                    </span>
                    <span className="text-amber-700 dark:text-amber-400 font-bold">
                      2024 - 2028
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[11px] mb-1">
                      LOCATION
                    </span>
                    <span className="text-zinc-800 dark:text-zinc-300 font-sans">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <span className="text-zinc-400 dark:text-zinc-500 block text-[11px] mb-3">
                    KEY FOCUS AREAS
                  </span>
                  <div className="flex flex-wrap gap-2 font-sans">
                    {[
                      "Full-Stack Web Development",
                      "Applied AI & Machine Learning",
                      "Data Structures & Algorithms",
                    ].map((area, i) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.06] text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/50 hover:bg-amber-500/5 hover:shadow-sm cursor-default"
                      >
                        {i % 2 === 0 ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        ) : (
                          <span className="w-1.5 h-1.5 rotate-45 bg-amber-500 shrink-0" />
                        )}
                        <span>{area}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
