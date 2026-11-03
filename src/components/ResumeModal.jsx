import { FileText, Download, X, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#11131a] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Curriculum Vitae / Resume</h3>
              <p className="text-xs text-zinc-400">Anoop • B.Tech CSE (KMIT '28)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-sm text-zinc-300">
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-zinc-300">
              <span className="font-semibold text-white">Notice for Recruiters & Visitors:</span> Anoop is in active undergraduate studies (2024–2028). The verified PDF resume can be downloaded directly once linked, or requested via email.
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-medium text-zinc-200">Current Resume Highlights:</p>
            <ul className="space-y-1.5 text-zinc-400 list-none">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Computer Science & Engineering at KMIT, Hyderabad</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hands-on projects in Agentic AI, RAG, and Full-Stack Engineering</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Core competencies in C++, Python, Java, JavaScript, Data Structures</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>
          
          <a
            href="/resume.pdf"
            download="Anoop_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            onClick={() => {
              // Graceful notification in case file is not yet dropped into public folder
            }}
          >
            <Download className="w-4 h-4" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
