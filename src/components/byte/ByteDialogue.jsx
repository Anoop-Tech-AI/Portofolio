import React from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * ByteDialogue
 * Cartoon speech bubble above BYTE with animated speech indicator,
 * clean typography, sound toggle, and dismissal.
 */
export default function ByteDialogue({
  text,
  isSpeaking = false,
  isMuted = false,
  onToggleMute,
  onClose,
}) {
  if (!text) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 8 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute bottom-[calc(100%+14px)] right-0 w-64 md:w-72 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-[#161822]/95 backdrop-blur-md rounded-2xl p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.6)] border border-amber-500/20 dark:border-amber-400/20 z-50 pointer-events-auto"
      >
        {/* Header / Voice Status */}
        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
              BYTE
            </span>
            {isSpeaking && (
              <span className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 h-2.5 bg-amber-500 rounded-full animate-bounce" />
                <span className="w-0.5 h-3.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-0.5 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.3s]" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleMute}
              className="p-1 rounded-md text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={isMuted ? "Unmute BYTE" : "Mute BYTE"}
              aria-label={isMuted ? "Unmute BYTE" : "Mute BYTE"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close dialogue"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dialogue Text */}
        <p className="text-xs md:text-sm text-zinc-800 dark:text-zinc-200 leading-snug font-medium select-none">
          {text}
        </p>

        {/* Speech Bubble Downward Tail pointing to BYTE */}
        <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white/95 dark:bg-[#161822]/95 border-b border-r border-amber-500/20 dark:border-amber-400/20 rotate-45 transform" />
      </motion.div>
    </AnimatePresence>
  );
}
