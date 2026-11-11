import { Mail, ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personalInfo } from "../data/portfolioData";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 relative z-10 bg-zinc-100/80 dark:bg-[#07080a] border-t border-black/[0.08] dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center sm:items-start space-y-1 text-center sm:text-left">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 font-mono">
              Designed &amp; Built by{" "}
              <span className="text-amber-700 dark:text-amber-400 font-bold">
                Anoop
              </span>
              .
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              © {currentYear} Anoop • Computer Science &amp; Engineering (KMIT
              '28)
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-[#111319] border border-black/[0.08] dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-[#111319] border border-black/[0.08] dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              href={personalInfo.socials.email}
              className="p-2 rounded-lg bg-white dark:bg-[#111319] border border-black/[0.08] dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
              aria-label="Email Anoop"
              title="Email Anoop"
            >
              <Mail className="w-4 h-4" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white dark:bg-[#111319] border border-black/[0.08] dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors ml-2 cursor-pointer"
              aria-label="Scroll to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
