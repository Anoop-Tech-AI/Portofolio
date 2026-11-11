import { useState, useEffect } from "react";
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
import ResumeModal from "./components/ResumeModal";
import { initSwarm } from "./swarm";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    initSwarm({ autoStart: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F5] dark:bg-[#0c0d10] text-[#202124] dark:text-zinc-100 relative selection:bg-amber-500/25 selection:text-amber-900 dark:selection:text-amber-200 transition-colors duration-300">
      
      <AnimatedBackground />

      <ScrollProgress />

      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <ProblemSolving />
        <CurrentlyExploring />
        <Contact />
      </main>

      <Footer />

      <BackToTop />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
