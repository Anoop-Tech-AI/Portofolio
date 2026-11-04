import React from "react";
import {
  Compass,
  Code2,
  FolderGit2,
  User,
  GraduationCap,
  Mail,
  Zap,
  Sparkles,
  Coffee,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion } from "motion/react";

/**
 * ByteChatPanel
 * Interactive portfolio navigation & character action drawer.
 */
export default function ByteChatPanel({
  isOpen,
  onClose,
  onNavigate,
  onAction,
  isMuted,
  onToggleMute,
}) {
  if (!isOpen) return null;

  const navItems = [
    { id: "about", label: "About Anoop", icon: User, desc: "Background & Education" },
    { id: "projects", label: "Featured Projects", icon: FolderGit2, desc: "Interactive Apps & AI" },
    { id: "skills", label: "Technical Skills", icon: Code2, desc: "Languages & Frameworks" },
    { id: "timeline", label: "Education & Journey", icon: GraduationCap, desc: "KMIT & Milestones" },
    { id: "contact", label: "Contact Anoop", icon: Mail, desc: "Get in touch directly" },
  ];

  const actions = [
    { key: "jump", label: "Do a Jump!", icon: Zap, state: "jumping" },
    { key: "wave", label: "Wave Hello", icon: Sparkles, state: "waving" },
    { key: "type", label: "Write Code", icon: Code2, state: "typing" },
    { key: "sleep", label: "Take a Nap", icon: Coffee, state: "sleeping" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="absolute bottom-[calc(100%+14px)] right-0 w-80 md:w-88 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-[#161822]/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.7)] border border-amber-500/20 dark:border-amber-400/20 overflow-hidden z-50 pointer-events-auto"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-transparent px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 dark:bg-amber-400/15 border border-amber-500/30 flex items-center justify-center">
            <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              BYTE Assistant
            </h4>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
              Interactive Guide & Companion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
            aria-label={isMuted ? "Unmute Voice" : "Mute Voice"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close Assistant Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-3.5 space-y-3 max-h-[70vh] overflow-y-auto">
        {/* Navigation Quick Links */}
        <div>
          <span className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase px-1">
            Where to?
          </span>
          <div className="mt-1.5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-amber-500/10 dark:hover:bg-amber-400/10 border border-transparent hover:border-amber-500/20 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center group-hover:bg-amber-500/20 text-zinc-600 dark:text-zinc-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 group-hover:translate-x-0.5 group-hover:text-amber-500 transition-all">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mascot Play Actions */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase px-1">
            Character Tricks
          </span>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {actions.map((act) => {
              const ActIcon = act.icon;
              return (
                <button
                  key={act.key}
                  onClick={() => onAction(act.state)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-amber-500/10 dark:hover:bg-amber-400/10 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-amber-500/30 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all text-left"
                >
                  <ActIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] truncate">{act.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
