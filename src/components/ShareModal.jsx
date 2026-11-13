import { useState, useEffect } from "react";
import { X, Copy, Check, Share2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LinkedinIcon, TwitterIcon, WhatsAppIcon } from "./Icons";

const SHARE_URL = "https://anoop-tech-ai.github.io/Portofolio/";
const SHARE_TITLE = "Anoop — Software & AI Engineer Portfolio";
const SHARE_TEXT =
  "Explore Anoop's portfolio — Computer Science & Engineering student at KMIT Hyderabad, building Agentic RAG, full-stack systems & solving algorithmic problems:";

export default function ShareModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: SHARE_TITLE,
        text: SHARE_TEXT,
        url: SHARE_URL,
      });
    } catch {}
  };

  const sharePlatforms = [
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
      icon: LinkedinIcon,
      color: "hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/10 text-sky-700 dark:text-sky-300",
    },
    {
      name: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`,
      icon: TwitterIcon,
      color: "hover:border-zinc-500/40 hover:bg-zinc-500/10 text-zinc-900 dark:text-zinc-100",
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`,
      icon: WhatsAppIcon,
      color: "hover:border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg bg-white dark:bg-[#0f1118] border border-black/[0.1] dark:border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.08] dark:border-white/[0.08] bg-zinc-50 dark:bg-[#131620]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Share Portfolio
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Share with recruiters, peers, and tech teams
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close share dialog"
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-[#141622] border border-black/[0.06] dark:border-white/[0.06] flex items-center gap-3.5">
                <img
                  src="/og-image.png"
                  alt="Portfolio Preview"
                  className="w-20 h-12 object-cover rounded-lg border border-black/[0.08] dark:border-white/[0.08] shrink-0"
                />
                <div className="min-w-0 flex-1 font-mono text-xs">
                  <p className="font-bold text-zinc-900 dark:text-white truncate">
                    {SHARE_TITLE}
                  </p>
                  <p className="text-zinc-500 text-[11px] truncate mt-0.5">
                    {SHARE_URL}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                  Portfolio Link
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#12141c] border border-black/[0.08] dark:border-white/[0.08] font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate">
                    {SHARE_URL}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-2.5">
                  Share Directly
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {sharePlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <a
                        key={platform.name}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-2xl bg-zinc-50 dark:bg-[#141622] border border-black/[0.06] dark:border-white/[0.06] flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-mono font-semibold cursor-pointer ${platform.color}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px]">{platform.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {canNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-2.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-[#141724] dark:hover:bg-[#1b1f30] text-zinc-800 dark:text-zinc-200 border border-black/[0.08] dark:border-white/[0.08] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                  <span>Open System Share Menu</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

