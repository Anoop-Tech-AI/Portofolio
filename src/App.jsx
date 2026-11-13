import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProblemSolving from "./components/ProblemSolving";
import CurrentlyExploring from "./components/CurrentlyExploring";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import KeyboardShortcutsModal from "./components/KeyboardShortcutsModal";
import ShareModal from "./components/ShareModal";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { initSwarm } from "./swarm";

export default function App() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { isShortcutsOpen, setIsShortcutsOpen, activeFeedback } =
    useKeyboardShortcuts();

  useEffect(() => {
    initSwarm({ autoStart: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F5] dark:bg-[#0c0d10] text-[#202124] dark:text-zinc-100 relative selection:bg-amber-500/25 selection:text-amber-900 dark:selection:text-amber-200 transition-colors duration-300">
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar onOpenShortcuts={() => setIsShortcutsOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <ProblemSolving />
        <CurrentlyExploring />
        <Contact onOpenShare={() => setIsShareOpen(true)} />
      </main>
      <Footer onOpenShare={() => setIsShareOpen(true)} />
      <BackToTop />

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsShortcutsOpen(true)}
          aria-label="Keyboard Shortcuts"
          title="Keyboard shortcuts (?)"
          className="px-3 py-2 rounded-xl bg-white dark:bg-[#14161f] text-zinc-700 dark:text-zinc-300 border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:bg-zinc-100 dark:hover:bg-[#1a1d28] transition-colors flex items-center space-x-2 cursor-pointer text-xs font-mono"
        >
          <Keyboard className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="hidden sm:inline font-semibold">Shortcuts</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-[10px] font-bold border border-black/[0.08] dark:border-white/[0.08]">
            ?
          </kbd>
        </button>
      </div>

      <AnimatePresence>
        {activeFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-zinc-900/90 dark:bg-zinc-100/95 text-white dark:text-zinc-900 text-xs font-mono shadow-2xl backdrop-blur-md border border-white/10 dark:border-black/10 flex items-center space-x-2 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-semibold">{activeFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
