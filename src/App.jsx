import { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
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
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 relative selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Scroll indicator bar at top */}
      <ScrollProgress />

      {/* Main Header navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Content Sections */}
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Education />
        <Skills />
        <Projects />
        <ProblemSolving />
        <CurrentlyExploring />
        <Contact />
      </main>

      {/* Footer */}
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
