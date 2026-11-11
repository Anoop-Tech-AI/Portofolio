import { useState, useEffect } from "react";
import { Menu, X, FileText, Terminal, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../hooks/useTheme";

const NAV_LINKS = [
  { num: "01", name: "About", href: "#about" },
  { num: "02", name: "Journey", href: "#journey" },
  { num: "03", name: "Skills", href: "#skills" },
  { num: "04", name: "Projects", href: "#projects" },
  { num: "05", name: "DSA", href: "#problem-solving" },
  { num: "06", name: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        "about",
        "journey",
        "skills",
        "projects",
        "problem-solving",
        "contact",
      ];
      const scrollPosition = window.scrollY + 140;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F8F8F5]/90 dark:bg-[#0c0d10]/90 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center space-x-2.5 text-zinc-900 dark:text-white focus:outline-none"
            aria-label="Anoop Home"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-[#14161d] border border-amber-500/30 dark:border-white/[0.1] group-hover:border-amber-500/70 flex items-center justify-center text-amber-600 dark:text-amber-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex items-center text-sm sm:text-base tracking-wider font-mono">
              <span className="font-extrabold text-zinc-900 dark:text-white">
                ANOOP
              </span>
              <span className="text-zinc-500 text-xs ml-1">{"//dev"}</span>
            </div>
          </motion.a>

          <nav className="hidden lg:flex items-center space-x-1 bg-white/80 dark:bg-[#12141a]/85 border border-black/[0.08] dark:border-white/[0.07] px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-1 text-xs font-mono rounded-full transition-colors duration-150 flex items-center space-x-1 ${
                    isActive
                      ? "text-amber-700 dark:text-amber-300 font-semibold"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.03] dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-amber-500/15 border border-amber-500/30 -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    {link.num}.
                  </span>
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center space-x-2.5">
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#14161f] dark:hover:bg-[#1b1e2a] text-zinc-700 dark:text-zinc-300 border border-black/[0.08] dark:border-white/[0.08] transition-colors cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700 transition-transform hover:-rotate-12" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenResume}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono rounded-lg text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#12141a] dark:hover:bg-[#181a23] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.16] dark:hover:border-white/[0.16] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Resume</span>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <span>Get in Touch</span>
            </motion.a>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-[#14161e] border border-black/[0.08] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs flex items-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            <button
              onClick={onOpenResume}
              className="p-2 text-zinc-700 dark:text-zinc-300 rounded-lg bg-zinc-100 dark:bg-[#14161e] border border-black/[0.08] dark:border-white/[0.08] text-xs flex items-center gap-1 font-mono"
              aria-label="View Resume"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-400 hover:bg-black/[0.05] dark:hover:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.08] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-500" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 p-4 rounded-xl bg-white/95 dark:bg-[#0f1117]/95 border border-black/[0.08] dark:border-white/[0.1] backdrop-blur-xl shadow-2xl transition-all animate-fadeIn">
          <nav className="flex flex-col space-y-1 font-mono text-xs">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-amber-700 dark:text-amber-300 bg-amber-500/15 font-semibold"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.04] dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-zinc-400 dark:text-zinc-600">
                      {link.num}.
                    </span>
                    <span>{link.name}</span>
                  </span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-[#151722] border border-black/[0.08] dark:border-white/[0.08] rounded-lg cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>View Resume</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs font-mono uppercase tracking-wider font-bold rounded-lg bg-amber-500 text-black shadow-md cursor-pointer"
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
