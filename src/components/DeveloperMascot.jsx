import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles, FolderCode, Cpu, Send, FileText, RotateCcw } from 'lucide-react';

/**
 * Custom 2D Developer Mascot — "Byte / Dev-Anoop"
 * An original vector illustration of a friendly developer in a hoodie,
 * wearing round glasses, holding a mini glowing laptop, with an expressive face and waving arm.
 */
function MascotSvg({ isWaving, isBlinking, isHappy = false, className = "w-20 h-20" }) {
  return (
    <svg 
      viewBox="0 0 140 140" 
      className={`${className} transition-transform duration-200 select-none drop-shadow-md`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Anoop Developer Mascot"
    >
      <defs>
        {/* Hoodie gradient */}
        <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b4252" />
          <stop offset="100%" stop-color="#2e3440" />
        </linearGradient>
        {/* Amber accent gradient */}
        <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>
        {/* Laptop screen glow */}
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
        {/* Skin tone */}
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#fde2cb" />
          <stop offset="100%" stop-color="#f8c9a3" />
        </radialGradient>
      </defs>

      {/* Gentle drop shadow */}
      <ellipse cx="70" cy="132" rx="42" ry="6" fill="rgba(0,0,0,0.18)" />

      {/* Backpack straps behind shoulders */}
      <rect x="36" y="78" width="8" height="34" rx="4" fill="#1e222b" />
      <rect x="96" y="78" width="8" height="34" rx="4" fill="#1e222b" />

      {/* Body / Developer Hoodie */}
      <path 
        d="M 38 126 C 38 88, 50 74, 70 74 C 90 74, 102 88, 102 126 Z" 
        fill="url(#hoodieGrad)" 
        stroke="#1a1c23" 
        strokeWidth="2"
      />
      {/* Hoodie Collar & Drawstrings */}
      <path d="M 58 74 Q 70 86 82 74" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 64 82 L 64 96" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 76 82 L 76 96" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Mini code logo on chest */}
      <text x="70" y="108" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">
        &lt;/&gt;
      </text>

      {/* Head / Face */}
      <rect 
        x="44" 
        y="24" 
        width="52" 
        height="50" 
        rx="22" 
        fill="url(#skinGrad)" 
        stroke="#1e222b" 
        strokeWidth="2" 
      />

      {/* Stylish Hair */}
      <path 
        d="M 42 38 C 42 22, 54 14, 70 14 C 86 14, 98 22, 98 38 C 96 30, 86 26, 70 26 C 54 26, 44 30, 42 38 Z" 
        fill="#1e222b" 
      />
      {/* Side bangs */}
      <path d="M 42 36 Q 48 38 46 48 Q 42 44 42 36 Z" fill="#1e222b" />
      <path d="M 98 36 Q 92 38 94 48 Q 98 44 98 36 Z" fill="#1e222b" />

      {/* Cute Ears */}
      <circle cx="43" cy="50" r="5" fill="#f8c9a3" stroke="#1e222b" strokeWidth="1.5" />
      <circle cx="97" cy="50" r="5" fill="#f8c9a3" stroke="#1e222b" strokeWidth="1.5" />

      {/* Glasses Frames */}
      <rect x="49" y="42" width="18" height="15" rx="5" fill="none" stroke="#1e222b" strokeWidth="2" />
      <rect x="73" y="42" width="18" height="15" rx="5" fill="none" stroke="#1e222b" strokeWidth="2" />
      <line x1="67" y1="48" x2="73" y2="48" stroke="#1e222b" strokeWidth="2" />

      {/* Expressive Eyes: Normal / Blinking / Happy */}
      {isBlinking ? (
        // Closed / blinking eyes
        <>
          <path d="M 53 50 Q 58 53 63 50" fill="none" stroke="#1e222b" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 77 50 Q 82 53 87 50" fill="none" stroke="#1e222b" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : isHappy ? (
        // Happy curved eyes ^ ^
        <>
          <path d="M 53 51 Q 58 45 63 51" fill="none" stroke="#1e222b" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 77 51 Q 82 45 87 51" fill="none" stroke="#1e222b" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        // Open bright eyes with reflection sparkles
        <>
          <circle cx="58" cy="49" r="3.6" fill="#1e222b" />
          <circle cx="59.2" cy="47.6" r="1.2" fill="#ffffff" />
          <circle cx="82" cy="49" r="3.6" fill="#1e222b" />
          <circle cx="83.2" cy="47.6" r="1.2" fill="#ffffff" />
        </>
      )}

      {/* Cheerful Blush */}
      <circle cx="50" cy="56" r="3" fill="#fca5a5" opacity="0.6" />
      <circle cx="90" cy="56" r="3" fill="#fca5a5" opacity="0.6" />

      {/* Friendly Smile */}
      <path d="M 64 61 Q 70 66 76 61" fill="none" stroke="#1e222b" strokeWidth="2" strokeLinecap="round" />

      {/* Left Arm holding laptop */}
      <path d="M 40 92 Q 38 108 52 114" fill="none" stroke="#2e3440" strokeWidth="7" strokeLinecap="round" />

      {/* Miniature Laptop */}
      <g transform="translate(52, 102) rotate(-6)">
        {/* Base */}
        <rect x="0" y="14" width="36" height="5" rx="1.5" fill="#475569" stroke="#1e222b" strokeWidth="1" />
        {/* Screen */}
        <rect x="3" y="0" width="30" height="15" rx="2" fill="url(#screenGrad)" stroke="#1e222b" strokeWidth="1" />
        {/* Apple/Code glyph on laptop lid */}
        <circle cx="18" cy="7" r="2.2" fill="#ffffff" opacity="0.85" />
      </g>

      {/* Right Arm: Natural Waving Animation */}
      <g 
        className={isWaving ? "animate-mascot-wave" : ""}
        style={{
          transformOrigin: '96px 88px',
          transform: isWaving ? undefined : 'rotate(0deg)'
        }}
      >
        <path d="M 96 88 Q 112 82 118 70" fill="none" stroke="#2e3440" strokeWidth="7" strokeLinecap="round" />
        {/* Hand waving */}
        <circle cx="120" cy="66" r="5" fill="#f8c9a3" stroke="#1e222b" strokeWidth="1.5" />
        {/* Thumb */}
        <path d="M 117 65 Q 114 62 116 60" fill="none" stroke="#1e222b" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function DeveloperMascot({ onOpenResume }) {
  // Animation state phases: 'hidden' | 'entering' | 'greeting1' | 'greeting2' | 'docked'
  const [phase, setPhase] = useState('hidden');
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const timersRef = useRef([]);

  // Clear helper
  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  };

  // Run the entrance & greeting sequence
  const startGreetingSequence = () => {
    clearAllTimers();
    setPhase('entering');
    setIsWaving(false);
    setIsMenuOpen(false);

    // 1. Enter and slide into position
    const t1 = setTimeout(() => {
      setPhase('greeting1');
      setIsWaving(true);
    }, 1100);

    // 2. Wave arm and show second part of speech
    const t2 = setTimeout(() => {
      setPhase('greeting2');
    }, 3800);

    // 3. Complete greeting and smoothly dock to bottom-right corner
    const t3 = setTimeout(() => {
      setIsWaving(false);
      setPhase('docked');
      try {
        sessionStorage.setItem('anoop_mascot_greeted', 'true');
      } catch {}
    }, 7200);

    timersRef.current.push(t1, t2, t3);
  };

  // Mount logic: check if already greeted in this session
  useEffect(() => {
    let alreadyGreeted = false;
    try {
      alreadyGreeted = sessionStorage.getItem('anoop_mascot_greeted') === 'true';
    } catch {}

    if (alreadyGreeted) {
      setPhase('docked');
    } else {
      // Delay entrance slightly for initial page load smoothness
      const initTimer = setTimeout(() => {
        startGreetingSequence();
      }, 700);
      timersRef.current.push(initTimer);
    }

    // Natural blinking interval
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3400);

    return () => {
      clearAllTimers();
      clearInterval(blinkInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle click on the mascot
  const handleMascotClick = () => {
    setHasInteracted(true);
    setIsMenuOpen(prev => !prev);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1400);
  };

  const handleReplayGreeting = () => {
    setIsMenuOpen(false);
    startGreetingSequence();
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ─── FULL ENTRANCE / GREETING SPEECH BUBBLE OVERLAY ─── */}
      <AnimatePresence>
        {(phase === 'greeting1' || phase === 'greeting2') && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-28 sm:bottom-32 right-4 sm:right-10 z-50 max-w-[290px] sm:max-w-sm pointer-events-auto"
          >
            <div className="relative bg-white dark:bg-[#181a24] text-zinc-900 dark:text-zinc-100 p-4 sm:p-5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6)] border border-amber-500/30">
              {/* Top status indicator & dismiss */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center space-x-1.5 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>Anoop's Assistant</span>
                </div>
                <button
                  onClick={() => {
                    clearAllTimers();
                    setPhase('docked');
                    try {
                      sessionStorage.setItem('anoop_mascot_greeted', 'true');
                    } catch {}
                  }}
                  className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors"
                  aria-label="Dismiss greeting"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Dynamic Speech Text */}
              <AnimatePresence mode="wait">
                {phase === 'greeting1' ? (
                  <motion.div
                    key="g1"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1"
                  >
                    <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                      "Hello, Sir! Welcome to Anoop's corner." 👋
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Step inside to explore code, algorithms, and projects.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="g2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1"
                  >
                    <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                      "I'm a developer who loves building intelligent things." ⚡
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Feel free to click me anytime for quick shortcuts!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Speech bubble tail pointing downwards */}
              <div 
                className="absolute -bottom-2 right-12 w-4 h-4 bg-white dark:bg-[#181a24] border-r border-b border-amber-500/30 transform rotate-45"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── INTERACTIVE MENU MODAL (ON CLICK) ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 380 }}
            className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-50 w-[300px] sm:w-[330px] max-w-[calc(100vw-2rem)] pointer-events-auto"
          >
            <div className="bg-white dark:bg-[#141620] text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-amber-500/30 overflow-hidden">
              
              {/* Header */}
              <div className="p-4 bg-amber-50/70 dark:bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                      Anoop's Assistant
                    </h4>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                      CSE @ KMIT • Class of 2028
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-6 h-6 rounded-md hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  aria-label="Close assistant menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bio summary */}
              <div className="p-4 pb-2">
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  "Hey! I'm Anoop. I specialize in Software Engineering, AI/ML (RAG & Agentic workflows), and Data Structures & Algorithms. Where would you like to jump?"
                </p>
              </div>

              {/* Quick Navigation Shortcuts */}
              <div className="p-3 pt-1 space-y-1.5 font-mono text-xs">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2">
                    <FolderCode className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Featured Projects</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('skills')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-sky-500" />
                    <span className="font-medium">Skills & Stack</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('problem-solving')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium">DSA & Problem Solving</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2">
                    <Send className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Get in Touch</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                {onOpenResume && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenResume();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                  >
                    <span className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">View Resume</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>

              {/* Footer action: Replay greeting */}
              <div className="p-3 bg-zinc-50 dark:bg-[#10121a] border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={handleReplayGreeting}
                  className="inline-flex items-center space-x-1 text-[11px] font-mono text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay Greeting</span>
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[11px] font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── THE FLOATING / DOCKED MASCOT ENTITY ─── */}
      <motion.div
        layout
        initial={{ x: 140, y: 80, opacity: 0 }}
        animate={
          phase === 'entering' || phase === 'greeting1' || phase === 'greeting2'
            ? { x: 0, y: 0, opacity: 1, scale: 1.1 }
            : phase === 'docked'
            ? { x: 0, y: 0, opacity: 1, scale: 1 }
            : { x: 140, y: 80, opacity: 0 }
        }
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-40"
        onMouseEnter={() => {
          setIsHovered(true);
          setIsWaving(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsWaving(false);
        }}
      >
        <div className="relative group">
          {/* Subtle click me hint pill on initial dock if not interacted */}
          {phase === 'docked' && !hasInteracted && !isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute -top-7 right-0 whitespace-nowrap bg-amber-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md pointer-events-none select-none"
            >
              Click me! 💬
            </motion.div>
          )}

          {/* Interactive button trigger wrapping the mascot */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleMascotClick}
            aria-label="Open developer mascot assistant"
            className="relative flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {/* Ambient soft glow around mascot */}
            <div className="absolute inset-0 rounded-full bg-amber-500/15 dark:bg-amber-400/20 blur-md group-hover:scale-125 transition-transform duration-300 -z-10" />

            <div className="animate-mascot-idle">
              <MascotSvg 
                isWaving={isWaving} 
                isBlinking={isBlinking} 
                isHappy={isHovered || isMenuOpen}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

