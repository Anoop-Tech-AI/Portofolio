import { Share2 } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, VIEW } from "../hooks/useAnimations";

export default function Contact({ onOpenShare }) {
  return (
    <section
      id="contact"
      className="py-20 relative z-10 border-t border-black/[0.08] dark:border-white/[0.06] bg-transparent dark:bg-[#090a0d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
          className="max-w-3xl"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-2">
            06. Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
            Get in Touch
          </h2>

          <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-200 font-medium mb-4">
            Contact me through:
          </p>

          <ol className="space-y-3 text-sm sm:text-base font-mono text-zinc-700 dark:text-zinc-300">
            <li className="flex items-center gap-2 sm:gap-3">
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                1)
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                Gmail
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 font-normal">
                (will provide at end of project)
              </span>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <span className="text-sky-600 dark:text-sky-400 font-bold">
                2)
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                LinkedIn
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 font-normal">
                (will provide at end of project)
              </span>
            </li>
          </ol>

          <div className="mt-8 pt-6 border-t border-black/[0.08] dark:border-white/[0.06] flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenShare}
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Engineering Profile</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
