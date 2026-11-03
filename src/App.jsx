import { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProblemSolving from './components/ProblemSolving';
import CurrentlyExploring from './components/CurrentlyExploring';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100 relative selection:bg-amber-500/20 selection:text-amber-200">
      {/* Dynamic, GPU-friendly background with ambient grid, orbs, and noise */}
      <AnimatedBackground />

      {/* Top reading progress line */}
      <ScrollProgress />

      {/* Editorial Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
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

      {/* Editorial Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}
