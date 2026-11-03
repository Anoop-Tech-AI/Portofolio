import { useState, useEffect } from 'react';
import { Menu, X, FileText, Terminal } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Problem Solving', href: '#problem-solving' },
  { name: 'Exploring', href: '#exploring' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['about', 'education', 'skills', 'projects', 'problem-solving', 'exploring', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#090a0f]/80 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)] py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <a 
            href="#" 
            className="group flex items-center space-x-2 text-white font-bold tracking-wider focus:outline-none"
            aria-label="Anoop Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-sky-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex items-center text-base sm:text-lg">
              <span className="font-extrabold tracking-widest text-white">ANOOP</span>
              <span className="text-cyan-400 font-mono text-sm ml-1">.dev</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#11131a]/70 border border-white/[0.07] px-3 py-1.5 rounded-full backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'text-cyan-300 bg-cyan-500/10 shadow-[0_0_12px_rgba(56,189,248,0.2)] font-semibold' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg text-zinc-300 bg-zinc-900/90 hover:text-white hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-black font-semibold hover:opacity-90 transition-all shadow-[0_0_16px_rgba(56,189,248,0.25)]"
            >
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onOpenResume}
              className="p-2 text-zinc-300 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 text-xs flex items-center gap-1"
              aria-label="View Resume"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#0e1017]/95 border border-zinc-800/90 backdrop-blur-xl shadow-2xl transition-all animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'text-cyan-300 bg-cyan-500/10 font-semibold' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-zinc-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 text-xs font-medium rounded-lg text-zinc-200 bg-zinc-900 border border-zinc-700/80"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Resume</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-black shadow-md"
              >
                Contact Me
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
