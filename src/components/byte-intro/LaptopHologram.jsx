import { motion } from "motion/react";
import { FolderCode, Cpu, User, Send, Terminal } from "lucide-react";

export default function LaptopHologram() {
  const cards = [
    {
      label: "Projects",
      icon: FolderCode,
      val: "RetailMind-AI, MedSafe",
      color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    },
    {
      label: "Skills",
      icon: Cpu,
      val: "AI/ML, Python, C++, React",
      color: "text-sky-400 border-sky-500/40 bg-sky-500/10",
    },
    {
      label: "About",
      icon: User,
      val: "CSE @ KMIT Hyderabad",
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    },
    {
      label: "Contact",
      icon: Send,
      val: "Available for Internships",
      color: "text-purple-400 border-purple-500/40 bg-purple-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -15 }}
      transition={{ type: "spring", damping: 22, stiffness: 320 }}
      className="absolute bottom-52 sm:bottom-60 z-30 max-w-lg w-[90vw] sm:w-[480px] pointer-events-none select-none"
    >
      <div className="relative bg-[#0b101c]/90 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-4 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20 text-xs font-mono text-cyan-400">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-bold tracking-wider">
              BYTE // OS v2.0 - PORTFOLIO PREVIEW
            </span>
          </div>
          <span className="text-[10px] text-cyan-300/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            ONLINE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className={`p-2.5 rounded-xl border ${c.color} flex flex-col justify-between`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider">
                    {c.label}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-300 font-sans truncate">
                  {c.val}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-10 bg-gradient-to-t from-transparent to-cyan-500/20 blur-md pointer-events-none" />
      </div>
    </motion.div>
  );
}
