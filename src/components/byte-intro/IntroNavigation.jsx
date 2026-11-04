import { motion } from "motion/react";
import { FolderCode, User, Cpu, ArrowRight } from "lucide-react";

/**
 * IntroNavigation
 * Renders the 3 attractive interactive navigation options at the conclusion
 * of BYTE's dialogue sequence, allowing visitors to jump directly into the portfolio.
 */
export default function IntroNavigation({ onSelectOption, onHoverOption }) {
  const options = [
    {
      id: "projects",
      label: "Explore Anoop's Projects",
      badge: "RetailMind-AI, MedSafe & more",
      section: "projects",
      icon: FolderCode,
      color: "amber",
      borderHover:
        "hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]",
      iconBg:
        "bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-black",
      btnBg: "bg-[#181c28]/95",
    },
    {
      id: "about",
      label: "Meet Anoop",
      badge: "B.Tech CSE @ KMIT Hyderabad",
      section: "about",
      icon: User,
      color: "emerald",
      borderHover:
        "hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
      iconBg:
        "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black",
      btnBg: "bg-[#181c28]/95",
    },
    {
      id: "skills",
      label: "Discover His Skills",
      badge: "AI/ML, Python, C++, React & Tools",
      section: "skills",
      icon: Cpu,
      color: "sky",
      borderHover:
        "hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]",
      iconBg:
        "bg-sky-500/20 text-sky-400 group-hover:bg-sky-500 group-hover:text-black",
      btnBg: "bg-[#181c28]/95",
    },
  ];

  return (
    <div className="w-full max-w-2xl px-4 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between px-1 mb-1">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            Choose Where To Begin:
          </p>
          <span className="text-[11px] font-mono text-amber-400/80">
            Press 1, 2, or 3
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {options.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + idx * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={() => onHoverOption && onHoverOption(opt.id)}
                onMouseLeave={() => onHoverOption && onHoverOption(null)}
                onClick={() => onSelectOption(opt.id, opt.section)}
                className={`relative flex flex-col justify-between p-4 rounded-2xl border border-white/[0.12] ${opt.btnBg} ${opt.borderHover} transition-all duration-300 text-left group cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${opt.iconBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-white transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-tight mb-1">
                    {opt.label}
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {opt.badge}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:text-white">
                  <span>Enter section</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
