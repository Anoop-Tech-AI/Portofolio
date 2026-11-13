import { useEffect } from "react";
import { X, Keyboard, Navigation, Search, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SHORTCUT_GROUPS = [
  {
    title: "Global Controls",
    items: [
      { key: "T", desc: "Toggle dark / light theme", icon: Sun },
      { key: "/", desc: "Focus search / filter input", icon: Search },
      { key: "?", desc: "Show / hide shortcuts guide", icon: Keyboard },
      { key: "Esc", desc: "Close dialogs & exit active input", icon: X },
    ],
  },
  {
    title: "Section Quick-Jumps",
    items: [
      { key: "0 / H", desc: "Top / Hero Overview", icon: Navigation },
      { key: "1", desc: "01. About & Education", icon: Navigation },
      { key: "2", desc: "02. Engineering Journey", icon: Navigation },
      { key: "3", desc: "03. Technical Skills", icon: Navigation },
      { key: "4", desc: "04. Featured Projects & Sandbox", icon: Navigation },
      { key: "5", desc: "05. Problem Solving & DSA", icon: Navigation },
      { key: "6", desc: "06. Contact & Inquiries", icon: Navigation },
    ],
  },
];

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#0f1118] border border-black/[0.1] dark:border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.08] dark:border-white/[0.08] bg-zinc-50 dark:bg-[#131620]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
                  <Keyboard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Keyboard Navigation
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Instant shortcuts for power browsing
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close shortcuts modal"
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
              {SHORTCUT_GROUPS.map((group) => (
                <div key={group.title} className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                    {group.title}
                  </span>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-[#151824] border border-black/[0.05] dark:border-white/[0.05]"
                      >
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                          {item.desc}
                        </span>
                        <kbd className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-white dark:bg-[#0c0d12] text-zinc-900 dark:text-zinc-100 border border-black/[0.12] dark:border-white/[0.12] shadow-xs">
                          {item.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3.5 bg-zinc-50 dark:bg-[#131620] border-t border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-zinc-500">
              <span className="text-center sm:text-left">
                Press any key directly while browsing to navigate.
              </span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs transition-colors cursor-pointer shadow-sm"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

