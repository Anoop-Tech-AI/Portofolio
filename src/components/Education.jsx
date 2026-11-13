import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookCheck,
} from "lucide-react";
import { educationData } from "../data/portfolioData";

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 relative z-10 bg-[#0c0e14]/40 border-t border-zinc-900"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3" />
        </div>

        <div className="relative p-6 sm:p-10 rounded-2xl bg-[#11131a]/90 border border-zinc-800/90 shadow-2xl backdrop-blur-md overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/80">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-md bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 text-xs font-mono">
                <span>{educationData.period}</span>
                <span>•</span>
                <span>Class of {educationData.expectedGraduation}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {educationData.degree}
              </h3>
              <p className="text-base sm:text-lg text-cyan-300/90 font-medium">
                {educationData.branch}
              </p>
            </div>

            <div className="flex flex-col sm:items-start lg:items-end space-y-1 text-xs text-zinc-400">
              <span className="text-sm font-semibold text-zinc-200">
                {educationData.institution}
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {educationData.location}
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                Expected Graduation: {educationData.expectedGraduation}
              </span>
            </div>
          </div>

          <div className="py-6 border-b border-zinc-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start space-x-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 block mb-0.5">
                  CGPA Standing
                </span>
                <span className="text-sm font-semibold text-zinc-200">
                  {educationData.cgpaPlaceholder}
                </span>
                <p className="text-xs text-zinc-500 mt-1">
                  Official cumulative grade point average will be updated as
                  semester transcripts are formalized.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start space-x-3">
              <BookCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 block mb-0.5">
                  Degree Focus
                </span>
                <span className="text-sm font-semibold text-zinc-200">
                  Systems, Algorithms & Intelligent Architectures
                </span>
                <p className="text-xs text-zinc-500 mt-1">
                  Rigorous computer science curriculum blending foundational
                  theory with practical application engineering.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
              Academic Pursuits & Coursework Emphasis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {educationData.highlights.map((point, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/70 text-xs text-zinc-300 leading-relaxed"
                >
                  <span className="text-cyan-400 font-mono block mb-1">
                    0{idx + 1}.
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
