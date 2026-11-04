import { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ResumeModal({ isOpen, onClose }) {
  const [fileStatus, setFileStatus] = useState('checking'); // 'available' | 'missing' | 'checking'

  useEffect(() => {
    if (!isOpen) return;
    
    // Check if public/resume.pdf exists via HEAD request
    let isMounted = true;
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => {
        if (!isMounted) return;
        if (res.ok) {
          setFileStatus('available');
        } else {
          setFileStatus('missing');
        }
      })
      .catch(() => {
        if (isMounted) setFileStatus('available');
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg bg-white dark:bg-[#12141c] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-900 dark:text-zinc-100 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient subtle glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/[0.08] dark:bg-amber-500/[0.05] rounded-full blur-2xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-mono tracking-tight">Curriculum Vitae</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">Anoop • B.Tech CSE (KMIT '28)</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Modal Body */}
          <div className="py-5 space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
            {fileStatus === 'missing' ? (
              <div className="p-3.5 rounded-xl bg-red-500/[0.08] border border-red-500/25 flex items-start space-x-3">
                <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs font-mono leading-relaxed text-red-700 dark:text-red-300">
                  <span className="font-semibold text-zinc-900 dark:text-white">File Notification:</span> `public/resume.pdf` could not be located in the static folder. Please place your PDF at `public/resume.pdf`.
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#0e1015] border border-black/[0.06] dark:border-white/[0.06] flex items-start space-x-3">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs font-mono leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-white">Verified Profile:</span> Currently pursuing B.Tech in CSE (2024–2028). The PDF download provides verified credentials and project specifications.
                </div>
              </div>
            )}

            <div className="space-y-2 text-xs font-mono">
              <p className="font-semibold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider text-[11px]">Academic &amp; Technical Highlights:</p>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 list-none">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Computer Science &amp; Engineering at KMIT, Hyderabad</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Engineered RetailMind-AI (Agentic RAG) &amp; MedSafe AI</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>C++, Python, Java, React, Node.js, Express, MongoDB, FastAPI</span>
                </li>
              </ul>
            </div>

            <p className="text-[11px] font-mono text-zinc-500 pt-1">
              File source: <code className="text-zinc-700 dark:text-zinc-400">/public/resume.pdf</code>
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-end gap-2.5 font-mono">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#181a24] dark:hover:bg-[#202330] text-zinc-800 dark:text-zinc-200 border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              <span>Open in Tab</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/resume.pdf"
              download="Anoop_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
