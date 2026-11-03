import { FileText, Download, X, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#12141c] border border-white/[0.08] rounded-xl shadow-2xl p-6 sm:p-8 text-zinc-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient subtle glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/[0.04] rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono tracking-tight">Curriculum Vitae</h3>
              <p className="text-xs text-zinc-400 font-mono">Anoop • B.Tech CSE (KMIT '28)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-sm text-zinc-300">
          <div className="p-3.5 rounded-lg bg-[#0e1015] border border-white/[0.06] flex items-start space-x-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs font-mono leading-relaxed text-zinc-300">
              <span className="font-semibold text-white">Academic Status:</span> Currently pursuing B.Tech in CSE (2024–2028). The PDF download provides verified credentials and project specifications.
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <p className="font-medium text-zinc-300 uppercase tracking-wider text-[11px]">Key Highlights:</p>
            <ul className="space-y-2 text-zinc-400 list-none">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Computer Science & Engineering at KMIT, Hyderabad</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Engineered RetailMind-AI (Agentic RAG) & MedSafe AI</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>C++, Python, Java, React, Node.js, Express, MongoDB, FastAPI</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-end gap-3 font-mono">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>
          
          <a
            href="/resume.pdf"
            download="Anoop_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
