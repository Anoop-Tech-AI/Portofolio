import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative z-10 bg-[#07080c] border-t border-zinc-900 text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Credit */}
          <div className="flex flex-col items-center sm:items-start space-y-1 text-center sm:text-left">
            <p className="text-sm font-medium text-zinc-200">
              Designed & Built by <span className="text-cyan-400 font-semibold">Anoop</span>.
            </p>
            <p className="text-xs text-zinc-400">
              © {currentYear} Anoop • All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-sky-400 hover:border-zinc-700 transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.email}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-zinc-700 transition-colors"
              aria-label="Email Anoop"
              title="Email Anoop"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-cyan-500/40 transition-colors ml-2"
              aria-label="Scroll to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
