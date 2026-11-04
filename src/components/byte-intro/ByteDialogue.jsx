import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight } from 'lucide-react';

/**
 * ByteDialogue
 * Renders the animated cinematic speech bubble with progressive text reveal,
 * expressive styling, speech tail pointing to BYTE, and optional click-to-advance controls.
 */
export default function ByteDialogue({
  currentStep = 0,
  dialogueList = [],
  onAdvance,
  showAdvanceHint = true,
}) {
  const currentLine = dialogueList[currentStep] || '';
  const [displayedText, setDisplayedText] = useState('');

  // Smooth typewriter / word reveal effect for the current dialogue
  useEffect(() => {
    let index = 0;
    const speed = 22; // ms per character

    const timer = setInterval(() => {
      index++;
      setDisplayedText(currentLine.slice(0, index));
      if (index >= currentLine.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [currentLine]);

  return (
    <div className="relative max-w-xl w-full px-4 select-none">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 18, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.96 }}
        transition={{ type: 'spring', damping: 24, stiffness: 320 }}
        onClick={onAdvance}
        className="relative bg-[#11141e]/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/40 shadow-[0_16px_50px_rgba(245,158,11,0.22)] cursor-pointer group"
      >
        {/* Top meta-bar */}
        <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-400 flex items-center space-x-1">
              <span>BYTE</span>
              <span className="text-zinc-500 font-normal">•</span>
              <span className="text-zinc-400 font-normal">Anoop's Companion</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-zinc-400 group-hover:text-amber-400 transition-colors">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Interactive Intro</span>
          </div>
        </div>

        {/* Dynamic Revealing Text */}
        <div className="min-h-[56px] sm:min-h-[64px] flex items-center">
          <p className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-snug sm:leading-relaxed">
            {displayedText}
            {displayedText.length < currentLine.length && (
              <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-1 bg-amber-400 animate-pulse" />
            )}
          </p>
        </div>

        {/* Bottom prompt hint */}
        {showAdvanceHint && (
          <div className="mt-2.5 flex items-center justify-end">
            <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-zinc-400 group-hover:text-amber-300 transition-colors">
              <span>Click anywhere to advance</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        )}

        {/* Speech Bubble Tail Pointing Down toward BYTE */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#11141e] border-r border-b border-amber-500/40 transform rotate-45" />
      </motion.div>
    </div>
  );
}
