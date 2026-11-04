import { useState, useEffect, useRef } from 'react';
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
  Compass
} from 'lucide-react';
import { useReducedMotion } from '../hooks/useAnimations';

/**
 * BYTE — Anoop's Signature Developer Duck Companion
 * Original 2D vector illustration of an adorable developer duck in a hoodie,
 * with developer glasses, glowing laptop screen, backpack straps,
 * expressive eyes (blinking, smiling), animated waving/pointing wing, and walking webbed feet.
 */
function DuckSvg({ 
  isWalking = false, 
  isWaving = false, 
  isPointing = false, 
  isBlinking = false, 
  isHappy = false, 
  headTilt = 0,
  className = "w-20 h-20" 
}) {
  return (
    <svg 
      viewBox="0 0 140 140" 
      className={`${className} transition-transform duration-200 select-none drop-shadow-md`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BYTE — Anoop's Developer Duck Mascot"
    >
      <defs>
        {/* Duck Body Gradient (Warm Golden Yellow) */}
        <linearGradient id="byteYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>

        {/* Duck Bill & Feet (Vibrant Warm Orange) */}
        <linearGradient id="byteOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Developer Hoodie Gradient (Modern Charcoal / Slate) */}
        <linearGradient id="byteHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Laptop Screen Glow (Cyan / Sky) */}
        <linearGradient id="byteScreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Ground Shadow */}
      <ellipse cx="70" cy="132" rx="38" ry="5.5" fill="rgba(0,0,0,0.18)" />

      {/* Backpack Straps */}
      <rect x="36" y="80" width="6" height="30" rx="3" fill="#0f172a" />
      <rect x="98" y="80" width="6" height="30" rx="3" fill="#0f172a" />

      {/* Webbed Feet (with walking alternation) */}
      <g>
        {/* Left Foot */}
        <path 
          d="M 44 126 C 42 126, 36 132, 38 135 C 44 136, 54 136, 56 132 C 54 128, 48 126, 44 126 Z" 
          fill="url(#byteOrange)" 
          stroke="#c2410c" 
          strokeWidth="1.2"
          style={{
            transformOrigin: '48px 128px',
            transform: isWalking ? 'rotate(-12deg) translateY(-2px)' : 'none',
            transition: 'transform 0.15s ease'
          }}
        />
        {/* Right Foot */}
        <path 
          d="M 84 126 C 82 126, 76 132, 78 135 C 84 136, 94 136, 96 132 C 94 128, 88 126, 84 126 Z" 
          fill="url(#byteOrange)" 
          stroke="#c2410c" 
          strokeWidth="1.2"
          style={{
            transformOrigin: '88px 128px',
            transform: isWalking ? 'rotate(12deg) translateY(2px)' : 'none',
            transition: 'transform 0.15s ease'
          }}
        />
      </g>

      {/* Body / Developer Hoodie */}
      <path 
        d="M 38 124 C 38 88, 50 78, 70 78 C 90 78, 102 88, 102 124 Z" 
        fill="url(#byteHoodie)" 
        stroke="#0f172a" 
        strokeWidth="2"
      />

      {/* Hoodie Collar & Amber Drawstrings */}
      <path d="M 56 78 Q 70 88 84 78" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 64 84 L 64 96" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 76 84 L 76 96" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mini Code Insignia </> on Hoodie */}
      <text x="70" y="110" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">
        &lt;/&gt;
      </text>

      {/* HEAD GROUP (with articulating head tilt) */}
      <g style={{ transformOrigin: '70px 60px', transform: `rotate(${headTilt}deg)`, transition: 'transform 0.3s ease' }}>
        
        {/* Cute Head Feather Tuft */}
        <path d="M 70 20 Q 64 12 70 8 Q 74 14 70 20 Z" fill="url(#byteYellow)" />
        <path d="M 72 20 Q 78 14 80 10 Q 78 17 72 20 Z" fill="#eab308" />

        {/* Round Duck Head */}
        <ellipse 
          cx="70" 
          cy="48" 
          rx="32" 
          ry="30" 
          fill="url(#byteYellow)" 
          stroke="#ca8a04" 
          strokeWidth="1.8" 
        />

        {/* Soft Blush on Cheeks */}
        <circle cx="48" cy="56" r="4.5" fill="#fca5a5" opacity="0.65" />
        <circle cx="92" cy="56" r="4.5" fill="#fca5a5" opacity="0.65" />

        {/* Developer Glasses */}
        <g stroke="#1e293b" strokeWidth="1.8" fill="none">
          <circle cx="56" cy="46" r="10" />
          <circle cx="84" cy="46" r="10" />
          <line x1="66" y1="46" x2="74" y2="46" />
        </g>

        {/* Expressive Eyes */}
        {isBlinking ? (
          // Blinking eyes: cute curved lines
          <>
            <path d="M 50 47 Q 56 52 62 47" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 78 47 Q 84 52 90 47" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
          </>
        ) : isHappy ? (
          // Happy eyes: joyful curved arches ^ ^
          <>
            <path d="M 50 48 Q 56 42 62 48" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 78 48 Q 84 42 90 48" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
          </>
        ) : (
          // Normal bright eyes with catchlight sparkle
          <>
            <circle cx="56" cy="46" r="4.2" fill="#1e293b" />
            <circle cx="57.5" cy="44.2" r="1.4" fill="#ffffff" />
            <circle cx="84" cy="46" r="4.2" fill="#1e293b" />
            <circle cx="85.5" cy="44.2" r="1.4" fill="#ffffff" />
          </>
        )}

        {/* Duck Beak / Bill with friendly smile */}
        <g>
          {/* Main Beak Base */}
          <path 
            d="M 55 54 C 55 52, 60 50, 70 50 C 80 50, 85 52, 85 54 C 86 63, 80 67, 70 67 C 60 67, 54 63, 55 54 Z" 
            fill="url(#byteOrange)" 
            stroke="#c2410c" 
            strokeWidth="1.5" 
          />
          {/* Beak smile curve */}
          <path d="M 58 58 Q 70 62 82 58" fill="none" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" />
          {/* Nostril dots */}
          <circle cx="67" cy="53" r="0.8" fill="#9a3412" />
          <circle cx="73" cy="53" r="0.8" fill="#9a3412" />
        </g>
      </g>

      {/* Left Wing holding small laptop */}
      <path d="M 38 90 Q 34 104 50 110" fill="none" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />

      {/* Miniature Developer Laptop */}
      <g transform="translate(50, 98) rotate(-5)">
        <rect x="0" y="14" width="36" height="5" rx="1.5" fill="#475569" stroke="#0f172a" strokeWidth="1" />
        <rect x="3" y="0" width="30" height="15" rx="2" fill="url(#byteScreen)" stroke="#0f172a" strokeWidth="1" />
        {/* Glowing badge on laptop lid */}
        <circle cx="18" cy="7" r="2.2" fill="#ffffff" opacity="0.9" />
      </g>

      {/* RIGHT WING: Pointing, Waving, or Resting */}
      {isPointing ? (
        // Pointing wing extending outward toward the left (toward website content!)
        <g style={{ transformOrigin: '98px 86px', transform: 'rotate(-48deg) translate(-10px, -6px)', transition: 'transform 0.4s ease-out' }}>
          <path d="M 98 86 Q 118 78 132 64" fill="none" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="132" cy="62" rx="5" ry="4" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
          <path d="M 132 60 L 138 56" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : isWaving ? (
        // Waving wing with CSS animation
        <g 
          className="animate-mascot-wave"
          style={{ transformOrigin: '98px 86px' }}
        >
          <path d="M 98 86 Q 114 80 122 66" fill="none" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="123" cy="64" rx="5" ry="4" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
        </g>
      ) : (
        // Resting wing by side
        <g style={{ transformOrigin: '98px 86px', transform: 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
          <path d="M 98 86 Q 106 98 100 114" fill="none" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

// Fun programmer jokes for BYTE's easter egg feature
const BYTE_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs! ...Though BYTE has to admit, Anoop's light theme is pretty sleek!",
  "Why do Java developers wear glasses? Because they don't C#!",
  "There are only 10 types of people in the world: those who understand binary, and those who don't!",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings!",
  "How many programmers does it take to change a lightbulb? None, that's a hardware problem!"
];

export default function DeveloperMascot({ onOpenResume }) {
  const shouldReduceMotion = useReducedMotion();

  // Animation sequence states:
  // 'walking' (1-3s) -> 'waving' (3-4s) -> 'greeting1' (4-6s) -> 'greeting2' (6-8s) -> 'quickActions' (8-10s) -> 'docked' (10s+)
  const [phase, setPhase] = useState('hidden');
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Conversational response state inside docked menu
  const [dialogueText, setDialogueText] = useState("Hey again! What are we exploring today?");
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  };

  const finishToDocked = () => {
    clearAllTimers();
    setPhase('docked');
    setHeadTilt(0);
    try {
      sessionStorage.setItem('anoop_byte_greeted', 'true');
    } catch {}
  };

  // Run the exact 7-step sequence:
  // 0-1s: Main site renders immediately.
  // 1-3s: BYTE waddles in from bottom-right.
  // 3-4s: Stops and waves.
  // 4-6s: "Hello, Sir!"
  // 6-8s: "I'm BYTE, Anoop's little coding companion."
  // 8-10s: "Welcome to Anoop's portfolio! Shall I show you around?" + 3 quick actions.
  // 10s+: Docks to corner.
  const startGreetingSequence = () => {
    clearAllTimers();
    setIsMenuOpen(false);

    // STEP 2 (1-3s): BYTE waddles in from bottom-right
    setPhase('walking');
    setHeadTilt(3);

    // STEP 3 (3-4s): Stops and waves
    const t1 = setTimeout(() => {
      setPhase('waving');
      setHeadTilt(-3);
    }, 2000);

    // STEP 4 (4-6s): Speech bubble: "Hello, Sir!"
    const t2 = setTimeout(() => {
      setPhase('greeting1');
      setHeadTilt(0);
    }, 3000);

    // STEP 5 (6-8s): Speech bubble: "I'm BYTE, Anoop's little coding companion."
    const t3 = setTimeout(() => {
      setPhase('greeting2');
      setHeadTilt(4);
    }, 5000);

    // STEP 6 (8-10s): "Welcome to Anoop's portfolio! Shall I show you around?" + 3 buttons
    const t4 = setTimeout(() => {
      setPhase('quickActions');
      setHeadTilt(-4);
    }, 7200);

    // STEP 7 (10s+): Natural finish & docking
    const t5 = setTimeout(() => {
      finishToDocked();
    }, 11000);

    timersRef.current.push(t1, t2, t3, t4, t5);
  };

  // Mount logic: check sessionStorage & reduced motion
  useEffect(() => {
    let alreadyGreeted = false;
    try {
      alreadyGreeted = sessionStorage.getItem('anoop_byte_greeted') === 'true';
    } catch {}

    if (shouldReduceMotion || alreadyGreeted) {
      setPhase('docked');
    } else {
      // Step 1: Website loads immediately (0-1s), then start greeting
      const startTimer = setTimeout(() => {
        startGreetingSequence();
      }, 900);
      timersRef.current.push(startTimer);
    }

    // Natural blinking interval
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3600);

    // Occasional subtle head tilt
    const tiltInterval = setInterval(() => {
      setHeadTilt(prev => (prev === 0 ? (Math.random() > 0.5 ? 4 : -4) : 0));
    }, 4800);

    return () => {
      clearAllTimers();
      clearInterval(blinkInterval);
      clearInterval(tiltInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduceMotion]);

  // Click on docked BYTE opens interactive companion menu
  const handleDuckClick = () => {
    setHasInteracted(true);
    setDialogueText("Hey again! What are we exploring today?");
    setIsMenuOpen(prev => !prev);
  };

  const handleReplayGreeting = () => {
    setIsMenuOpen(false);
    startGreetingSequence();
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Conversational action handlers for BYTE
  const handleQuickAction = (sectionId) => {
    scrollToSection(sectionId);
    finishToDocked();
  };

  const handleGuideAbout = () => {
    setDialogueText("Want to meet the human behind the code? That's Anoop!");
    setTimeout(() => {
      scrollToSection('about');
      setIsMenuOpen(false);
    }, 700);
  };

  const handleGuideProjects = () => {
    setDialogueText("Oh, nice! Anoop has been working on some interesting things. Let's start with RetailMind-AI!");
    setTimeout(() => {
      scrollToSection('projects');
      setIsMenuOpen(false);
    }, 700);
  };

  const handleGuideSkills = () => {
    setDialogueText("Quite a few technologies here! Python, C++, Java, React and AI technologies. Let's take a look.");
    setTimeout(() => {
      scrollToSection('skills');
      setIsMenuOpen(false);
    }, 700);
  };

  const handleGuideContact = () => {
    setDialogueText("Want to talk to Anoop? Let's get you connected!");
    setTimeout(() => {
      scrollToSection('contact');
      setIsMenuOpen(false);
    }, 700);
  };

  const handleGuideJoke = () => {
    const nextJoke = BYTE_JOKES[currentJokeIndex % BYTE_JOKES.length];
    setCurrentJokeIndex(prev => prev + 1);
    setDialogueText(nextJoke);
  };

  const handleDismissMenu = () => {
    setDialogueText("Already leaving? No worries! Come back soon. I've got some bugs to fix! 🐛");
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 1100);
  };

  // Status flags for SVG rendering
  const isWalking = phase === 'walking';
  const isWaving = phase === 'waving' || isHovered || phase === 'greeting1';
  const isPointing = phase === 'quickActions';
  const isHappy = isHovered || isMenuOpen || phase === 'greeting2';

  return (
    <>
      {/* ─── OPENING SPEECH BUBBLE (STEPS 4, 5, 6) ─── */}
      <AnimatePresence>
        {(phase === 'greeting1' || phase === 'greeting2' || phase === 'quickActions') && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-28 sm:bottom-32 right-4 sm:right-10 z-50 max-w-[310px] sm:max-w-sm pointer-events-auto"
          >
            <div className="relative bg-white dark:bg-[#181a24] text-zinc-900 dark:text-zinc-100 p-4 sm:p-5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6)] border border-amber-500/30">
              
              {/* Top Bar with Title & Skip Button */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center space-x-1.5 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>BYTE • Coding Companion</span>
                </div>
                {/* Skip button as explicitly requested in UX rules */}
                <button
                  onClick={finishToDocked}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Skip introduction"
                >
                  Skip ✕
                </button>
              </div>

              {/* Dynamic Speech Messages */}
              <AnimatePresence mode="wait">
                {phase === 'greeting1' && (
                  <motion.div
                    key="g1"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                      "Hello, Sir!" 👋
                    </p>
                  </motion.div>
                )}

                {phase === 'greeting2' && (
                  <motion.div
                    key="g2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1"
                  >
                    <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                      "I'm BYTE, Anoop's little coding companion." 💻
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      Anoop • CSE @ KMIT Hyderabad ('28)
                    </p>
                  </motion.div>
                )}

                {phase === 'quickActions' && (
                  <motion.div
                    key="g3"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5"
                  >
                    <p className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-900 dark:text-white leading-snug">
                      "Welcome to Anoop's portfolio! Shall I show you around?" 🚀
                    </p>

                    {/* 3 Quick Action Buttons as requested */}
                    <div className="grid grid-cols-1 gap-1.5 pt-0.5 font-mono text-xs">
                      <button
                        onClick={() => handleQuickAction('projects')}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-900 dark:text-amber-200 hover:text-black font-semibold transition-colors cursor-pointer text-left"
                      >
                        <span className="flex items-center space-x-1.5">
                          <FolderCode className="w-3.5 h-3.5" />
                          <span>Explore Projects</span>
                        </span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleQuickAction('about')}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer text-left"
                      >
                        <span className="flex items-center space-x-1.5">
                          <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Meet Anoop</span>
                        </span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleQuickAction('skills')}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer text-left"
                      >
                        <span className="flex items-center space-x-1.5">
                          <Cpu className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                          <span>Technical Skills</span>
                        </span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
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

      {/* ─── DOCKED CONVERSATIONAL GUIDE MENU (ON BYTE CLICK) ─── */}
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

              {/* Dynamic Interactive Speech Area */}
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
                  onClick={handleGuideAbout}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium">Meet Anoop</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleGuideProjects}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <FolderCode className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium">Projects & Architecture</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleGuideSkills}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <Cpu className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span className="font-medium">Technical Skills</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleGuideContact}
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

                {/* Easter Egg Joke Button */}
                <button
                  onClick={handleGuideJoke}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 transition-colors group cursor-pointer text-left"
                >
                  <span className="flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium">Tell me a joke!</span>
                  </span>
                  <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-900 dark:text-amber-200">Fun</span>
                </button>
              </div>

              {/* Replay & Dismiss Footer */}
              <div className="p-3 bg-zinc-50 dark:bg-[#10121a] border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={handleReplayGreeting}
                  className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-zinc-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay Tour</span>
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

      {/* ─── THE FLOATING / WALKING BYTE MASCOT ENTITY ─── */}
      <motion.div
        layout
        initial={{ x: 160, y: 60, opacity: 0 }}
        animate={
          phase === 'walking'
            ? { x: [140, 60, 0], y: [40, -4, 0], opacity: 1, scale: 1.05 }
            : phase === 'waving' || phase === 'greeting1' || phase === 'greeting2' || phase === 'quickActions'
            ? { x: 0, y: 0, opacity: 1, scale: 1.05 }
            : phase === 'docked'
            ? { x: 0, y: 0, opacity: 1, scale: 1 }
            : { x: 160, y: 60, opacity: 0 }
        }
        transition={
          phase === 'walking'
            ? { duration: 1.8, ease: 'easeOut' }
            : { type: 'spring', damping: 22, stiffness: 260 }
        }
        className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative group">
          {/* Subtle hint pill on initial dock if not yet interacted */}
          {phase === 'docked' && !hasInteracted && !isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="absolute -top-7 right-0 whitespace-nowrap bg-amber-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md pointer-events-none select-none"
            >
              Ask BYTE! 🦆
            </motion.div>
          )}

          {/* Interactive button trigger wrapping BYTE */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleDuckClick}
            aria-label="Open BYTE coding companion assistant"
            className="relative flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {/* Ambient soft glow around duck */}
            <div className="absolute inset-0 rounded-full bg-amber-500/20 dark:bg-amber-400/20 blur-md group-hover:scale-125 transition-transform duration-300 -z-10" />

            <div className={isWalking ? "animate-duck-waddle" : phase === 'docked' ? "animate-mascot-idle" : ""}>
              <DuckSvg 
                isWalking={isWalking}
                isWaving={isWaving} 
                isPointing={isPointing}
                isBlinking={isBlinking} 
                isHappy={isHappy}
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
