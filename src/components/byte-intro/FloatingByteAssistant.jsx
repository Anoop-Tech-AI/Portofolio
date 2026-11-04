import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowRight,
  FolderCode,
  Cpu,
  Send,
  User,
  RotateCcw,
  FileText,
  Sparkles,
  Compass,
} from 'lucide-react';
import ByteCharacter from './ByteCharacter';

const BYTE_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs! ...Though BYTE has to admit, Anoop's light theme is pretty sleek!",
  "Why do Java developers wear glasses? Because they don't C#!",
  "There are only 10 types of people in the world: those who understand binary, and those who don't!",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings!",
  "How many programmers does it take to change a lightbulb? None, that's a hardware problem!",
];

/**
 * FloatingByteAssistant
 * The interactive docked mascot that sits in the bottom-right corner after the cinematic intro.
 * Features conversational navigation, developer joke easter eggs, resume launch,
 * and a one-click "Replay Cinematic Intro" trigger.
 */
export default function FloatingByteAssistant({ onOpenResume, onReplayIntro }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dialogueText, setDialogueText] = useState("Hey again! What are we exploring today?");
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);

  // Natural blinking & subtle idle head tilt
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);

    const tiltInterval = setInterval(() => {
      setHeadTilt((prev) => (prev === 0 ? (Math.random() > 0.5 ? 4 : -4) : 0));
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(tiltInterval);
    };
  }, []);

  const handleDuckClick = () => {
    setHasInteracted(true);
    setDialogueText("Hey again! What are we exploring today?");
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGuideSection = (id, speech) => {
    setDialogueText(speech);
    setTimeout(() => {
      scrollToSection(id);
      setIsMenuOpen(false);
    }, 650);
  };

  const handleGuideJoke = () => {
    const nextJoke = BYTE_JOKES[currentJokeIndex % BYTE_JOKES.length];
    setCurrentJokeIndex((prev) => prev + 1);
    setDialogueText(nextJoke);
  };

  const handleDismissMenu = () => {
    setDialogueText("Already leaving? No worries! Come back soon. I've got some bugs to fix! 🐛");
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 1100);
  };

  return (
    <>
      {/* ─── DOCKED INTERACTIVE ASSISTANT MENU ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 380 }}
            className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-50 w-[310px] sm:w-[340px] max-w-[calc(100vw-2rem)] pointer-events-auto"
          >
            <div className="bg-white dark:bg-[#141620] text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-amber-500/30 overflow-hidden">
              {/* Header */}
              <div className="p-3.5 bg-amber-500/10 dark:bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold text-xs shadow-xs">
                    🦆
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center space-x-1.5">
                      <span>BYTE</span>
                      <span className="text-[10px] font-mono font-normal text-amber-700 dark:text-amber-400">Companion</span>
                    </h4>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                      Anoop • KMIT Hyderabad ('28)
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDismissMenu}
                  className="w-6 h-6 rounded-md hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close BYTE assistant menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Interactive Dialogue Box */}
              <div className="p-3.5 bg-zinc-50/70 dark:bg-zinc-900/40 border-b border-black/[0.04] dark:border-white/[0.04]">
                <div className="flex items-start space-x-2">
                  <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                    "{dialogueText}"
                  </p>
                </div>
              </div>

              {/* Navigation Shortcuts */}
              <div className="p-3 space-y-1.5 font-mono text-xs">
                <button
                  onClick={() =>
                    handleGuideSection('about', "Want to meet the human behind the code? That's Anoop!")
                  }
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium">Meet Anoop</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() =>
                    handleGuideSection(
                      'projects',
                      "Oh, nice! Anoop has been working on some interesting things. Let's start with RetailMind-AI!"
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <FolderCode className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium">Projects & Architecture</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() =>
                    handleGuideSection(
                      'skills',
                      "Quite a few technologies here! Python, C++, Java, React and AI technologies. Let's take a look."
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <Cpu className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span className="font-medium">Technical Skills</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() =>
                    handleGuideSection('contact', "Want to talk to Anoop? Let's get you connected!")
                  }
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <Send className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium">Contact Anoop</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                {onOpenResume && (
                  <button
                    onClick={() => {
                      setDialogueText("Here is Anoop's technical resume!");
                      setTimeout(() => {
                        setIsMenuOpen(false);
                        onOpenResume();
                      }, 400);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                  >
                    <span className="flex items-center space-x-2.5">
                      <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="font-medium">View Resume</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                {/* Easter Egg Joke */}
                <button
                  onClick={handleGuideJoke}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium">Tell me a joke!</span>
                  </span>
                  <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-900 dark:text-amber-200">
                    Fun
                  </span>
                </button>
              </div>

              {/* Footer with Replay Intro & Dismiss */}
              <div className="p-3 bg-zinc-50 dark:bg-[#10121a] border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-zinc-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay Intro 🎬</span>
                </button>
                <button
                  onClick={handleDismissMenu}
                  className="text-[11px] font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DOCKED DUCK ENTITY (BOTTOM-RIGHT) ─── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
        className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-40 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative group">
          {/* Subtle initial hint pill if not yet interacted */}
          {!hasInteracted && !isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="absolute -top-7 right-0 whitespace-nowrap bg-amber-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md pointer-events-none"
            >
              Ask BYTE! 🦆
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleDuckClick}
            aria-label="Open BYTE coding companion assistant"
            className="relative flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {/* Ambient soft glow */}
            <div className="absolute inset-0 rounded-full bg-amber-500/20 dark:bg-amber-400/20 blur-md group-hover:scale-125 transition-transform duration-300 -z-10" />

            <div className="animate-mascot-idle">
              <ByteCharacter
                isWaving={isHovered}
                eyeState={isBlinking ? 'blinking' : isHovered ? 'happy' : 'normal'}
                mouthState={isHovered ? 'smile' : 'smile'}
                headTilt={headTilt}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

